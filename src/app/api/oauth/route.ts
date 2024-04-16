import {NextApiRequest} from 'next'
import {prisma} from "@/prisma";
import {NextResponse} from "next/server";

export async function POST(request: NextApiRequest) {
    try {
        // generate token here

        return NextResponse.json('oauth token data', {
            status: 200
        });
    } catch (error: any) {
        console.error('Error:', error);

        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        });
    } finally {
        await prisma.$disconnect();
    }
}