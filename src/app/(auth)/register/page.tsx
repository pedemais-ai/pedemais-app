import {Metadata} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {redirect} from "next/navigation";
import RegisterForm from "@/components/auth/register/form";

export const metadata: Metadata = {
    title: 'Cadastro',
};

export default async function Register() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect('/dashboard');
    }

    return (
        <>
            <div className="account-pages my-5 pt-sm-5">
                <RegisterForm/>
            </div>
        </>
    );
}
