"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Badge, Button, Container, Form, InputGroup, Navbar, Row} from "react-bootstrap";
import {useProduct} from "@/core/hooks/useProduct";
import Image from "next/image";
import slugify from "slugify";
import {useRouter} from "next/navigation";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";

export default function Product({id}: { id: number }) {

    const router = useRouter();
    const productState = useProduct();

    const [product, setProduct] = useState<Prisma.Product | null>();
    const [quantity, setQuantity] = useState(1);

    const handleBackButtonClick = () => {
        router.back();
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
    }, [id]);

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
                            <Badge bg="secondary" pill>R$9.99</Badge>
                        </div>
                    </div>
                </Row>
                <Navbar className="bg-body-tertiary" fixed={"bottom"}>
                    <Container>
                        <Navbar.Brand>
                            <InputGroup className="mb-3">
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleQuantityDecrease}
                                >
                                    -
                                </Button>
                                <Form.Control
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    value={quantity}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleQuantityIncrease}
                                >
                                    +
                                </Button>
                            </InputGroup>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Button
                                variant="primary"
                                onClick={handleAddToCart}
                            >
                                Adicionar
                            </Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        </Suspense>
    </>)
};
