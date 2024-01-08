import React from "react";
import {Prisma} from "@/types/prisma";
import {Message} from ".prisma/client";
import SentMessage from "@/components/chats/messages/sent-message";
import Image from "next/image";

type Props = {
    contact: Prisma.ContactWithMessages;
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

                <li className="right">
                    <div className="conversation-list">
                        <div className="chat-avatar">
                            <Image width={100} height={100} src="/assets/images/users/avatar-1.jpg" alt=""/>
                        </div>

                        <div className="user-chat-content">
                            <div className="ctext-wrap">
                                <div className="ctext-wrap-content">
                                    <p className="mb-0">
                                        Oi
                                    </p>
                                    <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">10:02</span></p>
                                </div>

                                <div className="dropdown align-self-start">
                                    <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ri-more-2-fill"></i>
                                    </a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Copy <i className="ri-file-copy-line float-end text-muted"></i></a>
                                        <a className="dropdown-item" href="#">Save <i className="ri-save-line float-end text-muted"></i></a>
                                        <a className="dropdown-item" href="#">Forward <i className="ri-chat-forward-line float-end text-muted"></i></a>
                                        <a className="dropdown-item" href="#">Delete <i className="ri-delete-bin-line float-end text-muted"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div className="conversation-list">
                        <div className="chat-avatar">
                            <Image width={100} height={100} src="/assets/images/users/avatar-4.jpg" alt=""/>
                        </div>

                        <div className="user-chat-content">
                            {contact.messages && contact.messages.map((message: Message) => (<>
                                <SentMessage message={message}/>
                            </>))}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </>);

}