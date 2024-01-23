"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Button, Container, ListGroup, Navbar} from "react-bootstrap";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {useRouter} from "next/navigation";
import {useCart} from "@/core/hooks/useCart";

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
                            <ListGroup.Item key={item.id}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{item.product?.name}</strong>
                                        <p>{item.product?.description}</p>
                                    </div>
                                    <div>
                                        <span className="fw-bold">R$9.99</span>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))
                    )}
                </Suspense>
            </ListGroup>
        </Container>
    </>)
};
