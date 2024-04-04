import {prisma} from "@/prisma";
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {LeadRegistrationInputs, LeadRegistrationInputsSchema} from "@/components/auth/register/leads/types";

export async function POST(request: NextRequest, context: {}) {
    try {
        const json: LeadRegistrationInputs = LeadRegistrationInputsSchema.parse(await request.json());

        const lead = await prisma.lead.create({
            data: {
                name: json.name,
                email: json.email,
                store_name: json.store_name,
                phone_number: json.phone_number,
                orders_per_day: Number(json.orders_per_day),
                has_computer: "1" === json.has_computer,
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
