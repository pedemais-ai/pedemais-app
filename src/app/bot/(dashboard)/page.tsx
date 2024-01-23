import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Dashboard() {

    return (
        <>
            <Container className={"m-3"}>
                <h1>Dashboard</h1>
            </Container>
        </>
    )
}