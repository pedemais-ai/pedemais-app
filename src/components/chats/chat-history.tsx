import React from "react";

type Props = {
    selectedChat?: number;
};

export default function ChatHistory({selectedChat}: Props) {

    if (!selectedChat) {
        return (<>Selecione um chat</>);
    }

    return (
        <>
            <div className="user-chat w-100 overflow-hidden p-3">
                <h1>ChatID: {selectedChat}</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Adipisci architecto aspernatur cumque cupiditate nostrum odit saepe.
                    Accusantium architecto commodi cumque et eum ex iste iusto, magni, minus quia rem ullam?
                </p>
            </div>
        </>
    );
}