import {NextRequest, NextResponse} from 'next/server'
import {prisma} from "@/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getUser, getUserCart} from "@/app/api/helpers";
import {CheckoutInputsSchema} from "@/core/types/zod";


export async function POST(
    request: NextRequest,
) {
    try {
        const session = await getServerSession(authOptions);
        const user = await getUser(session);

        let cart = await getUserCart(Number(user?.id));

        if (!cart) {
            throw new Error('Cart not found for user');
        }

        const data = CheckoutInputsSchema.parse(await request.json());


        const newOrder = await prisma.order.create({
            data: {
                user_id: cart.user_id,
                store_id: Number(data.storeId),
                store_payment_method_id: Number(data.paymentMethod),
                store_delivery_method_id: Number(data.deliveryMethod),
            },
        });

        const orderItems = cart.items.map((item) => ({
            order_id: newOrder.id,
            product_id: item.product_id,
            quantity: item.quantity,
        }));

        await prisma.orderItem.createMany({
            data: orderItems,
        });

        await prisma.cartItem.deleteMany({
            where: {
                cart_id: cart.id
            },
        });

        return NextResponse.json(newOrder, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error on checkout:', error);

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

