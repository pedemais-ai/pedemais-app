"use client";

import React, {Suspense, useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {Prisma} from "@/core/types/prisma";
import Loading from "@/components/Loading";
import {useOrder} from "@/core/hooks/useOrder";

export default function Order({id}: { id: number }) {

    const orderState = useOrder();

    const [order, setOrder] = useState<Prisma.Order | null>();
    useEffect(() => {
        orderState.find(id).then((p: Prisma.Order | null) => setOrder(p))
    }, [id, orderState]);

    return (<>
        <Suspense fallback={<Loading/>}>
            <Container className="col-md-6">
                <code>
                    {JSON.stringify(order)}
                </code>
            </Container>
        </Suspense>
    </>)
};
