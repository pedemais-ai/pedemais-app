import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, context: {}) {
    return NextResponse.json({"ping": "pong"})
}