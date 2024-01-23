"use client";

import React, {Suspense} from "react";
import {Col, Nav} from "react-bootstrap";
import slugify from "slugify";
import {Prisma} from "@/core/types/prisma";
import styles from "./header.module.css";
import Loading from "@/components/Loading";

export default function MenuHeader({store}: { store: Prisma.Store }) {
    const category = store?.categories?.[0];

    return (
        <Suspense fallback={<Loading/>}>
            <div id="header">
                <h1 className="mb-4">{store?.name}</h1>
                <Col md={12}>
                    <Nav
                        variant="tabs"
                        defaultActiveKey={`#${slugify(category?.name ?? '').toLowerCase()}`}
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
            </div>
        </Suspense>
    )
};
