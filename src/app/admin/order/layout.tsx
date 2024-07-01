import React, {Suspense} from 'react';
import {Container} from "react-bootstrap";
import OrderNavs from "@/components/admin/order/OrderNavs";

export default async function StoreConfigLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <Suspense fallback={<>Loading...</>}>
            <Container className={"p-3"}>
                <OrderNavs/>
                {children}
            </Container>
        </Suspense>
    );
}