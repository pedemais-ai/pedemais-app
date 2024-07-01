import React from "react";
import type {Metadata} from "next";
import OrderDelivery from "@/components/admin/order/delivery/Delivery";

export const metadata: Metadata = {
    title: 'Pedidos via delivery',
}

export default async function DeliveryPage() {
    return (
        <>
            <OrderDelivery/>
        </>
    )
}