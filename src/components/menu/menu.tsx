"use client";

import {Store} from ".prisma/client";
import React, {useEffect, useState} from "react";
import MenuFoodList from "@/components/menu/food-list";
import MenuHeader from "@/components/menu/header";
import {Container, Row} from "react-bootstrap";
import {useStore} from "@/core/hooks/menu/useStore";
import {StoreType} from "@/core/types";

export default function Menu({id}: { id: number }) {

    const storeState = useStore();
    const [store, setStore] = useState<Store | null>()

    useEffect(() => {
        storeState.getStores(id).then((p: Store | null | undefined) => setStore(p))
    }, [id]);

    return (<>
        <Container className={"mt-3"}>
            <Row>
                <MenuHeader store={store as StoreType}/>
                <MenuFoodList store={store as StoreType}/>
            </Row>
        </Container>
    </>)
};
