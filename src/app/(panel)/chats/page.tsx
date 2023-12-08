import {Metadata} from "next";
import React from "react";
import ChatComponent from "@/components/chats/chat-component";

export const metadata: Metadata = {
    title: 'Chats',
};

export default async function Chats() {

    return (
        <>
            <ChatComponent/>
        </>
    )
}
