import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {prisma} from "@/prisma";
import {NextRequest, NextResponse} from "next/server";
import {UserRegistrationInputs, UserRegistrationInputsSchema} from "@/components/auth/register/types";
import {z} from "zod";

export async function POST(request: NextRequest, context: {}) {
    const session = await getServerSession(authOptions);

    try {
        if (session?.user) {
            throw new Error('Invalid request');
        }

        const json: UserRegistrationInputs = UserRegistrationInputsSchema.parse(await request.json());

        const existingUser = await prisma.user.findUnique({
            where: {
                email: json.email,
            },
        });

        if (existingUser) {
            throw new z.ZodError([{
                "code": "custom",
                "path": ["email"],
                "message": "E-mail em uso"
            }]);
        }

        const newUser = await prisma.user.create({
            data: {
                name: json.name,
                email: json.email,
            },
        });

        return NextResponse.json(newUser, {
            status: 201, // 201 Created status code
        });
    } catch (error: any) {
        console.error('Error creating user:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: error,
            }, {
                status: 400,
            });
        }

        return NextResponse.json({
            error: error.message,
        }, {
            status: 400,
        });
    } finally {
        await prisma.$disconnect();
    }
}
