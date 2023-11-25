"use client";

import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";

export default function UserDropdown() {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle
                    as={Image}
                    width={36}
                    height={36}
                    src={"/assets/images/users/avatar-1.jpg"}
                    className="profile-user rounded-circle "
                    alt=""
                    role="button"
                >
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#">Profile <i className="ri-profile-line float-end text-muted"></i></Dropdown.Item>
                    <Dropdown.Item href="#">Setting <i className="ri-settings-3-line float-end text-muted"></i></Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item href="/api/auth/signout">Sign out <i className="ri-logout-circle-r-line float-end text-muted"></i></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}