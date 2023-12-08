import React from 'react';
import type {Metadata} from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import './icons.css'
import ClientSideLayout from "@/components/ClientSideLayout";

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
        <ClientSideLayout/>
        {children}
        </body>
        </html>
    );
}