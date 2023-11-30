import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Dashboard() {

    const session = await getServerSession(authOptions);

    return (
        <>
            {JSON.stringify(session)}

            <Container className={"m-3"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci architecto aspernatur cumque cupiditate nostrum odit saepe.
                Accusantium architecto commodi cumque et eum ex iste iusto, magni, minus quia rem ullam?
            </Container>
        </>
    )
}