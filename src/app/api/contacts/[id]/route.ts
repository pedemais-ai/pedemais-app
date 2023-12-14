import {NextRequest, NextResponse} from 'next/server'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {prisma} from "@/prisma";

export async function GET(
    request: NextRequest,
    {params}: { params: { id: number } }
) {
    const session = await getServerSession(authOptions);

    try {
        if (!session?.user?.email) {
            throw Error('Invalid session');
        }

        const contact = await prisma.contact.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {
                messages: true,
            },
        });

        if (!contact) {
            throw Error('Contact not found');
        }

        return NextResponse.json(contact, {
            status: 200
        });
    } catch (error: any) {
        console.error('Error fetching contact:', error);

        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    } finally {
        await prisma.$disconnect();
    }
}
