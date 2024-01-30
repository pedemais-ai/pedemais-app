import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {PatchCategoryInputsSchema} from "@/components/admin/products/category/types";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
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
        include: {
            stores: true
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

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

// PATCH - Update an existing category
export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        const user = await getUser(session);

        const store = user.stores?.[0];

        if (!store) {
            throw Error('User does not have a store');
        }

        const data = PatchCategoryInputsSchema.parse(await request.json());

        // Check if the category with the given name already exists
        const existingCategory = await prisma.category.findFirst({
            where: {
                id: {
                    not: Number(params.id)
                },
                name: data.name,
                store_id: store.id,
            },
        });

        if (existingCategory) {
            return NextResponse.json(
                {
                    error: {
                        issues: [
                            {
                                path: ['name'],
                                message: 'Category with this name already exists',
                            },
                        ],
                    },
                },
                {
                    status: 400,
                }
            );
        }

        const updatedCategory = await prisma.category.update({
            where: {
                id: Number(params.id),
            },
            data: {
                name: data.name,
                is_active: data.is_active
            },
        });

        return NextResponse.json(updatedCategory, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error patching category:', error);

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
