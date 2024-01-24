"use client";

import React from "react";
import {Breadcrumb} from "react-bootstrap";

export default function Breadcrumbs() {
    return (
        <>
            <Breadcrumb className={"mt-2"}>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    Admin
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Products</Breadcrumb.Item>
            </Breadcrumb>
        </>
    );
}
