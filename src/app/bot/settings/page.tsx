import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Settings',
};

export default async function Settings() {

    return (
        <>
            <Container className={"m-3"}>
                <h1>Settings</h1>
            </Container>
        </>
    )
}