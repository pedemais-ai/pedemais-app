"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Badge, Button, Container, Form, InputGroup, ListGroup, Navbar} from "react-bootstrap";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {useRouter} from "next/navigation";
import {useCart} from "@/core/hooks/useCart";
import {formatCurrency} from "@/core/functions";
import Image from "next/image";
import slugify from "slugify";

export default function Cart() {

    const router = useRouter();

    const handleBackButtonClick = () => {
        router.back();
    };

    const cartState = useCart();
    const [cart, setCart] = useState<Prisma.Cart | null>()

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p))
    }, []);

    return (<>
        <Container>
            <Navbar className="bg-body-tertiary" fixed={"top"}>
                <Container>
                    <Navbar.Brand>
                        Carrinho de compras
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-secondary" onClick={handleBackButtonClick}>
                            Voltar
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ListGroup style={{marginTop: '4rem'}}>
                <Suspense fallback={<Loading/>}>
                    {!cart?.items || cart?.items?.length === 0 ? (
                        <ListGroup.Item variant="info">Seu carrinho está vazio</ListGroup.Item>
                    ) : (
                        cart?.items.map((item: Prisma.CartItem) => (
                            <ListGroup.Item
                                key={item.id}
                            >
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <Image
                                            src="https://via.placeholder.com/100" alt={slugify(item.product?.name!).toLowerCase()}
                                            className="img-thumbnail mr-3"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h4 className="mb-1">{item.product?.name}</h4>
                                        <p className="mb-1">{item.product?.description}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div>
                                            <Badge bg="secondary" pill>{formatCurrency(item.product?.prices?.[0].price!)}</Badge>
                                        </div>
                                        <div className="mt-2">
                                            <InputGroup>
                                                <Button
                                                    variant="outline-secondary"
                                                    // onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </Button>
                                                <Form.Control
                                                    type="number"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="text-center"
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    // onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </Button>
                                            </InputGroup>
                                        </div>
                                    </div>

                                </div>
                            </ListGroup.Item>
                        ))
                    )}
                </Suspense>
            </ListGroup>
            <Navbar className="bg-body-tertiary" fixed={"bottom"}>
                <Container>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="primary" id="button-addon1">
                            Avançar ({formatCurrency(cart?.totalPrice || 0)})
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    </>)
};
