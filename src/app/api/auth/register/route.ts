import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {prisma} from "@/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest, context: {}) {
    const session = await getServerSession(authOptions);

    try {
        if (!session?.user?.email) {
            throw new Error('Invalid session');
        }

        // Assuming that the request body contains the necessary information for creating a new user
        const json = await request.json();

        console.log(json);

        // Perform validation on the request body if needed

        const newUser = await prisma.user.create({
            data: {
                name: 'xxxx',
                email: 'alfredocosta@live.com',
                // You may add other fields here based on your schema
            },
        });

        return NextResponse.json(newUser, {
            status: 201, // 201 Created status code
        });
    } catch (error: any) {
        console.error('Error creating user:', error);

        return NextResponse.json({
            error: error.message,
        }, {
            status: 400,
        });
    } finally {
        await prisma.$disconnect();
    }
}
