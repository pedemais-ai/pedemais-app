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
                        product: {
                            include: {
                                prices: {
                                    where: {
                                        effective_date: {
                                            lte: new Date(),
                                        },
                                    },
                                    orderBy: {
                                        effective_date: 'desc',
                                    },
                                    take: 1,
                                },
                            },
                        },
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
                            product: {
                                include: {
                                    prices: {
                                        where: {
                                            effective_date: {
                                                lte: new Date(),
                                            },
                                        },
                                        orderBy: {
                                            effective_date: 'desc',
                                        },
                                        take: 1,
                                    },
                                },
                            },
                        },
                    },
                },
            });
        }

        const totalPrice = cart.items.reduce((sum, item) => {
            const productPrice = item.product?.prices[0];

            if (!productPrice) {
                throw new Error(`Price not found for product ${item.product.id}.`);
            }

            return sum + productPrice.price * item.quantity;
        }, 0);

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
