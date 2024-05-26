import {authOptions} from "./api/auth/[...nextauth]/authOptions"
import {getServerSession} from "next-auth/next"
import {redirect} from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/admin')
    }

    redirect('/admin')
}
