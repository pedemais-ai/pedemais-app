import React from "react";
import Menu from "@/components/menu/menu";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Cardápio',
};

export default async function MenuPage({params}: { params: { id: number } }) {
    return (
        <>
            <Menu id={params.id}/>
        </>
    )
}