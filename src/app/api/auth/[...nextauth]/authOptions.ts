import type {NextAuthOptions, User} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET} from "@/constants";
import {prisma} from "@/prisma";
import Credentials from "next-auth/providers/credentials";

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
            // The name to display on the sign-in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign-in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "Username", type: "text",},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                return {user: 'admin'} as any;
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
                    },
                });
            }

            return true;
        },
    },
    debug: false
}