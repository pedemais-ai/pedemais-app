import NextAuth, {NextAuthOptions, User} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import {AdapterUser} from "next-auth/adapters";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID!,
            clientSecret: process.env.APPLE_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({user}: { user: User | AdapterUser }) {
            // Check if the user already exists in the database
            const existingUser = await prisma.user.findUnique({
                where: {email: user.email as string},
            });

            if (existingUser) {
                // User exists, allow login and redirect to the dashboard
                return '/dashboard';
            } else {
                return '/register';
            }
        },
    },
};

export default NextAuth(authOptions);
