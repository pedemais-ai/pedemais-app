import {prisma} from "@/prisma";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const {id, password} = requestBody;

        const lead = await prisma.lead.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!lead) {
            throw new Error('Lead not found');
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: lead.email,
            },
        });

        if (existingUser) {
            throw new Error('User with the same email already exists');
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: lead.name,
                email: lead.email,
                password: hashed,
            },
        });

        const {password: omit, ...userWithoutPassword} = newUser;

        return NextResponse.json(userWithoutPassword, {
            status: 200,
        });
    } catch (error: any) {
        console.error('Error updating lead:', error);

        return NextResponse.json({
            error: error.message,
        }, {
            status: 400,
        });
    } finally {
        await prisma.$disconnect();
    }
}
