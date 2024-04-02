import React from "react";
import type {Metadata} from "next";
import Checkout from "@/components/cart/Checkout";

export const metadata: Metadata = {
    title: 'Finalizar pedido',
}

export default async function CheckoutPage() {
    return (
        <>
            <Checkout/>
        </>
    )
}