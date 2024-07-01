"use client";

import React, {useEffect, useState} from "react";
import {Card, Container, Form, Toast, ToastContainer} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form";
import {UpdateStoreConfigInputs, UpdateStoreConfigInputsSchema} from "@/core/types/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/app/loading";
import {useSession} from "next-auth/react";
import {useMe} from "@/core/hooks/useMe";
import {usePaymentMethod} from "@/core/hooks/usePaymentMethod";
import {useDeliveryMethod} from "@/core/hooks/useDeliveryMethod";
import AppButton from "@/components/app/AppButton";

export default function ConfigStoreForm() {

    const [me, setMe] = useState<Prisma.User>();
    const [store, setStore] = useState<Prisma.Store>();
    const [paymentMethods, setPaymentMethods] = useState<Prisma.StorePaymentMethod[]>([]);
    const [deliveryMethods, setDeliveryMethods] = useState<Prisma.StoreDeliveryMethod[]>([]);
    const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

    const meState = useMe();
    const paymentMethodState = usePaymentMethod();
    const deliveryMethodState = useDeliveryMethod();

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        },
        setError
    } = useForm<UpdateStoreConfigInputs>({
        resolver: zodResolver(UpdateStoreConfigInputsSchema),
    });

    const {
        data: session
    } = useSession({
        required: true,
    });

    useEffect(() => {
        meState.get().then((p: Prisma.User | null) => {
            if (p) setMe(p);
        });
    }, []);

    useEffect(() => {
        if (!me?.stores?.length) {
            return;
        }

        setStore(me.stores[0]);
    }, [me]);

    useEffect(() => {
        paymentMethodState.findAll().then((p: Prisma.PaymentMethod[]) => {
            if (p) setPaymentMethods(p);
        });
    }, []);

    useEffect(() => {
        deliveryMethodState.findAll().then((p: Prisma.DeliveryMethod[]) => {
            if (p) setDeliveryMethods(p);
        });
    }, []);

    const onSubmit: SubmitHandler<UpdateStoreConfigInputs> = async function (data) {

        try {

            if (!store) {
                return;
            }

            const response = await fetch(`/api/store/${store.id}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();

                console.log(responseData);

                setShowSuccessToast(true);
            } else {
                const errorData = await response.json();

                if (errorData?.error?.issues) {
                    const {issues} = errorData.error;

                    issues.forEach((issue: { path: any[]; message: any; }) => {
                        const field = issue.path[0];
                        const errorMessage = issue.message;

                        setError(field, {
                            type: 'custom',
                            message: errorMessage,
                        });
                    });
                }
            }
        } catch (error) {
            console.error('Error saving store config:', error);
        }
    };

    if (!store) {
        return <Loading/>;
    }

    return (
        <>
            <Container>
                <Card className="mt-3" style={{marginBottom: "100px"}}>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome do restaurante"
                                    aria-label="Nome do restaurante"
                                    aria-describedby="name"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    defaultValue={store.name}
                                    isInvalid={!!errors.name}
                                    {...register("name", {
                                        required: true
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Valor mínimo de pedido</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Informe valor mínimo"
                                    aria-label="Valor mínimo de pedido"
                                    aria-describedby="price"
                                    aria-invalid={errors.minimum_order_price ? "true" : "false"}
                                    isInvalid={!!errors.minimum_order_price}
                                    defaultValue={String(store.minimum_order_price)}
                                    {...register("minimum_order_price", {
                                        required: true,
                                        valueAsNumber: true
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.minimum_order_price?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Métodos de pagamento</Form.Label>
                                {paymentMethods.map((method: Prisma.StorePaymentMethod, index: number) => (
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        label={method.paymentMethod?.name}
                                        defaultChecked={store.paymentMethods?.includes(method)}
                                    />
                                ))}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Métodos de entrega</Form.Label>
                                {deliveryMethods.map((method: Prisma.StoreDeliveryMethod, index: number) => (
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        label={method.deliveryMethod?.name}
                                        defaultChecked={store.deliveryMethods?.includes(method)}
                                    />
                                ))}
                            </Form.Group>

                            <AppButton
                                type={"submit"}
                                variant={"success"}
                                isLoading={isSubmitting}
                            >Concluir</AppButton>
                        </Card.Body>
                    </Form>
                </Card>
            </Container>

            <ToastContainer
                position={"top-end"}
                className="p-3"
            >
                <Toast
                    bg={"success"}
                    onClose={() => setShowSuccessToast(false)}
                    show={showSuccessToast}
                    delay={5000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Sucesso</strong>
                    </Toast.Header>
                    <Toast.Body>Configurações da loja atualizadas com sucesso</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
