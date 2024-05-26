import React, {Suspense} from 'react';
import {Container} from "react-bootstrap";
import ConfigNavs from "@/components/admin/config/ConfigNavs";

export default async function ProductLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <Suspense fallback={<>Loading...</>}>
            <Container className={"p-3"}>
                <ConfigNavs/>
                {children}
            </Container>
        </Suspense>
    );
}