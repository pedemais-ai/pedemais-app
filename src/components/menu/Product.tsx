"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Button, Col, Container, Form, InputGroup, Navbar, Placeholder, Ratio, Row} from "react-bootstrap";
import {useProduct} from "@/core/hooks/useProduct";
import Image from "next/image";
import slugify from "slugify";
import {useRouter} from "next/navigation";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {formatCurrency} from "@/core/functions";
import AppButton from "@/components/app/AppButton";
import AppIcon from "@/components/app/AppIcon";
import {faCartPlus, faChevronLeft, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from "./product.module.css";
import {useCart} from "@/core/hooks/useCart";

export default function Product({id}: { id: number }) {

    const router = useRouter();
    const productState = useProduct();
    const cartState = useCart();

    const [product, setProduct] = useState<Prisma.Product | null>();
    const [quantity, setQuantity] = useState(1);
    const [isAddingProduct, setIsAddingProduct] = useState(false);

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

        setIsAddingProduct(true);

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
                cartState.clean();
                router.push('/cart');
            } else {
                console.error("Error adding product to cart:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        } finally {
            setIsAddingProduct(false);
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
                        {product ? <>
                            <Navbar.Brand>
                                <h3>{product?.category?.store?.name}</h3>
                            </Navbar.Brand>
                        </> : <>
                            <Placeholder animation="glow" as={Navbar.Brand}>
                                <Placeholder xs={12}/>
                            </Placeholder>
                        </>}

                        <Navbar.Collapse className="justify-content-end">
                            <Button variant="outline-secondary" onClick={handleBackButtonClick}>
                                <AppIcon icon={faChevronLeft} className={"me-2"}/>
                                Voltar
                            </Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container style={{marginTop: '5rem'}}>
                    <Row className="g-4 align-items-center">
                        <Col md={4} xs={12}>
                            <Ratio aspectRatio={'4x3'}>
                                {product ?
                                    <Image
                                        src={product?.images?.[0].path ?? ''}
                                        alt={slugify(product?.name || '').toLowerCase()}
                                        className="img-thumbnail w-100"
                                        width={400}
                                        height={300}
                                        objectFit="cover"
                                        loading="lazy"
                                    /> : <>
                                        <Placeholder animation="glow">
                                            <Placeholder xs={12} style={{height: '100%'}}/>
                                        </Placeholder>
                                    </>}
                            </Ratio>
                        </Col>

                        <Col md={8} xs={12} className="d-flex flex-column">
                            <h4 className="mb-3">{product ? product?.name : <>
                                <Placeholder animation="glow">
                                    <Placeholder xs={8}/>
                                </Placeholder>
                            </>}</h4>
                            <h5 className="text-primary mb-3">
                                {product ? formatCurrency(product?.prices?.[0].price || 0) : <>
                                    <Placeholder animation="glow">
                                        <Placeholder xs={3} bg="primary"/>
                                    </Placeholder>
                                </>}
                            </h5>
                            <p className="mb-0">{product ? product?.description : <>
                                <Placeholder animation="glow">
                                    <Placeholder xs={8}/> <Placeholder xs={3}/> <Placeholder xs={4}/>
                                    <Placeholder xs={6}/> <Placeholder xs={8}/>
                                </Placeholder>
                            </>}</p>
                        </Col>
                    </Row>
                </Container>

                <Navbar className="bg-body-tertiary" fixed={"bottom"}>
                    <Container className="d-flex align-items-center justify-content-center">
                        <div>
                            <InputGroup style={{flexWrap: "nowrap"}}>
                                <Button
                                    variant="outline-secondary"
                                    disabled={quantity <= 1}
                                    onClick={handleQuantityDecrease}
                                >
                                    <AppIcon icon={faMinus}/>
                                </Button>
                                <Form.Control
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className={styles.quantityInput}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleQuantityIncrease}
                                >
                                    <AppIcon icon={faPlus}/>
                                </Button>
                            </InputGroup>
                        </div>
                        <AppButton
                            variant="primary"
                            onClick={handleAddToCart}
                            isLoading={isAddingProduct}
                            className="w-100 ms-2"
                        >
                            <AppIcon icon={faCartPlus} className={"me-2"}/>
                            Adicionar
                        </AppButton>
                    </Container>
                </Navbar>
            </Container>
        </Suspense>
    </>)
};
