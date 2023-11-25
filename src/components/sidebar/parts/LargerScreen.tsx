"use client";

import React from "react";
import NavItem from "@/components/sidebar/parts/NavItem";
import UserDropdown from "@/components/sidebar/parts/UserDropdown";

export default function LargerScreen() {
    return (
        <>
            <div className="flex-lg-column d-none d-lg-block">
                <ul className="nav side-menu-nav justify-content-center">

                    <NavItem
                        href={"#"}
                        title={"Dark / Light Mode"}
                        icon={"ri-sun-line theme-mode-icon"}
                        iconPlacement={"right"}
                    />

                    <li className="nav-item btn-group dropup profile-user-dropdown">
                        <UserDropdown/>
                    </li>
                </ul>
            </div>
        </>
    );
}