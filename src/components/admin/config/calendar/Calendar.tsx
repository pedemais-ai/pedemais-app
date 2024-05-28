"use client";

import React, {useEffect, useState} from "react";
import {Card, Container} from "react-bootstrap";
import {Prisma} from "@/core/types/prisma";
import {useMe} from "@/core/hooks/useMe";
import styles from './calendar.module.css';

export default function Calendar() {

    const [me, setMe] = useState<Prisma.User>();
    const meState = useMe();

    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

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
                <Card className="mt-3" style={{marginBottom: "100px"}}>
                    <div className={styles.frame}>
                        <div className={styles.header}>
                            <div className={styles.button} onClick={() => setDate(new Date(year, month - 1, day))}>Prev</div>
                            <div>
                                {MONTHS[month]} {year}
                            </div>
                            <div className={styles.button} onClick={() => setDate(new Date(year, month + 1, day))}>Next</div>
                        </div>
                        <div className={styles.body}>
                            {DAYS_OF_THE_WEEK.map((d) => (
                                <div key={d} className={styles.day}>
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
                                            className={`${styles.day} ${d === today.getDate() ? styles.isToday : ''} ${d === day ? styles.isSelected : ''}`}
                                            onClick={() => setDate(new Date(year, month, d))}
                                        >
                                            {d > 0 ? d : ''}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </Card>
            </Container>
        </>
    );
}
