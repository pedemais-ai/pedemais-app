import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Contacts',
};

export default async function Contacts() {

    return (
        <>
            <Container className={"m-3"}>
                <h1>Contacts</h1>
            </Container>
        </>
    )
}