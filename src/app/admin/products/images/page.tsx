import React from "react";
import type {Metadata} from "next";
import ProductsImages from "@/components/admin/products/images/Images";

export const metadata: Metadata = {
    title: 'Imagem dos produtos',
}

export default function Admin() {
    return (
        <>
            <ProductsImages/>
        </>
    );
}
