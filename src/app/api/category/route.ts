import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {AddCategoryInputsSchema} from "@/components/admin/products/category/types";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {getUser} from "@/app/api/session/route";


// POST - Create a new category
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const user = await getUser(session);

        const store = user.stores?.[0];

        if (!store) {
            throw Error('User does not have a store');
        }

        const data = AddCategoryInputsSchema.parse(await request.json());

        // Check if the category with the given name already exists
        const existingCategory = await prisma.category.findFirst({
            where: {
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

        const createdCategory = await prisma.category.create({
            data: {
                name: data.name,
                store_id: store.id,
            },
        });

        return NextResponse.json(createdCategory, {
            status: 201, // Created
        });
    } catch (error: any) {
        console.error('Error creating category:', error);

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
