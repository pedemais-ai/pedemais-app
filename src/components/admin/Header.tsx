"use client";

import React, {useEffect, useState} from "react";
import {Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {faClipboardList, faCog, faUser, faUtensils} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import AppIcon from "@/components/app/AppIcon";

export default function Header() {
    const [expanded, setExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(getCurrentDateTime());

    function getCurrentDateTime() {
        const currentTime = new Date();

        const dayOfWeek = new Intl.DateTimeFormat('pt-BR', {weekday: 'long'}).format(currentTime);
        const dayOfMonth = new Intl.DateTimeFormat('pt-BR', {day: 'numeric'}).format(currentTime);
        const month = new Intl.DateTimeFormat('pt-BR', {month: 'short'}).format(currentTime);

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
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand className="text-white">
                        <Nav.Link as={Link} href={"/admin"}>
                            qfome.ai
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
                            <Nav.Link as={Link} href={"/admin/config"}>
                                <AppIcon icon={faCog} className="me-2"/>
                                Configurações
                            </Nav.Link>
                        </Nav>
                        <div className="position-absolute end-0 text-white d-flex align-items-center me-2">

                            <div className="text-right">
                                <Row className="mb-0">
                                    <Col className="text-end mb-0" style={{lineHeight: '1', fontSize: '0.75rem'}}>
                                        <small>{currentTime.dayOfWeek.toUpperCase()}</small>
                                        <br/>
                                        <small>{currentTime.dayOfMonth} {currentTime.month.toUpperCase()}</small>
                                    </Col>
                                </Row>
                            </div>
                            <div className="text-right ms-1 me-4">
                                <p className="mb-0 fs-3">{currentTime.formattedTime}</p>
                            </div>
                            <div className="position-static me-2">
                                {/* Menu Dropdown "Admin" */}
                                <NavDropdown
                                    title={
                                        <>
                                            <AppIcon icon={faUser} style={{marginRight: '8px'}}/>
                                            Admin
                                        </>
                                    }
                                    id="admin-dropdown"
                                    // @ts-ignore
                                    drop="down"
                                    align="end"
                                    style={{marginLeft: 'auto'} as React.CSSProperties}
                                >
                                    <NavDropdown.Item href="/admin/myaccount">Minha Conta</NavDropdown.Item>
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
