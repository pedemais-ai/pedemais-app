import React from 'react';
import AuthProvider from "@/components/session/context/AuthProvider";

export default async function RootLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <>
            <AuthProvider>
                {children}
            </AuthProvider>
        </>
    );
}