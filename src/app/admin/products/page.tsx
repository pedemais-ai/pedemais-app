import React from "react";
import Products from "@/components/admin/products/Products";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Lista de produtos',
}

export default function Admin() {


    return (
        <>
            <Products/>
        </>
    );
}
