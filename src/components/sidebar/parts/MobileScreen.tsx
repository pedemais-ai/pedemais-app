"use client";

import React from "react";
import UserDropdown from "@/components/sidebar/parts/UserDropdown";

export default function MobileScreen() {
    return (
        <>
            <li className="nav-item dropdown profile-user-dropdown d-inline-block d-lg-none">
                <UserDropdown/>
            </li>
        </>
    );
}