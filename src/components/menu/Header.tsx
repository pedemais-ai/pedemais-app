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
import {useCategory} from "@/core/hooks/useCategory";

export default function MenuHeader({store}: { store: Prisma.Store }) {
    const cartState = useCart();
    const categoryState = useCategory();

    const [cart, setCart] = useState<Prisma.Cart | null>()
    const [categories, setCategories] = useState<Prisma.Category[] | null>()

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p));

        if (categories?.length === 0) {
            categoryState.findAll().then((p: Prisma.Category[] | null | undefined) => setCategories(p));
        }
    }, [cartState, categories?.length, categoryState]);

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
            <Container>
            <Row className={styles.tabsRow}>
                <Col md={12}>
                    {store?.categories?.[0] ?
                        <Nav
                            variant="tabs"
                            defaultActiveKey={`#${slugify(store?.categories?.[0]?.name).toLowerCase()}`}
                            className={styles.nav}
                        >
                            {store?.categories?.map((category: Prisma.Category, index: number) => <>
                                <Nav.Item key={index}>
                                    <Nav.Link href={`#${slugify(category.name).toLowerCase()}`}>
                                        {category.name}
                                    </Nav.Link>
                                </Nav.Item>
                            </>)}
                        </Nav> : <></>}
                </Col>
            </Row>
            </Container>
        </Suspense>
    )
};
