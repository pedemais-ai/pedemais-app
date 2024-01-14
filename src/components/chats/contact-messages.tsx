import React, {useEffect, useState} from "react";
import Conversation from "@/components/chats/messages/conversation";
import MessageInput from "@/components/chats/messages/input";
import TopBar from "@/components/chats/messages/topbar";
import Image from "next/image";
import {Prisma} from "@/core/types/prisma";

type Props = {
    selectedContact?: Prisma.Contact;
};

async function fetchContact(id: number): Promise<Prisma.Contact> {
    const response = await fetch(`/api/contacts/${id}`);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    return await response.json();
}

export default function ContactMessages({selectedContact}: Props) {

    const [contact, setContact] = useState<Prisma.Contact>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!selectedContact) {
            return;
        }

        setIsLoading(true);

        fetchContact(selectedContact.id)
            .then(setContact)
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, [selectedContact]);

    useEffect(() => {
        setContact(undefined);
    }, [selectedContact]);

    if (!selectedContact) {
        return (<>Selecione um contato</>);
    }

    if (isLoading) {
        return <>Carregando histórico de mensagens</>
    }

    if (!contact) {
        return <>Contato não carregado</>
    }

    return (
        <>
            <div className="user-chat w-100 overflow-hidden p-3">
                <div className="d-lg-flex">

                    <div className="w-100 overflow-hidden position-relative">
                        <TopBar contact={contact}/>
                        <Conversation contact={contact}/>
                        <MessageInput/>
                    </div>


                    <div className="user-profile-sidebar">
                        <div className="px-3 px-lg-4 pt-3 pt-lg-4">
                            <div className="user-chat-nav text-end">
                                <button type="button" className="btn nav-btn" id="user-profile-hide">
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                        </div>

                        <div className="text-center p-4 border-bottom">
                            <div className="mb-4">
                                <Image width={100} height={100} src="/assets/images/users/avatar-4.jpg" className="rounded-circle avatar-lg img-thumbnail" alt=""/>
                            </div>

                            <h5 className="font-size-16 mb-1 text-truncate">Doris Brown</h5>
                            <p className="text-muted text-truncate mb-1"><i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0"></i> Active</p>
                        </div>


                        <div className="p-4 user-profile-desc">
                            <div className="text-muted">
                                <p className="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                            </div>

                            <div className="accordion" id="myprofile">

                                <div className="accordion-item card border mb-2">
                                    <div className="accordion-header" id="about3">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#aboutprofile" aria-expanded="true" aria-controls="aboutprofile">
                                            <h5 className="font-size-14 m-0">
                                                <i className="ri-user-2-line me-2 ms-0 align-middle d-inline-block"></i> About
                                            </h5>
                                        </button>
                                    </div>
                                    <div id="aboutprofile" className="accordion-collapse collapse show" aria-labelledby="about3" data-bs-parent="#myprofile">
                                        <div className="accordion-body">
                                            <div>
                                                <p className="text-muted mb-1">Name</p>
                                                <h5 className="font-size-14">Doris Brown</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">Email</p>
                                                <h5 className="font-size-14">adc@123.com</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">Time</p>
                                                <h5 className="font-size-14">11:40 AM</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">Location</p>
                                                <h5 className="font-size-14 mb-0">California, USA</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item card border">
                                    <div className="accordion-header" id="attachfile3">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#attachprofile" aria-expanded="false" aria-controls="attachprofile">
                                            <h5 className="font-size-14 m-0">
                                                <i className="ri-attachment-line me-2 ms-0 align-middle d-inline-block"></i> Attached Files
                                            </h5>
                                        </button>
                                    </div>
                                    <div id="attachprofile" className="accordion-collapse collapse" aria-labelledby="attachfile3" data-bs-parent="#myprofile">
                                        <div className="accordion-body">
                                            <div className="card p-2 border mb-2">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm me-3 ms-0">
                                                        <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                            <i className="ri-file-text-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="text-start">
                                                            <h5 className="font-size-14 mb-1">admin_v1.0.zip</h5>
                                                            <p className="text-muted font-size-13 mb-0">12.5 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ms-4 me-0">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="#" className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card p-2 border mb-2">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm me-3 ms-0">
                                                        <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                            <i className="ri-image-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="text-start">
                                                            <h5 className="font-size-14 mb-1">Image-1.jpg</h5>
                                                            <p className="text-muted font-size-13 mb-0">4.2 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ms-4 me-0">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="#" className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card p-2 border mb-2">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm me-3 ms-0">
                                                        <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                            <i className="ri-image-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="text-start">
                                                            <h5 className="font-size-14 mb-1">Image-2.jpg</h5>
                                                            <p className="text-muted font-size-13 mb-0">3.1 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ms-4 me-0">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="#" className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card p-2 border mb-2">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm me-3 ms-0">
                                                        <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                                                            <i className="ri-file-text-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="text-start">
                                                            <h5 className="font-size-14 mb-1">Landing-A.zip</h5>
                                                            <p className="text-muted font-size-13 mb-0">6.7 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ms-4 me-0">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="#" className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <a className="dropdown-item" href="#">Action</a>
                                                                    <a className="dropdown-item" href="#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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