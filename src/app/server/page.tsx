import {getServerSession} from "next-auth/next"
import {redirect} from "next/navigation"
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

export default async function ServerPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    return (
        <>
            {JSON.stringify(session?.user)}
        </>
    )

}
