"use client";

import React from "react";
import {Col, Nav} from "react-bootstrap";
import slugify from "slugify";
import {Prisma} from "@/core/types/prisma";
import styles from "./header.module.css";

export default function MenuHeader({store}: { store: Prisma.Store }) {
    if (!store) return (<>Loading...</>);

    return (
        <div id="header">
            <h1 className="mb-4">{store.name}</h1>
            <Col md={12}>
                <Nav
                    variant="tabs"
                    defaultActiveKey={`#${slugify(store.categories[0]?.name || "null").toLowerCase()}`}
                    className={styles.nav}
                >
                    {store.categories.map((category: Prisma.Category) => <>
                        <Nav.Item
                            key={category.id}
                            className={styles.navLi}
                        >
                            <Nav.Link href={`#${slugify(category.name).toLowerCase()}`}>{category.name}</Nav.Link>
                        </Nav.Item>
                    </>)}
                </Nav>
            </Col>
        </div>
    )
};
