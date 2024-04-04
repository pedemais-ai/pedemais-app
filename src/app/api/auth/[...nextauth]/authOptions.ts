import type {NextAuthOptions, User} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET} from "@/constants";
import {prisma} from "@/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
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
                    throw new Error('Username and password are required');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                });

                if (!user) {
                    throw new Error('User not found');
                }

                const passwordMatch = await bcrypt.compare(credentials?.password, user.password);

                if (!passwordMatch) {
                    throw new Error('Invalid password');
                }

                return user as any;
            }
        })
    ],
    callbacks: {
        async signIn({user}: { user: User }) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: String(user.email)
                },
            });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        name: String(user.name),
                        email: String(user.email),
                        password: '0000000000000000'
                    },
                });
            }

            return true;
        },
    },
    debug: false
}