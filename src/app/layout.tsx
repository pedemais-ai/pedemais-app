import React, {Suspense} from 'react';
import type {Metadata} from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './icons.css'
import './globals.css'
import ClientSideLayout from "@/components/ClientSideLayout";
import {config} from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

export const metadata: Metadata = {
    title: {
        template: '%s | BisgoBot',
        default: 'Home'
    },
    icons: {
        icon: '/assets/images/favicon.ico'
    },
    description: "Multi-agent ChatBot for WhatsApp",
    keywords: 'whatsapp, chat bot, support bot',
    robots: 'index, follow',
}

export default async function RootLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <html lang="en">
        <body>
        <Suspense fallback={<>Loading...</>}>
            <ClientSideLayout/>
            {children}
        </Suspense>
        </body>
        </html>
    );
}