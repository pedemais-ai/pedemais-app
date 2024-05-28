"use client";

import React from "react";
import {Nav} from "react-bootstrap";
import {usePathname} from "next/navigation";

export default function ConfigNavs() {
    const pathname = usePathname();

    const navItems = [
        {href: "/admin/config/menu", text: "Cardápio"},
        {href: "/admin/config/order", text: "Pedidos"},
        {href: "/admin/config/calendar", text: "Feriados"},
        {href: "/admin/config/printer", text: "Impressora"},
        {href: "/admin/config/store", text: "Estabelecimento"},
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
