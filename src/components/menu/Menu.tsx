"use client";

import {Store} from ".prisma/client";
import React, {Suspense, useEffect, useState} from "react";
import MenuHeader from "@/components/menu/Header";
import {Container} from "react-bootstrap";
import {useStore} from "@/core/hooks/useStore";
import {Prisma} from "@/core/types/prisma";
import MenuItemList from "@/components/menu/ItemList";
import Loading from "@/components/Loading";
import {faClipboardList, faShoppingBag, faUser, faUtensils} from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import AppIcon from "@/components/app/AppIcon";
import {useCart} from "@/core/hooks/useCart";
import {formatCurrency} from "@/core/functions";

const BottomMenu = () => {
    const cartState = useCart();

    const [cart, setCart] = useState<Prisma.Cart | null>();

    useEffect(() => {
        cartState.get().then((p: Prisma.Cart | null | undefined) => setCart(p))
    }, [cartState]);

    return (
        <nav className="fixed-bottom bg-light">
            <div className="w-100 bg-primary py-0">
                <Link href={"/cart"} className="link-offset-2 link-underline link-underline-opacity-0">
                    <div className="container p-2 text-white d-flex align-items-center">
                        <div className="position-relative text-center flex-grow-1">
                            <AppIcon icon={faShoppingBag} size="lg" className="mr-2"/>
                            <span className="ms-1 position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                                <small>{cart?.items?.length}</small>
                            </span>
                        </div>
                        <div className="flex-grow-1 text-left">
                            <small>
                                <div className="fw-light mb-0">Total sem entrega</div>
                                <div className="fw-bold">{formatCurrency(cart?.totalPrice || 0)}</div>
                            </small>
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn btn-outline-light">Ver sacola</button>
                        </div>
                    </div>

                </Link>
            </div>
            <div className="container d-flex justify-content-center py-2">
                <div className="flex-fill d-flex flex-column align-items-center">
                    <div className="text-center">
                        <AppIcon icon={faUtensils} size="lg"/>
                        <span style={{lineHeight: 1, fontSize: 9}} className="link-secondary d-block mt-1">Cardápio</span>
                    </div>
                </div>
                <div className="flex-fill d-flex flex-column align-items-center mx-5">
                    <div className="link-secondary text-center">
                        <AppIcon icon={faClipboardList} size="lg"/>
                        <span style={{lineHeight: 1, fontSize: 9}} className="link-secondary d-block mt-1">Pedidos</span>
                    </div>
                </div>
                <div className="flex-fill d-flex flex-column align-items-center">
                    <div className="link-secondary text-center">
                        <AppIcon icon={faUser} size="lg"/>
                        <span style={{lineHeight: 1, fontSize: 9}} className="link-secondary d-block mt-1">Perfil</span>
                    </div>
                </div>
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
                <div className="m-5 h-100">&nbsp;</div>
                {/* spacer for bottom menu */}
            </Container>
        </Suspense>
    </>)
};
