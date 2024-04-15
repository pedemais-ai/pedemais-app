import {PrismaClient} from '@prisma/client';
import {CreateUserParams} from '../types';

type Params = {
    prisma: PrismaClient;
    userModelName?: string;
    createUser?: (params: CreateUserParams) => Promise<any>;
};

type FacebookTokenData = {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
};

type GoogleTokenData = {
    name: string;
    email: string;
    sub: string;
};

type AppleTokenData = {
    name: string;
    email: string;
    sub: string;
};

type GetUserByProviderParams = {
    provider: string;
    uid: string;
    name: string;
    email: string;
    tokenData: any;
};

const externalGrantTypes = ({prisma, createUser,}: Params) => {

    const getUserByIdentity = async ({provider, uid,}: { provider: string; uid: string; }) => {
        if (!provider || !uid) {
            return;
        }

        return await prisma.user.findFirst({
            where: {
                identities: {
                    some: {
                        uid,
                        provider
                    }
                }
            },
        });
    };

    const saveUserIdentity = async ({user, provider, uid, name, email,}: {
        provider: string;
        uid: string;
        name: string;
        email: string;
        user: any;
    }) => {
        return prisma.userIdentity.create({
            data: {
                user_id: user.id,
                provider,
                uid,
                name,
                email,
            },
        });
    };

    const getUserByProvider = async ({provider, uid, name, email, tokenData,}: GetUserByProviderParams) => {
        const userFromProvider = await getUserByIdentity({
            provider,
            uid,
        });

        if (userFromProvider) {
            return userFromProvider;
        }

        const userByEmail = await prisma.user.findUnique({
            where: {email},
        });

        if (userByEmail) {
            await saveUserIdentity({
                user: userByEmail,
                provider,
                uid,
                name,
                email,
            });

            return userByEmail;
        }

        if (!createUser) {
            return null;
        }

        const user = await createUser({
            email,
            name,
            provider: {
                uid,
                name,
                tokenData,
            },
        });

        await saveUserIdentity({
            user,
            provider,
            uid,
            name,
            email,
        });

        return user;
    };

    const getUserWithFacebook = async (tokenData: FacebookTokenData) => {
        const {first_name, last_name, email, id: uid} = tokenData;
        const name = [first_name, last_name].join(' ').trim();

        return await getUserByProvider({
            provider: 'facebook',
            uid,
            name,
            email,
            tokenData,
        });
    };

    const getUserWithGoogle = async (tokenData: GoogleTokenData) => {
        const {name, email, sub: uid} = tokenData;

        return await getUserByProvider({
            provider: 'google',
            uid,
            name,
            email,
            tokenData,
        });
    };

    const getUserWithApple = async (tokenData: AppleTokenData) => {
        const {name, email, sub: uid} = tokenData;

        return await getUserByProvider({
            provider: 'apple',
            uid,
            name, // Only available on first time login
            email,
            tokenData,
        });
    };

    return {
        getUserWithFacebook,
        getUserWithGoogle,
        getUserWithApple,
    };
};

export default externalGrantTypes;