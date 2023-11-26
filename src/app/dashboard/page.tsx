import {Metadata} from "next";
import React from "react";
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Dashboard() {
    return (
        <>
            <Container className={"m-3"}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci architecto aspernatur cumque cupiditate nostrum odit saepe.
                Accusantium architecto commodi cumque et eum ex iste iusto, magni, minus quia rem ullam?
            </Container>
        </>
    )
}