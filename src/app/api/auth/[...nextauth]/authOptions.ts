import type {NextAuthOptions, User} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET} from "@/constants";
import {prisma} from "@/prisma";

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
                    },
                });
            }

            return true;
        },
    },
    debug: false
}