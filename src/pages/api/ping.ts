import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        ping: string
    }>
) {
    res.status(200).json({ping: 'pong'})
}
