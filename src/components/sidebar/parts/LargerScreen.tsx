"use client";

import React, {useState} from "react";
import NavItem from "@/components/sidebar/parts/NavItem";
import UserDropdown from "@/components/sidebar/parts/UserDropdown";

export default function LargerScreen() {

    const [storedTheme, setStoredTheme] = useState(localStorage.getItem('data-bs-theme'));

    const toggleTheme = () => {
        const newTheme = storedTheme === 'dark' ? 'light' : 'dark';

        // Set the data-bs-theme attribute dynamically on the client side
        document.body.setAttribute('data-bs-theme', newTheme);

        // Save the new theme to localStorage
        localStorage.setItem('data-bs-theme', newTheme);
        setStoredTheme(newTheme);
    };

    return (
        <>
            <div className="flex-lg-column d-none d-lg-block">
                <ul className="nav side-menu-nav justify-content-center">

                    <NavItem
                        href={"#"}
                        title={storedTheme === 'dark' ? 'Enable Light mode' : 'Enable Dark mode'}
                        icon={"ri-sun-line theme-mode-icon"}
                        iconPlacement={"right"}
                        onClick={toggleTheme}
                    />

                    <li className="nav-item btn-group dropup profile-user-dropdown">
                        <UserDropdown/>
                    </li>
                </ul>
            </div>
        </>
    );
}