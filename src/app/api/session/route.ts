import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, context: {}) {
    const session = await getServerSession(authOptions)

    return NextResponse.json(session)
}