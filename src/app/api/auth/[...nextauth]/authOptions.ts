import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET} from "@/constants";
import {prisma} from "@/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GitHubProvider({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text",},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error('Invalid user name or password');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                });

                if (!user) {
                    throw new Error('Invalid user name or password');
                }

                if (!user.password) {
                    throw new Error('Invalid user name or password');
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error('Invalid user name or password');
                }

                return user as any;
            }
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: String(user.email)
                },
            });

            if (!existingUser) {
                return '/api/auth/register'
            }

            return true;
        },
        async session({session, token, user}) {
            return session;
        },
        async jwt({token, user, account, profile}) {
            return token;
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith("/")) {// Allows relative callback URLs
                return `${baseUrl}${url}`;
            } else if (new URL(url).origin === baseUrl) { // Allows callback URLs on the same origin
                return url;
            }

            return baseUrl;
        }
    },
    debug: false
}