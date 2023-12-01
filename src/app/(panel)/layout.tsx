import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css'
import '../icons.css'
import SideBar from "@/components/sidebar/SideBar";

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