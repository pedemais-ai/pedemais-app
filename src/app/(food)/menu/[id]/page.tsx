"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import Loading from "@/app/loading";

export default function MenuPage({params}: { params: { id: number } }) {

    const router = useRouter();

    useEffect(() => {
        localStorage.setItem("currentStore", String(params.id));

        router.push(`/menu`);
    }, [params.id, router]);


    return <Loading/>
}