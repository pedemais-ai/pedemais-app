"use client";

import {Product} from ".prisma/client";
import React, {useEffect, useState} from "react";
import {Badge, Button, Container, Form, InputGroup, Navbar, Row} from "react-bootstrap";
import {useProduct} from "@/core/hooks/menu/useProduct";
import Image from "next/image";
import slugify from "slugify";
import {useRouter} from "next/navigation";

export default function Product({id}: { id: number }) {

    const router = useRouter();
    const productState = useProduct();
    const [product, setProduct] = useState<Product | null>();

    const handleBackButtonClick = () => {
        router.back();
    };

    useEffect(() => {
        productState.getProduct(id).then((p: Product | null | undefined) => setProduct(p))
    }, [id]);

    if (!product) {
        return (<>Loading...</>);
    }

    return (<>
        <Container>
            <Navbar className="bg-body-tertiary" fixed={"top"}>
                <Container>
                    <Navbar.Brand>
                        Bisgo Burger
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
                            src="https://via.placeholder.com/100" alt={slugify(product.name).toLowerCase()}
                            className="img-thumbnail mr-3"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex-grow-1 ms-3">
                        <h4 className="mb-1">{product.name}</h4>
                        <p className="mb-1">{product.description}</p>
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
                            <Button variant="outline-secondary" id="button-addon1">
                                -
                            </Button>
                            <Form.Control
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                value={1}
                            />
                            <Button variant="outline-secondary" id="button-addon1">
                                +
                            </Button>
                        </InputGroup>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="primary" id="button-addon1">
                            Adicionar
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    </>)
};
