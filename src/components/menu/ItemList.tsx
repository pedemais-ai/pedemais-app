"use client";

import React, {Suspense} from "react";
import Image from "next/image";
import {Badge, ListGroup} from "react-bootstrap";
import slugify from 'slugify';
import {Prisma} from "@/core/types/prisma";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function MenuItemList({store}: { store: Prisma.Store }) {

    return (
        <Suspense fallback={<Loading/>}>
            {store?.categories?.map((category: Prisma.Category) => <>
                    <div key={category.id}>
                        <h2 id={`${slugify(category.name).toLowerCase()}`}>{category.name}</h2>

                        <ListGroup className="mb-3">
                            {category.products?.map((product: Prisma.Product) => <>
                                <ListGroup.Item
                                    key={product.id}
                                    as={Link}
                                    href={`/menu/product/${product.id}`}
                                >
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
                                </ListGroup.Item>
                            </>)}
                        </ListGroup>
                    </div>
                </>
            )}
        </Suspense>
    )
};
