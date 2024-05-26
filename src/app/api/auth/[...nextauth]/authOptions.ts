import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET} from "@/constants";
import {prisma} from "@/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
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
}