import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {AddProductInputsSchema} from "@/core/types/zod";
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

// POST - Create a new product
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = await getUser(session);

        const store = user.stores?.[0];

        if (!store) {
            throw Error('User does not have a store');
        }

        const data = AddProductInputsSchema.parse(await request.json());

        // Check if the product with the given name already exists
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: data.name,
                category: {
                    store_id: store.id
                },
            },
        });

        if (existingProduct) {
            return NextResponse.json(
                {
                    error: {
                        issues: [
                            {
                                path: ['name'],
                                message: 'Product with this name already exists',
                            },
                        ],
                    },
                },
                {
                    status: 400,
                }
            );
        }

        const createdProduct = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                category_id: Number(data.category_id),
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
