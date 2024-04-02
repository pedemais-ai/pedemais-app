import React from "react";
import type {Metadata} from "next";
import Cart from "@/components/cart/Cart";

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