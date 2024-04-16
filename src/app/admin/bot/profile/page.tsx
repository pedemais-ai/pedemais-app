import {Metadata} from "next";
import React from "react";
import {Col, Container, Row, Table} from "react-bootstrap";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Profile',
};

export default async function Profile() {

    const session = await getServerSession(authOptions);

    return (
        <>
            <pre>{JSON.stringify(session)}</pre>
            <Container className={"m-3"}>
                <Row>
                    <Col xs={4} lg={2}>
                        {session?.user?.image ?
                            <Image src={String(session?.user?.image)} width={100} height={100} alt={"profile-pic"}/> : ''}
                    </Col>
                    <Col xs={8} lg={10}>
                        <Table bordered>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <td>{session?.user?.name}</td>
                            </tr>
                            <tr>
                                <th>E-mail</th>
                                <td>{session?.user?.email}</td>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}