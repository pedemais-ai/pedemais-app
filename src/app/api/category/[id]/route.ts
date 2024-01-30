import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';

// GET - Retrieve a category by ID
export async function GET(
    request: NextRequest,
    {
        params
    }: {
        params: {
            id: string
        }
    }
) {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: Number(params.id),
            },
            include: {},
        });

        if (!category) {
            throw new Error('Category not found');
        }

        return NextResponse.json(category, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error fetching category:', error);

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

// PUT - Update an existing category
export async function PUT(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const body = await request.json();

        const updatedCategory = await prisma.category.update({
            where: {
                id: Number(params.id),
            },
            data: {
                // Add your logic here to update the category fields based on the request body
            },
        });

        return NextResponse.json(updatedCategory, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error updating category:', error);

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

// DELETE - Delete an existing category
export async function DELETE(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const deletedCategory = await prisma.category.delete({
            where: {
                id: Number(params.id),
            },
        });

        return NextResponse.json(deletedCategory, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error deleting category:', error);

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
