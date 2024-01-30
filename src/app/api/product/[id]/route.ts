import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';

// GET - Retrieve a product by ID
export async function GET(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {
                category: {
                    include: {
                        store: true,
                    },
                },
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
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return NextResponse.json(product, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error fetching product:', error);

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

// POST - Create a new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const createdProduct = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                category_id: 1
            },
        });

        return NextResponse.json(createdProduct, {
            status: 201, // Created
        });
    } catch (error: any) {
        console.error('Error creating product:', error);

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

// PUT - Update an existing product
export async function PUT(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const updatedProduct = await prisma.product.update({
            where: {
                id: Number(params.id),
            },
            data: {
                // Add your logic here to update the product fields based on the request body
            },
        });

        return NextResponse.json(updatedProduct, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error updating product:', error);

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

// DELETE - Delete an existing product
export async function DELETE(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id: Number(params.id),
            },
        });

        return NextResponse.json(deletedProduct, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error deleting product:', error);

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
