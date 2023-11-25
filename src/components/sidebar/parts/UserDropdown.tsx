"use client";

import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";

export default function UserDropdown() {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle>
                    <Image width={100} height={100} src={"/assets/images/users/avatar-1.jpg"} alt="" className="profile-user rounded-circle"/>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#">Profile <i className="ri-profile-line float-end text-muted"></i></Dropdown.Item>
                    <Dropdown.Item href="#">Setting <i className="ri-settings-3-line float-end text-muted"></i></Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item href="#">Log out <i className="ri-logout-circle-r-line float-end text-muted"></i></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}