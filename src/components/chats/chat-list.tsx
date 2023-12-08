import React, {SetStateAction} from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
    selectedChat?: number;
    setSelectedChat: React.Dispatch<SetStateAction<number | undefined>>;
};

export default function ChatList({selectedChat, setSelectedChat}: Props) {

    return (
        <>
            <div className="chat-leftsidebar me-lg-1 ms-lg-0">
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
                        <div>
                            <div className="px-4 pt-4">
                                <h4 className="mb-4">Chats</h4>
                                <div className="search-box chat-search-box">
                                    <div className="input-group mb-3 rounded-3">
                                        <span className="input-group-text text-muted bg-light pe-1 ps-3">
                                            <i className="ri-search-line search-icon font-size-18"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            placeholder="Search messages or users"
                                            aria-label="Search messages or users"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <h5 className="mb-3 px-3 font-size-16">Recent</h5>

                                <div className="chat-message-list px-2" data-simplebar="init">
                                    <div className="simplebar-content" style={{padding: '0px 8px'}}>
                                        <ul className="list-unstyled chat-list chat-user-list">
                                            {[1, 2, 3, 4, 5].map((id: number) => <>
                                                <li className={selectedChat === id ? "active" : ""}>
                                                    <Link href={"#"} onClick={() => setSelectedChat(id)}>
                                                        <div className="d-flex">
                                                            <div className="chat-user-img online align-self-center me-3 ms-0">
                                                                <Image
                                                                    src="/assets/images/users/avatar-2.jpg"
                                                                    className="rounded-circle avatar-xs"
                                                                    width={100}
                                                                    height={100}
                                                                    alt=""
                                                                />
                                                                <span className="user-status"></span>
                                                            </div>
                                                            <div className="flex-grow-1 overflow-hidden">
                                                                <h5 className="text-truncate font-size-15 mb-1">Patrick Hendricks</h5>
                                                                <p className="chat-user-message text-truncate mb-0">Hey! there Im available</p>
                                                            </div>
                                                            <div className="font-size-11">05 min</div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}