"use client";

import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Prisma} from "@/core/types/prisma";
import {useMe} from "@/core/hooks/useMe";
import styles from "./calendar.module.css";
import Link from "next/link";

export default function Calendar() {
    const [me, setMe] = useState<Prisma.User>();
    const meState = useMe();

    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const today = new Date();
    const [date, setDate] = useState<Date>(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
    }, [date]);

    function getStartDayOfMonth(date: Date) {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return startDate === 0 ? 7 : startDate;
    }

    function isLeapYear(year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

    return (
        <>
            <Container>
                <Card className="mt-3 mb-5">
                    <Card.Body>
                        <Row className="d-flex justify-content-between align-items-center mb-3">
                            <Col className="text-center">
                                <Button variant="secondary" onClick={() => setDate(new Date(year, month - 1, day))}>
                                    Anterior
                                </Button>
                            </Col>
                            <Col className="text-center">
                                <h5>{MONTHS[month]} de {year}</h5>
                            </Col>
                            <Col className="text-center">
                                <Button variant="secondary" onClick={() => setDate(new Date(year, month + 1, day))}>
                                    Próximo
                                </Button>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <div className={styles.body}>
                                {DAYS_OF_THE_WEEK.map((d) => (
                                    <div key={d} className={styles.weekDay}>
                                        <strong>{d}</strong>
                                    </div>
                                ))}
                                {Array(days[month] + (startDay - 1))
                                    .fill(null)
                                    .map((_, index) => {
                                        const d = index - (startDay - 2);
                                        return (
                                            <div
                                                key={index}
                                                className={`${styles.day} ${(d === today.getDate() && month === today.getMonth()) ? styles.isToday : ''} ${d === day ? styles.isSelected : ''}`}
                                                // onClick={() => setDate(new Date(year, month, d))}
                                            >
                                                {d > 0 ? <>
                                                    <span className={"w-25"}>{d}</span>
                                                    <div className={"d-block"}>
                                                        {d === 1 ? <Link href={"#"} className={"text-secondary d-block mb-1"}>Feriadim</Link> : ''}
                                                        {d === 23 ? <Link href={"#"} className={"text-secondary d-block mb-1"}>Feriadim</Link> : ''}
                                                    </div>
                                                </> : ''}
                                            </div>
                                        );
                                    })}
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
