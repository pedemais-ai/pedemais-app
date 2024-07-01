"use client";

import React from "react";
import {Card, Col, Row} from "react-bootstrap";

export default function OrderDelivery() {

    return (
        <>
            <Card className="border-top-0 rounded-top-0">
                <Card.Body>
                    <Row>
                        <Col lg={4}>
                            <h3>Em análise</h3>
                            <Row className={"p-3"}>

                            </Row>
                        </Col>
                        <Col lg={4}>
                            <h3>Em produção</h3>

                        </Col>
                        <Col lg={4}>
                            <h3>Pronto para entrega</h3>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}
