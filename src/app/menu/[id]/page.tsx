import React from "react";
import Menu from "@/components/menu/menu";
import {fetchStore} from "@/core/hooks/useStore";

export async function generateMetadata({params}: { params: { id: number } }) {
    const store = await fetchStore(params.id);

    return {
        title: `Cardápio ${store?.name}`,
    }
}

export default async function MenuPage({params}: { params: { id: number } }) {
    return (
        <>
            <Menu id={params.id}/>
        </>
    )
}