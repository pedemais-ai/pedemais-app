import React from "react";
import type {Metadata} from "next";
import ConfigStoreForm from "@/components/admin/config/store/ConfigStoreForm";

export const metadata: Metadata = {
    title: 'Lista de produtos',
}

export default function StoreConfig() {
    return (
        <>
            <ConfigStoreForm/>
        </>
    );
}
