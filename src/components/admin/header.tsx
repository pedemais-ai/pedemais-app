"use client";

import React, {useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {faTruck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import AppIcon from "@/components/app/AppIcon";

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
          <Link href="/admin" passHref>
            <Navbar.Brand className="text-white">
              Pede.AI
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link href="/admin" passHref>
                <Nav.Link className="text-secondary">
                  Home
                </Nav.Link>
              </Link>
              <Link href="/admin" passHref>
                <Nav.Link className="text-white">
                  Dashboard
                </Nav.Link>
              </Link>
              <Link href="/admin" passHref>
                <Nav.Link className="text-white">
                  Orders
                </Nav.Link>
              </Link>
              <Link href="/admin/products" passHref>
                <Nav.Link className="text-white">
                  Products
                </Nav.Link>
              </Link>
              <Link href="/admin" passHref>
                <Nav.Link className="text-white">
                  Customers
                </Nav.Link>
              </Link>
            </Nav>
            <div className="ml-auto text-white d-flex align-items-center">
            {/* Coluna da Esquerda */}
            <div className="text-right">
                <Row className="mb-0">
                <Col className="text-end mb-0" style={{ lineHeight: '1', fontSize: '0.75rem' }}>
                    <small>{dayOfWeek.toUpperCase()}</small>
                    <br />
                    <small>{dayOfMonth} {month.toUpperCase()}</small>
                </Col>
                </Row>
            </div>
            {/* Coluna da Direita */}
            <div className="text-right">
                <p className="mb-0 fs-3 ms-1">{formattedTime}</p>
            </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
