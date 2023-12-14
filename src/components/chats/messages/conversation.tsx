import React from "react";
import {Contact, Message} from ".prisma/client";
import SentMessage from "@/components/chats/messages/sent-message";

type Props = {
    contact: Contact;
};

export default function Conversation({contact}: Props) {


    return (<>
        <div className="chat-conversation p-3 p-lg-4">
            <ul className="list-unstyled mb-0">

                <li>
                    <div className="chat-day-title">
                        <span className="title">Today</span>
                    </div>
                </li>

                <li>
                    <div className="conversation-list">
                        <div className="chat-avatar">
                            <img src="/assets/images/users/avatar-4.jpg" alt=""/>
                        </div>

                        <div className="user-chat-content">
                            {contact.messages.map((message: Message) => (<>
                                <SentMessage message={message}/>
                            </>))}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </>);

}