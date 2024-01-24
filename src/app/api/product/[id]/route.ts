import {NextRequest, NextResponse} from 'next/server'
import {prisma} from "@/prisma";

export async function GET(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {}
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return NextResponse.json(product, {
            status: 200
        });
    } catch (error: any) {
        console.error('Error fetching product:', error);

        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    } finally {
        await prisma.$disconnect();
    }
}