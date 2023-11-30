import {options} from "./api/auth/[...nextauth]/options"
import {getServerSession} from "next-auth/next"

export default async function Home() {
    const session = await getServerSession(options)

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
