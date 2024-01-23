import React from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/bot/sidebar/parts/Menu";
import styles from './sidebar.module.css';

export default function SideBar() {
    return (
        <>
            <div className={styles.sideMenu + ' flex-lg-column me-lg-1 ms-lg-0'}>
                <div className={styles.brandBox}>
                    <Link
                        href={"/bot"}
                        className={styles.logo + ' ' + styles.logoDark}
                    >
                        <Image
                            width={30}
                            height={30}
                            src={"/assets/images/logo.svg"}
                            alt="logo-dark"
                        />
                    </Link>

                    <Link
                        href={"/bot"}
                        className={styles.logo + ' ' + styles.logoLight}
                    >
                        <Image
                            width={100}
                            height={30}
                            src={"/assets/images/logo.svg"}
                            alt="logo-light"
                        />
                    </Link>
                </div>

                <Menu/>
            </div>
        </>
    );
}