import React, {Suspense} from 'react';
import type {Metadata} from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/components/admin/header";
import Breadcrumbs from "@/components/admin/breadcrumb";
import {Container} from "react-bootstrap";

export const metadata: Metadata = {
    title: {
        template: '%s | BisgoBot - Admin',
        default: 'Home'
    },
    icons: {
        icon: '/assets/images/favicon.ico'
    },
}

export default async function AdminLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <Suspense fallback={<>Loading...</>}>
            <main>
                <Header/>
                <Container>
                    <Breadcrumbs/>
                    {children}
                </Container>
            </main>
        </Suspense>
    );
}