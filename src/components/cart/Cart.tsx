"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Button, Container, Form, InputGroup, ListGroup, Navbar} from "react-bootstrap";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {useRouter} from "next/navigation";
import {useCart} from "@/core/hooks/useCart";
import {formatCurrency} from "@/core/functions";
import Image from "next/image";
import slugify from "slugify";
import AppIcon from "@/components/app/AppIcon";
import {faChevronLeft, faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import styles from "./cart.module.css";

export default function Cart() {

    const router = useRouter();
    const cartState = useCart();

    const [cart, setCart] = useState<Prisma.Cart | null>();
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

    const handleBackButtonClick = () => {
        router.back();
    };

    const handleQuantityChange = async (id: number, quantity: number) => {
        setIsUpdatingQuantity(true);

        try {
            const response = await fetch(`/api/cart`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    quantity: quantity,
                }),
            });

            if (response.ok) {
                cartState.clean();
                cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p))
            } else {
                console.error("Error updating quantity:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setIsUpdatingQuantity(false);
        }
    };

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p))
    }, [cartState]);

    return (<>
        <Container>
            <Navbar className="bg-body-tertiary" fixed={"top"}>
                <Container>
                    <Navbar.Brand>
                        Carrinho de compras
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-secondary" onClick={handleBackButtonClick}>
                            <AppIcon icon={faChevronLeft} className={"me-2"}/>
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
                                            className="mr-3"
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <p className="mb-0 fs-6 fw-bold">{item.product?.name}</p>
                                        <p className="text-primary mb-2 fs-6">{formatCurrency(item.product?.prices?.[0].price! * item.quantity)}</p>
                                        {item.note ? <small className="mt-3 text-muted fs-0">Obs: {item.note}</small> : ''}
                                    </div>
                                    <div className="d-flex flex-column flex-shrink-0 ms-auto align-items-end ">
                                        
                                        <div className="mt-3">
                                            <InputGroup size={"sm"}>
                                                <Button
                                                    variant="outline-secondary"
                                                    disabled={isUpdatingQuantity}
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                >
                                                    {item.quantity > 1 ? <AppIcon icon={faMinus}/> : <AppIcon icon={faTrash}/>}
                                                </Button>
                                                <Form.Control
                                                    type="text"
                                                    value={item.quantity}
                                                    className={styles.quantityInput}
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    disabled={isUpdatingQuantity}
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                >
                                                    <AppIcon icon={faPlus}/>
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
                        <Button
                            className="w-100 my-2 fs-5"
                            variant="primary"
                            disabled={cart?.items?.length === 0}
                        >
                            Avançar ({formatCurrency(cart?.totalPrice || 0)})
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    </>)
};
