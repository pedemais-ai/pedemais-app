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
import {SubmitHandler, useForm} from "react-hook-form";
import {CheckoutInputs, CheckoutInputsSchema} from "@/core/types/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import AppButton from "@/components/app/AppButton";
import {useStore} from "@/core/hooks/useStore";

export default function Checkout() {

    const router = useRouter();
    const cartState = useCart();
    const storeState = useStore();

    const [store, setStore] = useState<Prisma.Store>();
    const [cart, setCart] = useState<Prisma.Cart | null>();

    const handleBackButtonClick = () => {
        router.push('/cart');
    };

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        },
        setError
    } = useForm<CheckoutInputs>({
        resolver: zodResolver(CheckoutInputsSchema),
    });

    const onSubmit: SubmitHandler<CheckoutInputs> = async function (data) {
        try {
            if (!store) {
                return;
            }

            const response = await fetch(`/api/checkout`, {
                method: 'POST',
                body: JSON.stringify({
                    store_id: store.id,
                    ...data
                }),
            });

            if (response.ok) {
                const responseData = await response.json();

                console.log(responseData);

                router.push(`/order/${responseData.id}`);
            }
        } catch (error) {
            console.error('Error on checkout:', error);
        }
    };

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null) => setCart(p))
    }, [cartState]);

    useEffect(() => {
        const storeId = localStorage.getItem("currentStore");

        storeState.find(Number(storeId)).then((s) => {
            if (s) setStore(s);
        })

    }, [storeState]);

    return (<>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>

            {store ? <Form.Control
                type="hidden"
                {...register("storeId")}
                value={store.id}
            /> : <></>}

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
                    <Suspense fallback={<Loading/>}>

                        {!cart?.items || cart?.items?.length === 0 ? (
                            <span>nada por aqui</span>
                        ) : (
                            <>
                                <h2>Confirme seus itens</h2>
                                <table>
                                    <tbody>
                                    {cart?.items.map((item: Prisma.CartItem, index: number) => (<>
                                        <tr key={index}>
                                            <td>{item.quantity}x {item.product?.name}</td>
                                            <td>{formatCurrency(item.product?.prices?.[0].price! * item.quantity)}</td>
                                        </tr>
                                    </>))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </Suspense>
                </div>

                <Row className="mt-3">
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Método de pagamento</Form.Label>
                            {store?.paymentMethods?.map((method: Prisma.StorePaymentMethod, index: number) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    id={`paymentMethod${index}`}
                                    label={method.paymentMethod?.name}
                                    value={method.id}
                                    {...register("paymentMethod", {
                                        valueAsNumber: true
                                    })}
                                />
                            ))}
                            <Form.Control.Feedback type="invalid">
                                {errors.paymentMethod?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Opçoes de entrega</Form.Label>
                            {store?.deliveryMethods?.map((method: Prisma.StoreDeliveryMethod, index: number) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    id={`deliveryMethod${index}`}
                                    label={method.deliveryMethod?.name}
                                    value={method.id}
                                    {...register("deliveryMethod", {
                                        valueAsNumber: true
                                    })}
                                />
                            ))}
                            <Form.Control.Feedback type="invalid">
                                {errors.deliveryMethod?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Navbar className="bg-body-tertiary" fixed={"bottom"}>
                    <Container className="col-md-6">
                        <Navbar.Collapse className="justify-content-end">
                            <AppButton
                                type={"submit"}
                                className="w-100 my-2 fs-5"
                                variant="primary"
                                disabled={cart?.items?.length === 0}
                                isLoading={isSubmitting}
                            >
                                Concluir pedido ({formatCurrency(cart?.totalPrice || 0)})
                            </AppButton>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        </Form>
    </>)
};
