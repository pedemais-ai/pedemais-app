import React, {Suspense} from 'react';
import ProductNavs from "@/components/admin/products/ProductNavs";
import {Container} from "react-bootstrap";

export default async function ProductLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <Suspense fallback={<>Loading...</>}>
            <Container className={"p-3"}>
                <ProductNavs/>
                {children}
            </Container>
        </Suspense>
    );
}