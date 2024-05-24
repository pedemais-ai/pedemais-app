"use client";

import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";

type ClockData = { dayOfWeek: string; dayOfMonth: string; month: string; formattedTime: string; }

function getCurrentDateTime(): ClockData {
    const currentTime = new Date();

    const dayOfWeek = new Intl.DateTimeFormat('pt-BR', {weekday: 'long'}).format(currentTime);
    const dayOfMonth = new Intl.DateTimeFormat('pt-BR', {day: 'numeric'}).format(currentTime);
    const month = new Intl.DateTimeFormat('pt-BR', {month: 'short'}).format(currentTime);

    const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
        hour: 'numeric',
        minute: 'numeric',
    });

    return {
        dayOfWeek,
        dayOfMonth,
        month,
        formattedTime,
    };
}

export default function Timer() {
    const [currentTime, setCurrentTime] = useState<ClockData>();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (!currentTime) {
        return <></>;
    }

    return (
        <>
            <div className="text-right">
                <Row className="mb-0">
                    <Col className="text-end mb-0" style={{lineHeight: '1', fontSize: '0.75rem'}}>
                        <small>{currentTime.dayOfWeek.toUpperCase()}</small>
                        <br/>
                        <small>{currentTime.dayOfMonth} {currentTime.month.toUpperCase()}</small>
                    </Col>
                </Row>
            </div>
            <div className="text-right ms-1 me-4">
                <p className="mb-0 fs-3">{currentTime.formattedTime}</p>
            </div>
        </>
    );
}
