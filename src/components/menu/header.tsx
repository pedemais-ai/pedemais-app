"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Button, Col, Container, Nav, Navbar} from "react-bootstrap";
import slugify from "slugify";
import {Prisma} from "@/core/types/prisma";
import styles from "./header.module.css";
import Loading from "@/components/Loading";
import {useCart} from "@/core/hooks/useCart";

export default function MenuHeader({store}: { store: Prisma.Store }) {
    const category = store?.categories?.[0];

    const cartState = useCart();

    const [cart, setCart] = useState<Prisma.Cart | null>()

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p))
    }, []);

    return (
        <Suspense fallback={<Loading/>}>
            <Navbar className="bg-body-tertiary" fixed={"top"}>
                <Container>
                    <Navbar.Brand>
                        <h3 className="mb-4">{store?.name}</h3>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-secondary" as={"a"} href={"/cart"}>
                            Carrinho ({cart?.items?.length || 0})
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Col md={12} className={styles.container}>
                <Nav
                    variant="tabs"
                    defaultActiveKey={category?.id}
                    className={styles.nav}
                >
                    {store?.categories?.map((category: Prisma.Category) => <>
                        <Nav.Item
                            key={category.id}
                            className={styles.navLi}
                        >
                            <Nav.Link href={`#${slugify(category.name).toLowerCase()}`}>{category.name}</Nav.Link>
                        </Nav.Item>
                    </>)}
                </Nav>
            </Col>
        </Suspense>
    )
};
