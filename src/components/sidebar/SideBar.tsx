import React from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/sidebar/parts/Menu";

export default function SideBar() {
    return (
        <>
            <div className="side-menu flex-lg-column me-lg-1 ms-lg-0">
                <div className="navbar-brand-box">
                    <Link
                        href="/dashboard"
                        className="logo logo-dark"
                    >
                        <span className="logo-sm">
                            <Image
                                width={30}
                                height={30}
                                src={"/assets/images/logo.svg"}
                                alt=""
                            />
                        </span>
                    </Link>

                    <Link
                        href="/dashboard"
                        className="logo logo-light"
                    >
                            <span className="logo-sm">
                                <Image
                                    width={100}
                                    height={30}
                                    src={"/assets/images/logo.svg"}
                                    alt=""
                                />
                            </span>
                    </Link>
                </div>

                <Menu/>
            </div>
        </>
    );
}