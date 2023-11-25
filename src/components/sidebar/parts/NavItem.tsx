"use client";

import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Placement} from "react-bootstrap/types";

export default function NavItem({title, href, icon, iconPlacement = 'top'}: {
    title: string,
    href: string,
    icon: string,
    iconPlacement?: Placement
}) {
    return (
        <>
            <Nav.Item title={title}>
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