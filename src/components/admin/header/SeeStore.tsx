"use client";

import React from "react";
import Link from "next/link";


export default function SeeStore() {

    const id = 1;

    return (
        <>
            <div className="text-right me-3">
                <Link href={`/menu/${id}`} target={"_blank"} className={"text-white"}>Abrir cardápio</Link>
            </div>
        </>
    );
}
