import React from "react";
import Product from "@/components/menu/Product";
import {fetchProduct} from "@/core/hooks/useProduct";

export async function generateMetadata({params}: { params: { id: number } }) {
    const product = await fetchProduct(params.id);

    return {
        title: product?.name,
    }
}

export default async function MenuPage({params}: { params: { id: number } }) {
    return (
        <>
            <Product id={params.id}/>
        </>
    )
}