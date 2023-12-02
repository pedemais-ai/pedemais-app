"use client";

import Link from "next/link";
import Image from "next/image";
import {Button, Card, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

export default function RegisterForm() {

    const year = 2023;

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
                                <Form action="/register">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup className="bg-light-subtle rounded-3" size={"lg"}>
                                            <InputGroup.Text id="basic-addon1">
                                                <i className="ri-mail-line"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                size={"lg"}
                                                type="email"
                                                className="bg-light-subtle border-light"
                                                placeholder="Enter Email"
                                                aria-label="Enter Email"
                                                aria-describedby="basic-addon5"
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup className="bg-light-subtle mb-3 rounded-3">
                                            <InputGroup.Text id="basic-addon6">
                                                <i className="ri-user-2-line"></i>
                                            </InputGroup.Text>

                                            <Form.Control
                                                size={"lg"}
                                                type="text"
                                                className="bg-light-subtle border-light"
                                                placeholder="Enter Username"
                                                aria-label="Enter Username"
                                                aria-describedby="basic-addon6"
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup className="bg-light-subtle mb-3 rounded-3">
                                            <InputGroup.Text id="basic-addon7">
                                                <i className="ri-lock-2-line"></i>
                                            </InputGroup.Text>
                                            <Form.Control
                                                size={"lg"}
                                                type="password"
                                                className="bg-light-subtle border-light"
                                                placeholder="Enter Password"
                                                aria-label="Enter Password"
                                                aria-describedby="basic-addon7"
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <div className="d-grid">
                                        <Button variant="primary" className="waves-effect waves-light" type="submit">
                                            Entrar
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
                        <p>© {year} SocialUp</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
