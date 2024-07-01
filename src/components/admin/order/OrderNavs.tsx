"use client";

import React from "react";
import {Nav} from "react-bootstrap";
import {usePathname} from "next/navigation";

export default function OrderNavs() {
    const pathname = usePathname();

    const navItems = [
        {href: "/admin/order/delivery", text: "Delivery"},
        {href: "/admin/order/table", text: "Mesas"}
    ];

    return (
        <>
            <Nav variant="tabs">
                {navItems.map((item, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link href={item.href} active={pathname === item.href}>
                            {item.text}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </>
    );
}
