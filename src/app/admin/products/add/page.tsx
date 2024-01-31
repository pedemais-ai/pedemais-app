import React from "react";
import type {Metadata} from "next";
import AddProduct from "@/components/admin/products/add/AddProduct";

export const metadata: Metadata = {
    title: 'Adicionar produto',
}

export default function AddProductPage() {
    return (
        <>
            <AddProduct/>
        </>
    );
}
