import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Groups',
};

export default async function Groups() {

    return (
        <>
            <Container className={"m-3"}>
                <h1>Groups</h1>
            </Container>
        </>
    )
}