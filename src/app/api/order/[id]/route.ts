import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {PatchOrderInputsSchema} from "@/core/types/zod";
import {getUser} from "@/app/api/helpers";

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

export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const user = await getUser(session);

        // todo check if user can patch this order

        const data = PatchOrderInputsSchema.parse(await request.json());

        const updatedOrder = await prisma.order.update({
            where: {
                id: Number(params.id),
            },
            data: {
                status: data.status,
            },
        });

        return NextResponse.json(updatedOrder, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error patching order:', error);

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