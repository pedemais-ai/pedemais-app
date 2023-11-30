import {getServerSession} from "next-auth/next";
import {options} from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: Request, response: Response) {
    const session = await getServerSession(options)

    return Response.json(session)
}