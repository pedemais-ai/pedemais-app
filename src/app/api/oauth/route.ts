import {NextApiRequest} from 'next'
import {prisma} from "@/prisma";
import oAuth2 from "@/service/oauth2/oauth2";
import OAuth2Server from "oauth2-server";
import {NextResponse} from "next/server";

export async function POST(request: NextApiRequest) {
    try {
        const client = await oAuth2.authenticate(
            new OAuth2Server.Request({
                method: request.method,
                headers: request.headers,
                body: request.body,
                query: request.query || {},
            }),
            new OAuth2Server.Response({
                headers: {},
            }),
        );

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