import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    try {
        if (!session?.user?.email) {
            throw new Error('Invalid session');
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        let cart = await prisma.cart.findFirst({
            where: {
                user_id: Number(user?.id),
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        }

        const totalPrice = await Promise.all(
            cart.items.map(async (item) => {
                const currentDate = new Date();

                const productPrice = await prisma.productPrice.findFirst({
                    where: {
                        product_id: item.product.id,
                        effective_date: {
                            lte: currentDate,
                        },
                    },
                    orderBy: {
                        effective_date: 'desc',
                    },
                });

                if (!productPrice) {
                    throw new Error('Price not found');
                }

                return productPrice.price * item.quantity;
            })
        ).then((prices) => prices.reduce((sum, price) => sum + price, 0));

        return NextResponse.json(
            {
                ...cart,
                totalPrice: totalPrice,
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        console.error('Error fetching cart:', error);

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
