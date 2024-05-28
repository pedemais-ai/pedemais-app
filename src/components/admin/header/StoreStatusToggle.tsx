"use client";

import React, {useEffect, useState} from "react";
import AppButton from "@/components/app/AppButton";
import {useMe} from "@/core/hooks/useMe";
import {Prisma} from "@/core/types/prisma";
import AppIcon from "@/components/app/AppIcon";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";

export default function StoreStatusToggle() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [me, setMe] = useState<Prisma.User | null>(null);
    const meState = useMe();

    const openStore = async function () {
        if (!me) {
            return false;
        }

        setIsLoading(true);

        const response = await fetch(`/api/store/${me.stores![0]?.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                is_open: true
            }),
        });

        setMe(await meState.get(true));
        setIsLoading(false);
    };

    const closeStore = async function () {
        if (!me) {
            return false;
        }

        setIsLoading(true);

        const response = await fetch(`/api/store/${me.stores![0]?.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                is_open: false
            }),
        });

        setMe(await meState.get(true));
        setIsLoading(false);
    };

    useEffect(() => {
        meState.get().then((p: Prisma.User | null) => setMe(p));
    }, []);

    if (!me) {
        return <></>
    }

    if (me.stores![0]?.is_open) {
        return (
            <>
                <div className="me-3">
                    <span className={"me-3"}>Loja aberta</span>
                    <AppButton
                        variant={"danger"}
                        size={"sm"}
                        onClick={closeStore}
                        isLoading={isLoading}
                    >
                        <AppIcon className={"me-1"} icon={faBan} size="1x"/>
                        Fechar
                    </AppButton>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="me-3">
                <span className={"me-3"}>Loja fechada</span>
                <AppButton
                    variant={"success"}
                    size={"sm"}
                    onClick={openStore}
                    isLoading={isLoading}
                >
                    <AppIcon className={"me-1"} icon={faCheck} size="1x"/>
                    Abrir
                </AppButton>
            </div>
        </>
    );
}
