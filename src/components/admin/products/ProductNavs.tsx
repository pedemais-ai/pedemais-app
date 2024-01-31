"use client";

import React from "react";
import {Nav} from "react-bootstrap";
import {usePathname} from "next/navigation";

export default function ProductNavs() {
    const pathname = usePathname();

    const navItems = [
        {href: "/admin/products", text: "Gestor"},
        {href: "/admin/products/images", text: "Imagens do cardápio"},
        {href: "/admin/products/list", text: "Lista de produtos"}
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
