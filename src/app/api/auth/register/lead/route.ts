import {prisma} from "@/prisma";
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {LeadRegistrationInputs, LeadRegistrationInputsSchema} from "@/components/auth/register/leads/types";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest, context: {}) {
    try {
        const json: LeadRegistrationInputs = LeadRegistrationInputsSchema.parse(await request.json());

        const lead = await prisma.lead.create({
            data: {
                name: json.name,
                email: json.email,
                store_name: json.store_name,
                phone_number: json.phone_number,
                orders_per_day: json.orders_per_day,
            },
        });

        return NextResponse.json(lead, {
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

export async function PATCH(request: NextRequest) {
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

        const hashed = await bcrypt.hash(password, 10);

        await prisma.lead.update({
            where: {
                id: lead.id,
            },
            data: {
                password: hashed,
            },
        });


        return NextResponse.json(lead, {
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
