"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Container} from "react-bootstrap";
import {faBox, faChartBar, faHome, faShoppingCart, faTruck, faUsers} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header>
                <div className="px-3 py-2 text-bg-dark border-bottom">
                    <Container>
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <Link href={"/admin"} className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                                <FontAwesomeIcon icon={faTruck}/>
                                <h4 className={"ms-2"}>Admin</h4>
                            </Link>

                            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                <li>
                                    <Link href={"/admin"} className="nav-link text-secondary">
                                        <FontAwesomeIcon icon={faHome} className={"d-block mx-auto mb-1"}/>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/admin"} className="nav-link text-white">
                                        <FontAwesomeIcon icon={faChartBar} className={"d-block mx-auto mb-1"}/>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/admin"} className="nav-link text-white">
                                        <FontAwesomeIcon icon={faShoppingCart} className={"d-block mx-auto mb-1"}/>
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/admin/products"} className="nav-link text-white">
                                        <FontAwesomeIcon icon={faBox} className={"d-block mx-auto mb-1"}/>
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/admin"} className="nav-link text-white">
                                        <FontAwesomeIcon icon={faUsers} className={"d-block mx-auto mb-1"}/>
                                        Customers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Container>
                </div>
            </header>
        </>
    );
}
