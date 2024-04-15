import {Prisma, PrismaClient} from '@prisma/client';
import OAuth2Server, {AuthorizationCode, Client, Falsey, RefreshToken, Token, User,} from 'oauth2-server';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import externalGrantTypes from './externalGrantTypes';
import {CreateUserParams, Model} from './types';
import {prisma} from "@/prisma";

export * from './types';

const oAuth2ServerModelPrisma = ({
                                     prisma,
                                     userModelName = 'user',
                                     createUser,
                                 }: {
    prisma: PrismaClient;
    userModelName?: string;
    createUser?: (params: CreateUserParams) => Promise<any>;
}): Model => {
    // Access Tokens

    const getAccessToken = async (token: string): Promise<Token | Falsey> => {
        const accessToken = await prisma.oAuthAccessToken.findUnique({
            where: {token},
        });

        if (!accessToken) return;

        const result: Token = {
            accessToken: accessToken.token,
            accessTokenExpiresAt: accessToken.token_expires_at || undefined,
            refreshToken: accessToken.refresh_token || undefined,
            refreshTokenExpiresAt: accessToken.refresh_token_expires_at || undefined,
            client: {
                id: String(accessToken.application_id),
                grants: [],
            },
            user: {
                // id: accessToken[`${userModelName}Id` as 'userId'], // todo OLD (remove)
                id: accessToken.user_id,
            },
        };

        if (
            accessToken.token_expires_at &&
            accessToken.token_expires_at <= new Date()
        ) {
            await revokeToken(result);
            return;
        }

        return result;
    };

    const getRefreshToken = async (refreshToken: string) => {
        const token = await prisma.oAuthAccessToken.findUnique({
            where: {
                refresh_token: refreshToken
            },
            include: {application: true},
        });

        if (!token) return;
        if (!token.refresh_token) return;


        const result: RefreshToken = {
            token: token.token,
            refreshToken: token.refresh_token,
            client: {
                id: String(token.application_id),
                grants: token.application.grants as string[],
                redirectUris: token.application.redirect_uris as string[],
            },
            user: {
                // id: token[`${userModelName}Id` as 'userId'], // todo OLD (remove)
                id: token.user_id,
            },
        };

        if (
            token.refresh_token_expires_at &&
            token.refresh_token_expires_at <= new Date()
        ) {
            await revokeToken(result);
            return;
        }

        return result;
    };

    const saveToken = async (token: Token, client: Client, user: User): Promise<Token> => {
        const scopes =
            token.scope && (Array.isArray(token.scope) ? token.scope : [token.scope]);

        await prisma.oAuthAccessToken.create({
            data: {
                application: {
                    connect: {
                        id: Number(client.id)
                    }
                },
                [userModelName as 'user']: {
                    connect: {
                        id: user.id
                    }
                },
                token: token.accessToken,
                refresh_token: token.refreshToken,
                token_expires_at: token.accessTokenExpiresAt,
                created_at: new Date().toISOString(),
                refresh_token_expires_at: token.refreshTokenExpiresAt,
                scopes,
            },
        });

        token.client = {
            id: client.id,
            clientId: client.clientId,
            name: client.name,
            grants: [],
        };

        token.user = {
            id: user.id,
            email: user.email,
        };

        return token;
    };

    const revokeToken = async ({token}: Token | RefreshToken): Promise<boolean> => {
        const accessToken = await prisma.oAuthAccessToken.findUnique({
            where: {token},
        });
        if (!accessToken) return false;

        const result = await prisma.oAuthAccessToken.delete({
            where: {id: accessToken.id},
        });

        return !!result;
    };

    // Authorization Code

    const getAuthorizationCode = async (code: string) => {
        const accessGrant = await prisma.oAuthAccessGrant.findUnique({
            where: {token: code},
            include: {[userModelName as 'user']: true, application: true},
        });

        if (!accessGrant) return false;

        const result: AuthorizationCode = {
            code: accessGrant.token,
            authorizationCode: accessGrant.token,
            expiresAt: accessGrant.expires_at,
            scope: (accessGrant.scopes as string[])[0],
            redirectUri: accessGrant.redirect_uri,
            client: {
                id: String(accessGrant.application_id),
                grants: accessGrant.application.grants as string[],
            },
            user: accessGrant[userModelName as 'user'],
        };

        if (accessGrant.code_challenge) {
            result.codeChallenge = accessGrant.code_challenge;

            if (accessGrant.code_challenge_method) {
                result.codeChallengeMethod = accessGrant.code_challenge_method;
            }
        }

        if (
            accessGrant.expires_at &&
            accessGrant.expires_at <= new Date()
        ) {
            await revokeAuthorizationCode(result);
            return false;
        }

        return result;
    };

    const saveAuthorizationCode = async (
        code: AuthorizationCode,
        client: Client,
        user: User,
    ) => {
        const scopes =
            code.scope && (Array.isArray(code.scope) ? code.scope : [code.scope]);

        const data: Prisma.OAuthAccessGrantCreateArgs['data'] = {
            application: {
                connect: {
                    id: Number(client.id)
                }
            },
            [userModelName as 'user']: {
                connect: {
                    id: user.id
                }
            },
            token: code.authorizationCode,
            expires_at: code.expiresAt,
            created_at: new Date().toISOString(),
            redirect_uri: code.redirectUri,
        };

        if (code.codeChallenge) {
            data.code_challenge = code.codeChallenge;

            if (code.codeChallengeMethod) {
                data.code_challenge_method = code.codeChallengeMethod;
            }
        }

        await prisma.oAuthAccessGrant.create({
            data,
        });

        const result: AuthorizationCode = code;

        result.client = {
            id: client.id,
            clientId: client.clientId,
            name: client.name,
            grants: client.grants,
        };

        result.user = {
            id: user.id,
            email: user.email,
        };

        return result;
    };

    const revokeAuthorizationCode = async ({code}: AuthorizationCode) => {
        if (!code) return false;

        const accessGrant = await prisma.oAuthAccessGrant.findUnique({
            where: {token: code},
        });
        if (!accessGrant) return false;

        await prisma.oAuthAccessGrant.delete({
            where: {id: accessGrant.id},
        });

        return true;
    };

    // General

    // clientSecret can be undefined when grant type does not require client
    // secret
    const getClient = async (clientId: string, clientSecret?: string): Promise<Client | Falsey> => {
        if (!clientId) return;

        const application = await prisma.oAuthApplication.findUnique({
            where: {
                client_id: clientId
            },
        });


        if (!application) return;

        // todo check this if >> application.client_secret <<
        if (clientSecret && application.client_secret && application.client_secret.length !== clientSecret.length)
            return;

        if (
            clientSecret &&
            !crypto.timingSafeEqual(
                Buffer.from(application.client_secret || ''), // todo check this or condition making secret empty string
                Buffer.from(clientSecret),
            )
        )
            return;

        return {
            id: String(application.id),
            grants: application.grants as string[],
            redirectUris: application.redirect_uris as string[],
            scopes: application.scopes as string[],
        };
    };

    const getUser = async (username: string, password: string) => {
        if (!username || !password) return;

        const user = await prisma[userModelName as 'user'].findUnique({
            where: {email: username.toLowerCase()},
        });
        if (!user) return;
        if (!user.password) return;

        const validPassword = await bcrypt.compare(
            password,
            user.password,
        );
        if (!validPassword) return;

        return user;
    };

    const validateScope = async (
        user: User,
        client: Client,
        scope: string | string[],
    ) => {
        if (client.scopes === undefined) return [];
        if (!client.scopes.length) return client.scopes;
        if (!client.scopes.includes(scope)) return false;

        return client.scopes;
    };

    const verifyScope = async (token: Token, scope: string | string[]) => {
        return true;
    };

    // External Grant Types

    return {
        getClient,
        getUser,

        getAccessToken,
        getRefreshToken,
        revokeToken,
        saveToken,

        verifyScope,

        saveAuthorizationCode,
        getAuthorizationCode,
        revokeAuthorizationCode,

        validateScope,
        prisma,
        ...externalGrantTypes({prisma, userModelName, createUser}),
    };
};

const server = new OAuth2Server({
    model: {
        ...oAuth2ServerModelPrisma({prisma}),
    },
    requireClientAuthentication: {
        password: false,
        refresh_token: false,
    },
});

export default server;