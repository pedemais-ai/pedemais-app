"use client";

import React from "react";
import {Col, Nav} from "react-bootstrap";
import {CategoryType, StoreType} from "@/core/types";
import slugify from "slugify";

export default function MenuHeader({store}: { store: StoreType }) {
    if (!store) return (<>Loading...</>);

    return (
        <div id="header">
            <h1 className="mb-4">{store.name}</h1>
            <Col md={12}>
                <Nav variant="tabs" defaultActiveKey={`#${slugify(store.categories[0]?.name || "null").toLowerCase()}`}>
                    {store.categories.map((category: CategoryType) => <>
                        <Nav.Item key={category.id}>
                            <Nav.Link href={`#${slugify(category.name).toLowerCase()}`}>{category.name}</Nav.Link>
                        </Nav.Item>
                    </>)}
                </Nav>
            </Col>
        </div>
    )
};
