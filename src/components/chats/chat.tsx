"use client";

import React, {useEffect, useState} from "react";
import ContactList from "@/components/chats/contact-list";
import ContactMessages from "@/components/chats/contact-messages";
import {Client, Contact, User} from ".prisma/client";
import Image from "next/image";
import {Col, Container, Row} from "react-bootstrap";

export default function Chat() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User & { clients: Client[] }>();
    const [selectedContact, setSelectedContact] = useState<Contact>();

    useEffect(() => {
        fetch('/api/me')
            .then(response => response.json())
            .then(json => setUser(json))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <>Loading chats</>
    }

    if (user?.clients[0].is_authenticated) {
        return (
            <>
                <ContactList selectedContact={selectedContact} setSelectedContact={setSelectedContact}/>
                <ContactMessages selectedContact={selectedContact}/>
            </>
        );
    }

    if (user?.clients[0].qr_code) {
        return (
            <>
                <Container>
                    <Row>
                        <Col className={"m-5"}>
                            <div className={"d-flex justify-content-center"}>
                                <h3>Você ainda não autenticou seu WhatsApp. Leia o QR code abaixo para iniciar</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"m-3"}>
                            <div className={"d-flex justify-content-center"}>
                                <Image
                                    src={user?.clients[0].qr_code}
                                    width={350}
                                    height={350}
                                    alt={"qr_code"}
                                ></Image>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    return (<>Ops</>);

}