"use client";

import React, {Suspense} from "react";
import Image from "next/image";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import slugify from 'slugify';
import {Prisma} from "@/core/types/prisma";
import Link from "next/link";
import Loading from "@/components/Loading";
import {formatCurrency} from "@/core/functions";

export default function MenuItemList({store}: {
    store: Prisma.Store
}) {

    return (
        <Suspense fallback={<Loading/>}>
            {store?.categories?.map((category: Prisma.Category) => <>
                    <div key={category.id}>
                        <Container className="mt-2 mb-2">
                            <Row>
                                <h2 id={`${slugify(category.name).toLowerCase()}`}>{category.name}</h2>
                                <Col lg={6} xs={12}>
                                    <ListGroup className="mb-3">
                                        {category.products?.slice(0, Math.ceil(category.products.length / 2)).map((product: Prisma.Product) => (
                                            <ListGroup.Item
                                                key={product.id}
                                                as={Link}
                                                href={`/menu/product/${product.id}`}
                                            >
                                                <div className="d-flex">
                                                    <div className="flex-grow-1 me-2">
                                                        <p className="mb-0 fs-6 fw-bold">{product?.name}</p>
                                                        <p className="mb-1"><small>{product?.description}</small></p>
                                                        <p className="text-primary mb-0 fs-6">{formatCurrency(product?.prices?.[0].price || 0)}</p>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <Image
                                                            src={product?.images?.[0].path || ''}
                                                            alt={slugify(product.name).toLowerCase()}
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                                <Col lg={6} xs={12}>
                                    <ListGroup className="mb-3">
                                        {category.products?.slice(Math.ceil(category.products.length / 2)).map((product: Prisma.Product) => (
                                            <ListGroup.Item
                                                key={product.id}
                                                as={Link}
                                                href={`/menu/product/${product.id}`}
                                            >
                                                <div className="d-flex">
                                                    <div className="flex-grow-1 me-2">
                                                        <p className="mb-0 fs-6 fw-bold">{product?.name}</p>
                                                        <p className="mb-1"><small>{product?.description}</small></p>
                                                        <p className="text-primary mb-0 fs-6">{formatCurrency(product?.prices?.[0].price || 0)}</p>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <Image
                                                            src={product?.images?.[0].path || ''}
                                                            alt={slugify(product.name).toLowerCase()}
                                                            className="mr-3"
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>

                    </div>
                </>
            )}
        </Suspense>
    )
};
