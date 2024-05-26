import {authOptions} from "./api/auth/[...nextauth]/authOptions"
import {getServerSession} from "next-auth/next"
import Link from "next/link";

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <>
            {session ? (
                <>
                    Hello {session?.user?.name}!
                </>
            ) : (
                <>
                    <Link href={"/api/auth/signin"}>Sign-in</Link>
                    <Link href={"/api/auth/register"}>Sign-up</Link>
                </>
            )}
        </>
    )
}
