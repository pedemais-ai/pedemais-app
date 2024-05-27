import {NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";


// POST - Create a new product
export async function GET() {
    const session = await getServerSession(authOptions);

    try {
        if (!session?.user?.email) {
            throw Error('Invalid session');
        }

        const paymentMethods = await prisma.paymentMethod.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return NextResponse.json(paymentMethods, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error fetching payment methods:', error);

        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 400,
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}