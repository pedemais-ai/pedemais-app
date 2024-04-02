"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Button, Col, Container, Form, Navbar, Row} from "react-bootstrap";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {useRouter} from "next/navigation";
import {useCart} from "@/core/hooks/useCart";
import {formatCurrency} from "@/core/functions";
import AppIcon from "@/components/app/AppIcon";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import {AddProductInputs, AddProductInputsSchema} from "@/core/types/zod";
import {zodResolver} from "@hookform/resolvers/zod";

export default function Checkout() {

    const router = useRouter();
    const cartState = useCart();

    const [cart, setCart] = useState<Prisma.Cart | null>();

    const handleBackButtonClick = () => {
        router.push('/cart');
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        },
        setError
    } = useForm<AddProductInputs>({
        resolver: zodResolver(AddProductInputsSchema),
    });

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p))
    }, [cartState]);

    return (<>
        <Container className="col-md-6">
            <Navbar className="bg-body-tertiary" fixed={"top"}>
                <Container>
                    <Navbar.Brand>
                        Finalizar pedido
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="outline-secondary" onClick={handleBackButtonClick}>
                            <AppIcon icon={faChevronLeft} className={"me-2"}/>
                            Voltar para o carrinho
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{marginTop: '4rem'}}>
                <table>
                    <Suspense fallback={<Loading/>}>

                        {!cart?.items || cart?.items?.length === 0 ? (
                            <span>nada por aqui</span>
                        ) : (
                            cart?.items.map((item: Prisma.CartItem) => (<>
                                <tr key={item.id}>
                                    <td>{item.quantity}x {item.product?.name}</td>
                                    <td>{formatCurrency(item.product?.prices?.[0].price! * item.quantity)}</td>
                                </tr>
                            </>))
                        )}
                    </Suspense>
                </table>
            </div>

            <Row className="mt-5">
                <Col md={5}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do produto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Informe o nome"
                            aria-label="Nome do produto"
                            aria-describedby="name"
                            aria-invalid={errors.name ? "true" : "false"}
                            {...register("name", {required: true})}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição do produto</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Ex: Pão brioche com fatias crocantes de bacon e queijo mussarela"
                            aria-label="Descrição do produto"
                            aria-describedby="description"
                            aria-invalid={errors.description ? "true" : "false"}
                            {...register("description", {required: true})}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Preço do produto</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Informe preço"
                            aria-label="Preço do produto"
                            aria-describedby="price"
                            aria-invalid={errors.price ? "true" : "false"}
                            {...register("price", {required: true})}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>


            <Navbar className="bg-body-tertiary" fixed={"bottom"}>
                <Container className="col-md-6">
                    <Navbar.Collapse className="justify-content-end">
                        <Button
                            className="w-100 my-2 fs-5"
                            variant="primary"
                            disabled={cart?.items?.length === 0}
                        >
                            Concluir pedido ({formatCurrency(cart?.totalPrice || 0)})
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    </>)
};
