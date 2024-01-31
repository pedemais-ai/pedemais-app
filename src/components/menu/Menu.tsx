"use client";

import {Store} from ".prisma/client";
import React, {Suspense, useEffect, useState} from "react";
import MenuHeader from "@/components/menu/Header";
import {Container} from "react-bootstrap";
import {useStore} from "@/core/hooks/useStore";
import {Prisma} from "@/core/types/prisma";
import MenuItemList from "@/components/menu/ItemList";
import Loading from "@/components/Loading";

import { faClipboardList, faShoppingBag, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import AppIcon from "@/components/app/AppIcon";

const BottomMenu = () => {
    return (
        <nav className="navbar fixed-bottom navbar-light bg-light p-0">
            <Link href="/cart" className="w-100">
                <div className="bg-primary p-2 text-white d-flex justify-content-between align-items-center">
                    <div className="col-4 text-center position-relative">
                        <AppIcon icon={faShoppingBag} size="lg" className="mr-2" />
                        <span className="ms-1 position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            <small>5</small>
                        </span>
                    </div>
                    <div className="col-4 text-center d-flex flex-column justify-content-between">
                        <span style={{ lineHeight: '1.2' }}>Sacola vazia</span>
                        <span style={{ lineHeight: '1.2' }}><small>Adicione itens</small></span>
                    </div>
                    <div className="col-4 text-center ml-auto">R$38,90</div>
                </div>
            </Link>

            <div className="container text-center mb-1 mx-4">
                <Link href="#" className="navbar-brand">
                    <AppIcon icon={faUtensils} size="sm" />
                    <div style={{ lineHeight: 1, fontSize: 9 }}>Cardápio</div>
                </Link>
                <Link href="#" className="navbar-brand text-secondary">
                    <AppIcon icon={faClipboardList} size="sm" />
                    <div style={{ lineHeight: 1, fontSize: 9 }}>Pedidos</div>
                </Link>
                <Link href="#" className="navbar-brand text-secondary">
                    <AppIcon icon={faUser} size="sm" />
                    <div style={{ lineHeight: 1, fontSize: 9 }}>Perfil</div>
                </Link>
            </div>
        </nav>
    );
};

export default function Menu({id}: { id: number }) {

    const storeState = useStore();
    const [store, setStore] = useState<Store | null>()

    useEffect(() => {
        storeState.find(id).then((p: Store | null | undefined) => setStore(p))
    }, [id, storeState]);

    return (<>
        <Suspense fallback={<Loading/>}>
            <Container>
                <MenuHeader store={store as Prisma.Store}/>
                <MenuItemList store={store as Prisma.Store}/>
                <BottomMenu/>
                <div className="m-5 h-100">&nbsp;</div> {/* spacer for bottom menu */}
            </Container>
        </Suspense>
    </>)
};
