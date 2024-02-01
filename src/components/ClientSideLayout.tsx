"use client";

import React, {useEffect} from "react";

export default function ClientSideLayout() {
    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('data-bs-theme');

        if (storedTheme) {
            document.body.setAttribute('data-bs-theme', storedTheme);
        } else {
            document.body.setAttribute('data-bs-theme', prefersDarkMode ? 'dark' : 'light');
        }
    }, []);

    return <></>;
}
