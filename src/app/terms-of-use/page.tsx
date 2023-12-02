import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Terms of Use',
};

export default async function TermsOfUse() {

    return (
        <>
            <Container className={"m-3"}>
                <h1>Terms of Use</h1>
            </Container>
        </>
    )
}