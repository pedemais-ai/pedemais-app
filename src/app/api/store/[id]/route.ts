import {NextRequest, NextResponse} from 'next/server'
import {prisma} from "@/prisma";

export async function GET(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const store = await prisma.store.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {
                categories: {
                    include: {
                        products: {
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
                    }
                }
            },
        });

        if (!store) {
            throw new Error('Store not found');
        }

        return NextResponse.json(store, {
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
