"use client";

import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Placement} from "react-bootstrap/types";

export default function NavItem({title, href, icon, iconPlacement = 'top', onClick}: {
    title: string,
    href: string,
    icon: string,
    iconPlacement?: Placement,
    onClick?: () => void
}) {
    return (
        <>
            <Nav.Item
                title={title}
                onClick={onClick}
            >
                <OverlayTrigger
                    placement={iconPlacement}
                    overlay={<Tooltip>{title}</Tooltip>}
                >
                    <Nav.Link
                        href={href}
                        role={"tab"}
                    >
                        <i className={icon}></i>
                    </Nav.Link>
                </OverlayTrigger>
            </Nav.Item>
        </>
    );
}