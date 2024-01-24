"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import slugify from "slugify";
import {Prisma} from "@/core/types/prisma";
import styles from "./header.module.css";
import Loading from "@/components/Loading";
import {useCart} from "@/core/hooks/useCart";
import AppButton from "@/components/app/AppButton";
import AppIcon from "@/components/app/AppIcon";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

export default function MenuHeader({store}: { store: Prisma.Store }) {
    const category = store?.categories?.[0];

    const cartState = useCart();

    const [cart, setCart] = useState<Prisma.Cart | null>()

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p))
    }, [cartState]);

    return (
        <Suspense fallback={<Loading/>}>
            <Navbar className="bg-body-tertiary" fixed={"top"}>
                <Container>
                    <Navbar.Brand>
                        <h3>{store?.name}</h3>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <AppButton variant="outline-secondary" href={"/cart"}>
                            <AppIcon icon={faCartShopping} className={"me-2"}/>
                            Carrinho ({cart?.items?.length || 0})
                        </AppButton>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row style={{marginTop: '5rem'}}>
                <Col md={12}>
                    <Nav
                        variant="tabs"
                        defaultActiveKey={category?.id}
                        className={styles.nav}
                    >
                        {store?.categories?.map((category: Prisma.Category) => <>
                            <Nav.Item
                                key={category.id}
                            >
                                <Nav.Link href={`#${slugify(category.name).toLowerCase()}`}>{category.name}</Nav.Link>
                            </Nav.Item>
                        </>)}
                    </Nav>
                </Col>
            </Row>
        </Suspense>
    )
};
