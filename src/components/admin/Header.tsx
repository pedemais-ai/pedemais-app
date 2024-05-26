"use client";

import React, {useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {faClipboardList, faCog, faUser, faUtensils} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Timer from "@/components/admin/header/Timer";
import AppIcon from "@/components/app/AppIcon";

export default function Header() {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand className="text-white">
                        <Nav.Link as={Link} href={"/admin"}>
                            PedeMais.ai
                        </Nav.Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)}/>

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} href={"/admin/delivery"}>
                                <AppIcon icon={faUtensils} className="me-2"/>
                                Restaurante
                            </Nav.Link>
                            <Nav.Link as={Link} href={"/admin/products"}>
                                <AppIcon icon={faClipboardList} className="me-2"/>
                                Gestor de Cardápio
                            </Nav.Link>
                            <Nav.Link as={Link} href={"/admin/config/store"}>
                                <AppIcon icon={faCog} className="me-2"/>
                                Configurações
                            </Nav.Link>
                        </Nav>
                        <div className="position-absolute end-0 text-white d-flex align-items-center me-2">

                            <Timer />

                            <div className="position-static me-2">
                                <NavDropdown
                                    title={
                                        <>
                                            <AppIcon icon={faUser} style={{marginRight: '8px'}}/>
                                            Admin
                                        </>
                                    }
                                    id="admin-dropdown"
                                    drop="down"
                                    align="end"
                                    style={{marginLeft: 'auto'} as React.CSSProperties}
                                >
                                    <NavDropdown.Item href="/admin/my-account">Minha Conta</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="/api/auth/signout">Sair</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
