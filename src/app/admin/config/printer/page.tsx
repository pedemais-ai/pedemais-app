import React from "react";
import type {Metadata} from "next";
import {Col, Row} from "react-bootstrap";

export const metadata: Metadata = {
    title: 'Impressora',
}

export default function MenuPage() {
    return (
        <>
            <Row className={"pt-3"}>
                <h3>Impressora</h3>
                <Col className={"p-3"}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiam aspernatur eaque ex facilis fuga illo in ipsam laborum libero, mollitia odit placeat praesentium quidem rem reprehenderit sit suscipit tempore.
                </Col>

            </Row>
        </>
    );
}
