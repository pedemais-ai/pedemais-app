"use client";

import {Store} from ".prisma/client";
import React, {useEffect, useState} from "react";
import MenuHeader from "@/components/menu/Header";
import {Container, Row} from "react-bootstrap";
import {useStore} from "@/core/hooks/useStore";
import {Prisma} from "@/core/types/prisma";
import MenuItemList from "@/components/menu/ItemList";

export default function Menu({id}: { id: number }) {

    const storeState = useStore();
    const [store, setStore] = useState<Store | null>()

    useEffect(() => {
        storeState.find(id).then((p: Store | null | undefined) => setStore(p))
    }, [id, storeState]);

    return (<>
        <Container className={"mt-3"}>
            <Row>
                <MenuHeader store={store as Prisma.Store}/>
                <MenuItemList store={store as Prisma.Store}/>
            </Row>
        </Container>
    </>)
};
