import React from "react";
import {Message} from ".prisma/client";

type Props = {
    message: Message;
};

export default function SentMessage({message}: Props) {


    return (<>
        <div className="ctext-wrap">
            <div className="ctext-wrap-content">
                <p className="mb-0">
                    {message.message}
                </p>
                <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">10:05</span></p>
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
    </>);

}