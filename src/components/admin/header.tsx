"use client";

import React, { useState } from "react";
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
    const [expanded, setExpanded] = useState(false);

    const getCurrentDateTime = () => {
        const currentTime = new Date();

        const dayOfWeek = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(currentTime);
        const dayOfMonth = new Intl.DateTimeFormat('pt-BR', { day: 'numeric' }).format(currentTime);
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(currentTime);

        const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
            hour: 'numeric',
            minute: 'numeric',
        });

        return {
            dayOfWeek,
            dayOfMonth,
            month,
            formattedTime,
        };
    };

    const { dayOfWeek, dayOfMonth, month, formattedTime } = getCurrentDateTime();

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Link href={"/admin"} passHref>
                        <Navbar.Brand className="text-white">
                            Pede.AI
                        </Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} href={"/admin/delivery"}>
                                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                                Restaurante
                            </Nav.Link>
                            <Nav.Link as={Link} href={"/admin/products"}>
                                <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                                Gestor de Cardápio
                            </Nav.Link>
                        </Nav>
                        <div className="position-absolute end-0 text-white d-flex align-items-center me-2">

                            <div className="text-right">
                                <Row className="mb-0">
                                    <Col className="text-end mb-0" style={{ lineHeight: '1', fontSize: '0.75rem' }}>
                                        <small>{dayOfWeek.toUpperCase()}</small>
                                        <br />
                                        <small>{dayOfMonth} {month.toUpperCase()}</small>
                                    </Col>
                                </Row>
                            </div>
                            <div className="text-right ms-1 me-4">
                                <p className="mb-0 fs-3">{formattedTime}</p>
                            </div>
                            <div className="position-static me-2">
                                {/* Menu Dropdown "Admin" */}
                                <NavDropdown
                                    title={
                                        <>
                                            <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                                            Admin
                                        </>
                                    }
                                    id="admin-dropdown"
                                    // @ts-ignore
                                    drop="down"
                                    align="end"
                                    style={{ marginLeft: 'auto' } as React.CSSProperties}
                                >
                                    <NavDropdown.Item href="#minha-conta">Minha Conta</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#sair">Sair</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
