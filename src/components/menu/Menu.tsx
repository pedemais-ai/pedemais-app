"use client";

import {Store} from ".prisma/client";
import React, {Suspense, useEffect, useState} from "react";
import MenuHeader from "@/components/menu/Header";
import {Container} from "react-bootstrap";
import {useStore} from "@/core/hooks/useStore";
import {Prisma} from "@/core/types/prisma";
import MenuItemList from "@/components/menu/ItemList";
import Loading from "@/components/Loading";

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
            </Container>
        </Suspense>
    </>)
};
