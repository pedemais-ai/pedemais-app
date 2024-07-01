"use client";

import React, {useEffect, useState} from "react";
import Menu from "@/components/menu/Menu";

export default function MenuPage() {
    const [id, setId] = useState<number>();

    useEffect(() => {
        const storedId = localStorage.getItem("currentStore");

        setId(Number(storedId));
    }, []);

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Menu id={id}/>
        </>
    );
}
