import React from "react";
import type {Metadata} from "next";
import Calendar from "@/components/admin/config/calendar/Calendar";

export const metadata: Metadata = {
    title: 'Calendário',
}

export default function CalendarPage() {
    return (
        <>
            <Calendar/>
        </>
    );
}
