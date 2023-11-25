// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

type Data = {
    ping: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ping: "UNAUTHENTICATED"});

        return;
    }

    res.status(200).json({ping: 'pong'})
}
