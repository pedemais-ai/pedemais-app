"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { faBox, faChartBar, faHome, faShoppingCart, faTruck, faUsers } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
    const [expanded, setExpanded] = useState(false);
  
    // Function to get the current time and date
    const getCurrentDateTime = () => {
      const currentTime = new Date();
  
      // Format the date with the day of the week, day of the month, and month
      const dayOfWeek = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(currentTime);
      const dayOfMonth = new Intl.DateTimeFormat('pt-BR', { day: 'numeric' }).format(currentTime);
      const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(currentTime);
  
      // Format the time
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
        <header>
          <Navbar expand="lg" bg="dark" variant="dark">
            <Container fluid>
              <Link href="/admin" passHref>
                <Navbar.Brand className="text-white">
                  <FontAwesomeIcon icon={faTruck} />
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
                <Nav className="ml-auto">
                  <div className="text-white d-flex">
                    <div className="col-auto">
                      <p className="mb-0">{dayOfWeek.toUpperCase()}<br />{dayOfMonth} {month.toUpperCase()}</p>
                    </div>
                    <div className="col-auto">
                      <p className="mb-0 fs-2">{formattedTime}</p>
                    </div>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }