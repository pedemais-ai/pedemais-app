import React, {Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './icons.css';
import './globals.css';
import ColorSchema from '@/components/ColorSchema';
import {config} from '@fortawesome/fontawesome-svg-core';
import {Metadata} from "next";
import AuthProvider from "@/components/auth/context/AuthProvider";

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

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <ColorSchema/>
            <Suspense fallback={<>Loading...</>}>
                {children}
            </Suspense>
        </AuthProvider>
        </body>
        </html>
    );
}
