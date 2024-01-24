import React, {Suspense} from 'react';
import type {Metadata} from 'next'
import Header from "@/components/admin/Header";
import Breadcrumbs from "@/components/admin/Breadcrumb";
import {Container} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

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
                <Container fluid>
                    <Breadcrumbs/>
                    {children}
                </Container>
            </main>
        </Suspense>
    );
}