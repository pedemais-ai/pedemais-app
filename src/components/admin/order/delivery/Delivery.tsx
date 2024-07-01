"use client";

import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import OrderDetail from "@/components/admin/order/OrderDetail";
import {useOrder} from "@/core/hooks/useOrder";
import {Prisma} from "@/core/types/prisma";
import {OrderStatus} from ".prisma/client";

export default function OrderDelivery() {

    const orderStore = useOrder();

    const [orders, setOrders] = useState<Prisma.Order[]>([]);

    const orderByStatus = function (status: OrderStatus) {
        return orders.filter(o => o.status === status);
    }

    useEffect(() => {
        setInterval(() => {
            orderStore.findAll().then((o: Prisma.Order[]) => {
                setOrders(o);
            })
        }, 5000);
    }, []);

    return (
        <>
            <Card className="border-top-0 rounded-top-0">
                <Card.Body>
                    <Row>
                        <Col lg={4}>
                            <h3>Em análise</h3>
                            <Row className={"p-3"}>
                                {orderByStatus(OrderStatus.WAITING).map((order) => (
                                    <OrderDetail
                                        key={order.id}
                                        order={order}
                                        setOrders={setOrders}
                                    />
                                ))}
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <h3>Em produção</h3>
                            <Row className={"p-3"}>
                                {orderByStatus(OrderStatus.PREPARING).map((order) => (
                                    <OrderDetail
                                        key={order.id}
                                        order={order}
                                        setOrders={setOrders}
                                    />
                                ))}
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <h3>Pronto para entrega</h3>
                            <Row className={"p-3"}>
                                {orderByStatus(OrderStatus.READY).map((order) => (
                                    <OrderDetail
                                        key={order.id}
                                        order={order}
                                        setOrders={setOrders}
                                    />
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}
