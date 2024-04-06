import React from 'react';
import SideBar from "@/components/bot/sidebar/SideBar";

export default async function RootLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <>
            <div className="layout-wrapper d-lg-flex">
                <SideBar/>
                {children}
            </div>
        </>
    );
}