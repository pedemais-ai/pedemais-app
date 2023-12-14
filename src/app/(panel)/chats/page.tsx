import {Metadata} from "next";
import React from "react";
import Chat from "@/components/chats/chat";

export const metadata: Metadata = {
    title: 'Chats',
};

export default async function Chats() {

    return (
        <>
            <Chat/>
        </>
    )
}
