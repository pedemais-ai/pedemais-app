"use client";

import React, {useState} from "react";
import ChatList from "@/components/chats/chat-list";
import ChatHistory from "@/components/chats/chat-history";

export default function ChatComponent() {

    const [selectedChat, setSelectedChat] = useState<number>();

    return (
        <>
            <ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
            <ChatHistory selectedChat={selectedChat}/>
        </>
    );
}