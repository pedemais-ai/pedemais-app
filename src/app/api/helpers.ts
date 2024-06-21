import type {Session} from "next-auth";
import {Prisma} from "@/core/types/prisma";
import {prisma} from "@/prisma";

export async function getUser(session: Session | null): Promise<Prisma.User> {
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


export async function getUserCart(userId: number) {
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
                            images: {
                                orderBy: {
                                    id: 'asc',
                                },
                                take: 1,
                            },
                        },
                    },
                },
                orderBy: {
                    id: 'asc',
                },
            },
        },
    });
}

export async function createUserCart(userId: number) {
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
                            images: {
                                orderBy: {
                                    id: 'asc',
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