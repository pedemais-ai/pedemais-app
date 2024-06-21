import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';

// GET - Retrieve an order by ID
export async function GET(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {
                items: true,
            },
        });

        if (!order) {
            throw new Error('Order not found');
        }

        return NextResponse.json(order, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error fetching order:', error);

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
