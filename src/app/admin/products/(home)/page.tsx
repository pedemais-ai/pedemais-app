import React from "react";
import Products from "@/components/admin/products/category/Products";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Categorias de produtos',
}

export default function Admin() {
    return (
        <>
            <Products/>
        </>
    );
}
