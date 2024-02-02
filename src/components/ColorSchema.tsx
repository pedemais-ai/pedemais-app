"use client";

import React, {useEffect} from "react";
import {useThemeStore} from "@/core/hooks/useThemeStore";

export default function ColorSchema() {

    const {theme, toggleTheme} = useThemeStore();

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
    }, [theme]);

    return <></>;
}
