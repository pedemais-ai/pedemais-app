export async function GET(request: Request, response: Response) {
    return Response.json({"ping": "pong"})
}