import React from "react";
import Cart from "@/components/cart/cart";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Carrinho de compras',
}
export default async function CartPage() {
    return (
        <>
            <Cart/>
        </>
    )
}