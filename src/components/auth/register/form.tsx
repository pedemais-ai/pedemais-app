"use client";

import Link from "next/link";
import Image from "next/image";
import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {SubmitHandler, useForm} from "react-hook-form"
import {UserRegistrationInputs, UserRegistrationInputsSchema} from "@/components/auth/register/types";
import {zodResolver} from '@hookform/resolvers/zod';
import {signIn} from "next-auth/react";

export default function RegisterForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
        setError
    } = useForm<UserRegistrationInputs>({
        resolver: zodResolver(UserRegistrationInputsSchema),
    });

    const onSubmit: SubmitHandler<UserRegistrationInputs> = async function (data) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();

                await signIn('credentials', {
                    email: responseData.email,
                    password: responseData.password,
                    callbackUrl: '/',
                });
            } else {
                const errorData = await response.json();

                if (errorData?.error?.issues) {
                    const {issues} = errorData.error;

                    issues.forEach((issue: { path: any[]; message: any; }) => {
                        const field = issue.path[0]; // Assuming each issue has only one path
                        const errorMessage = issue.message;

                        setError(field, {
                            type: 'custom',
                            message: errorMessage,
                        });
                    });
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                    <div className="text-center mb-4">
                        <Link href="/" className="auth-logo mb-5 d-block">
                            <Image src="/assets/images/logo-dark.png" alt="logo-dark" width={140} height={30} className="logo logo-dark"/>
                            <Image src="/assets/images/logo-light.png" alt="logo-light" width={140} height={30} className="logo logo-light"/>
                        </Link>

                        <h4>Cadastro</h4>
                        <p className="text-muted mb-4">Cria sua conta SocialBot agora mesmo</p>
                    </div>

                    <Card>
                        <Card.Body className="p-4">
                            <div className="p-3">
                                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Seu nome</Form.Label>
                                        <InputGroup className="bg-light-subtle mb-3 rounded-3">
                                            <InputGroup.Text id="name">
                                                <i className="ri-user-2-line"></i>
                                            </InputGroup.Text>

                                            <Form.Control
                                                size={"lg"}
                                                type="text"
                                                className="bg-light-subtle border-light"
                                                placeholder="Informe o seu nome"
                                                aria-label="Informe o seu nome"
                                                aria-describedby="name"
                                                aria-invalid={errors.name ? "true" : "false"}
                                                {...register("name", {required: true})}
                                                isInvalid={!!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name?.message}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>E-mail</Form.Label>
                                        <InputGroup className="bg-light-subtle rounded-3" size={"lg"}>
                                            <InputGroup.Text id="email">
                                                <i className="ri-mail-line"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                size={"lg"}
                                                type="email"
                                                className="bg-light-subtle border-light"
                                                placeholder="Informe seu e-mail"
                                                aria-label="Informe seu e-mail"
                                                aria-describedby="email"
                                                aria-invalid={errors.email ? "true" : "false"}
                                                {...register("email", {required: true})}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email?.message}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Senha</Form.Label>
                                        <InputGroup className="bg-light-subtle mb-3 rounded-3">
                                            <InputGroup.Text id="password">
                                                <i className="ri-lock-2-line"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                size={"lg"}
                                                type="password"
                                                className="bg-light-subtle border-light"
                                                placeholder="Informe sua senha"
                                                aria-label="Informe sua senha"
                                                aria-describedby="password"
                                                aria-invalid={errors.password ? "true" : "false"}
                                                {...register("password", {required: true})}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password?.message}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="d-grid mt-4">
                                        <Button
                                            variant="primary"
                                            className="waves-effect waves-light"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Cadastrar
                                        </Button>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <p className="text-muted mb-0">
                                            Ao se registrar, você aceita nossos <Link href={"/terms-of-use"} className="text-primary">Termos de Uso</Link>
                                        </p>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="mt-5 text-center">
                        <p>
                            <span className={"me-1"}>Já possui uma conta?</span>
                            <Link href={"/auth/signin"} className="fw-medium text-primary">
                                Entrar
                            </Link>
                        </p>
                        <p>© {new Date().getFullYear()} SocialUp</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
