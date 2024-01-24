"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Badge, Button, Container, Form, InputGroup, Navbar, Row} from "react-bootstrap";
import {useProduct} from "@/core/hooks/useProduct";
import Image from "next/image";
import slugify from "slugify";
import {useRouter} from "next/navigation";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {formatCurrency} from "@/core/functions";

export default function Product({id}: { id: number }) {

    const router = useRouter();
    const productState = useProduct();

    const [product, setProduct] = useState<Prisma.Product | null>();
    const [quantity, setQuantity] = useState(1);

    const handleBackButtonClick = () => {
        router.back();
    };

    const handleQuantityChange = (e: {
        target: {
            value: string;
        };
    }) => {
        let value: number | undefined = Number(e.target.value);

        if (value < 1 || isNaN(value)) {
            value = 1;
        }

        setQuantity(value)
    };

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = async () => {
        try {
            const response = await fetch(`/api/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: quantity,
                }),
            });

            if (response.ok) {
                console.log("Product added to cart successfully!");
            } else {
                console.error("Error adding product to cart:", response.statusText);
            }

        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    useEffect(() => {
        productState.find(id).then((p: Prisma.Product | null) => setProduct(p))
    }, [id, productState]);

    return (<>
        <Suspense fallback={<Loading/>}>
            <Container>
                <Navbar className="bg-body-tertiary" fixed={"top"}>
                    <Container>
                        <Navbar.Brand>
                            {product?.store?.name}
                        </Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Button variant="outline-secondary" onClick={handleBackButtonClick}>
                                Voltar
                            </Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Row style={{marginTop: '4rem'}}>
                    <div className="d-flex">
                        <div className="flex-shrink-0">
                            <Image
                                src="https://via.placeholder.com/100" alt={slugify(product?.name || '').toLowerCase()}
                                className="img-thumbnail mr-3"
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <h4 className="mb-1">{product?.name}</h4>
                            <p className="mb-1">{product?.description}</p>
                        </div>
                        <div>
                            <Badge bg="secondary" pill>{formatCurrency(product?.prices?.[0].price || 0)}</Badge>
                        </div>
                    </div>
                </Row>
                <Navbar className="bg-body-tertiary" fixed={"bottom"}>
                    <Container>
                        <div className="flex-shrink-0">
                            <InputGroup className="mb-3">
                                <Button
                                    variant="outline-secondary"
                                    disabled={quantity <= 1}
                                    onClick={handleQuantityDecrease}
                                >
                                    -
                                </Button>
                                <Form.Control
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleQuantityIncrease}
                                >
                                    +
                                </Button>
                            </InputGroup>
                        </div>
                        <Button
                            variant="primary"
                            onClick={handleAddToCart}
                        >
                            Adicionar
                        </Button>
                    </Container>
                </Navbar>
            </Container>
        </Suspense>
    </>)
};
