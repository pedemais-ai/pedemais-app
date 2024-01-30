import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {NextRequest, NextResponse} from "next/server";
import type {Session} from "next-auth";
import {Prisma} from "@/core/types/prisma";
import {prisma} from "@/prisma";

export async function getUser(session: Session | null): Promise<Prisma.User> {
    if (!session?.user?.email) {
        throw new Error('Invalid session');
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
        include: {
            stores: true
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

export async function GET(request: NextRequest, context: {}) {
    const session = await getServerSession(authOptions)

    return NextResponse.json(session)
}