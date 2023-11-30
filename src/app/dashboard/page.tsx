import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Dashboard() {

    const session = await getServerSession(options);

    return (
        <>
            <Container className={"m-3"}>
                {JSON.stringify(session)}
            </Container>
        </>
    )
}