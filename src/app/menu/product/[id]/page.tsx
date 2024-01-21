import React from "react";
import Product from "@/components/menu/product";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Produto',
};

export default async function MenuPage({params}: { params: { id: number } }) {
    return (
        <>
            <Product id={params.id}/>
        </>
    )
}