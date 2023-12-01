import {authOptions} from "./api/auth/[...nextauth]/authOptions"
import {getServerSession} from "next-auth/next"

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <>
            {session ? (
                <>
                    Hello {session?.user?.name}!
                </>
            ) : (
                <h1 className="text-5xl">You Shall Not Pass!</h1>
            )}
        </>
    )
}
