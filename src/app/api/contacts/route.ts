import {NextRequest, NextResponse} from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {prisma} from "@/prisma";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)

    try {
        if (!session?.user?.email) {
            throw Error('Invalid session');
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            include: {
                clients: {
                    include: {
                        contacts: true,
                    },
                },
            },
        });

        if (!user) {
            throw Error('User not found');
        }

        if (user.clients.length === 0) {
            throw Error('User does not have any clients');
        }

        const contacts = user.clients[0].contacts

        return NextResponse.json(contacts, {
            status: 200
        });
    } catch (error: any) {
        console.error('Error fetching user:', error);

        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    } finally {
        await prisma.$disconnect();
    }
}