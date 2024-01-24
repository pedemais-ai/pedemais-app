import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/app/api/auth/[...nextauth]/authOptions';
import type {Session} from "next-auth";
import {Prisma} from "@/core/types/prisma";

async function getUser(session: Session | null): Promise<Prisma.User> {
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

    return user;
}

async function getUserCart(userId: number) {
    return await prisma.cart.findFirst({
        where: {
            user_id: userId,
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

async function createUserCart(userId: number) {
    return await prisma.cart.create({
        data: {
            user: {
                connect: {
                    id: userId,
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

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = await getUser(session);

        let cart = await getUserCart(Number(user?.id));

        if (!cart) {
            cart = await createUserCart(user.id);
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

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = await getUser(session);

        const requestBody = await request.json();
        const {productId, quantity} = requestBody;

        const product = await prisma.product.findUnique({
            where: {
                id: Number(productId),
            },
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
        });

        if (!product) {
            throw new Error('Product not found');
        }

        let cart = await getUserCart(Number(user?.id));

        if (!cart) {
            cart = await createUserCart(user.id);
        }

        const existingCartItem = cart.items.find(item => item.product?.id === Number(productId));

        if (existingCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: existingCartItem.id,
                },
                data: {
                    quantity: existingCartItem.quantity + quantity,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cart: {
                        connect: {
                            id: cart.id,
                        },
                    },
                    product: {
                        connect: {
                            id: Number(productId),
                        },
                    },
                    quantity: quantity,
                },
            });
        }

        cart = await getUserCart(Number(user?.id));

        const totalPrice = cart!.items.reduce((sum, item) => {
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
        console.error('Error updating cart:', error);

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
