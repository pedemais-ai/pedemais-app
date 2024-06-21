import React from "react";
import type {Metadata} from "next";
import Order from "@/components/order/Order";

export const metadata: Metadata = {
    title: 'Pedido concluido',
}

export default async function OrderPage({params}: { params: { id: number } }) {
    return (
        <>
            <Order id={params.id}/>
        </>
    )
}