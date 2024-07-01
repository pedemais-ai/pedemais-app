import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getUser} from "@/app/api/helpers";

// GET - Retrieve all orders
export async function GET(
    request: NextRequest,
) {
    const session = await getServerSession(authOptions);
    const user = await getUser(session);

    try {

        const orders = await prisma.order.findMany({
            where: {},
            include: {
                user: true,
                storeDeliveryMethod: {
                    include: {
                        deliveryMethod: true
                    }
                },
                storePaymentMethod: {
                    include: {
                        paymentMethod: true
                    }
                },
            }
        });

        return NextResponse.json(orders, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error fetching orders:', error);

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