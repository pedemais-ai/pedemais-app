import React from 'react';
import {Inter} from 'next/font/google'
import type {Metadata} from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import './icons.css'
import ClientSideLayout from "@/components/ClientSideLayout";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: {
        template: '%s | Multi-agent chatbot for WhatsApp',
        default: 'BisgoBot'
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
        <body className={inter.className}>
        <ClientSideLayout/>
        {children}
        </body>
        </html>
    );
}