import React from "react";
import type {Metadata} from "next";
import ProductList from "@/components/admin/products/list/List";

export const metadata: Metadata = {
    title: 'Lista de produtos',
}

export default function Admin() {
    return (
        <>
            <ProductList/>
        </>
    );
}
