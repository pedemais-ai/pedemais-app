"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Button, Col, Container, Form, InputGroup, Navbar, Row} from "react-bootstrap";
import {useProduct} from "@/core/hooks/useProduct";
import Image from "next/image";
import slugify from "slugify";
import {useRouter} from "next/navigation";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {formatCurrency} from "@/core/functions";
import AppButton from "@/components/app/AppButton";
import AppIcon from "@/components/app/AppIcon";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import styles from "./product.module.css";

export default function Product({id}: { id: number }) {

    const router = useRouter();
    const productState = useProduct();

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
                        <Navbar.Brand>
                            <h3>{product?.category?.store?.name}</h3>
                        </Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Button variant="outline-secondary" onClick={handleBackButtonClick}>
                                <AppIcon icon={faChevronLeft} className={"me-2"}/>
                                Voltar
                            </Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container style={{ marginTop: '5rem' }}>
  <Row className="g-4">
    {/* Imagem do produto */}
    <Col md={4} xs={12}>
      <Image
        src="https://via.placeholder.com/350"
        alt={slugify(product?.name || '').toLowerCase()}
        className="img-thumbnail w-100"
        width={350}
        height={263} // Proporção 4:3
        layout="responsive"
        objectFit="cover"
        loading="lazy"
        style={{ maxWidth: '100%' }}
      />
    </Col>

    {/* Informações do produto */}
    <Col md={8} xs={12} className="d-flex flex-column">
      {/* Nome do produto */}
      <h4 className="mb-3">{product?.name}</h4>

      {/* Preço do produto com destaque em azul */}
      <h5 className="text-primary mb-3">{formatCurrency(product?.prices?.[0].price || 0)}</h5>

      {/* Descrição do produto */}
      <p className="mb-0">{product?.description}</p>
    </Col>
  </Row>
</Container>



                <Navbar className="bg-body-tertiary" fixed={"bottom"}>
                <Container className="d-flex align-items-center justify-content-center">
  <div>
    <InputGroup style={{ flexWrap: "nowrap" }}>
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
        className={styles.quantityInput}
      />
      <Button
        variant="outline-secondary"
        onClick={handleQuantityIncrease}
      >
        +
      </Button>
    </InputGroup>
  </div>
  <AppButton
    variant="primary"
    onClick={handleAddToCart}
    isLoading={isAddingProduct}
    className="w-100 ms-2"
  >
    Adicionar
  </AppButton>
</Container>


                </Navbar>
            </Container>
        </Suspense>
    </>)
};
