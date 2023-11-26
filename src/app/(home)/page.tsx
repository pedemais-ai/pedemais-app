import {getServerSession} from "next-auth/next"
import styles from './page.module.css'
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Home',
};

export default async function Home() {

    const session = await getServerSession(authOptions)

    return (
        <main className={styles.main}>
            {session ? <>
                {JSON.stringify(session)}

                <a href="/api/auth/signout">Sign out</a>
            </> : <>
                <a href="/api/auth/signin">Sign in</a>
            </>}
        </main>
    )
}
