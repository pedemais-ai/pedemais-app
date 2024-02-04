import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/prisma';
import {AddProductInputsSchema} from "@/core/types/zod";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import type {Session} from "next-auth";
import {Prisma} from "@/core/types/prisma";
import AWS from 'aws-sdk';
import {AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_CLOUDFRONT_DOMAIN, AWS_REGION, AWS_SECRET_ACCESS_KEY} from "@/constants";

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});

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

        const formData = await request.formData();
        const validatedData = AddProductInputsSchema.parse(Object.fromEntries(formData));

        // Check if the product with the given name already exists
        const existingProduct = await prisma.product.findFirst({
            where: {
                name: validatedData.name,
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

        let imageURL: string | undefined;

        if (formData.has('image')) {
            const file = formData.get('image') as File;
            const arrayBuffer = await file.arrayBuffer();
            const body = Buffer.from(arrayBuffer);

            const fileName = `images/${Date.now()}_${file.name}`;

            const data = await s3.upload({
                Bucket: AWS_BUCKET_NAME,
                Key: fileName, // File name you want to save as in S3
                Body: body,
                ACL: 'public-read', // This makes the file public
            }).promise();

            imageURL = `${AWS_CLOUDFRONT_DOMAIN}/${fileName}`;
        }

        const productData: any = {
            name: validatedData.name,
            description: validatedData.description,
            category_id: Number(validatedData.category_id),
            prices: {
                createMany: {
                    data: [
                        {
                            price: validatedData.price,
                            effective_date: new Date()
                        },
                    ],
                },
            }
        };

        if (imageURL) {
            productData.images = {
                createMany: {
                    data: [
                        {
                            path: imageURL,
                        },
                    ],
                },
            };
        }

        const createdProduct = await prisma.product.create({
            data: productData,
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
