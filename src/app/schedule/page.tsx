
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CALENDAR_EVENTS } from '@/lib/data';

// Main calendar component
const Calendar = ({ events, selectedDay, setSelectedDay }: { events: any[], selectedDay: number | null, setSelectedDay: (day: number) => void }) => {
    const today = new Date();
    // Default to January 2026
    const currentMonth = 0; // January
    const currentYear = 2026;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    return (
        <div className="calendar-container">
            <div className="calendar-grid">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => <div key={day} className="calendar-day-header">{day}</div>)}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} className="calendar-day is-disabled"></div>)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = events.filter(e => e.day === day);
                    return (
                        <div key={day} className={`calendar-day ${selectedDay === day ? 'active' : ''}`} onClick={() => setSelectedDay(day)}>
                            <div className="day-number">{day}</div>
                            <div className="event-dots">
                                {dayEvents.map((e, index) => <div key={`${e.title}-${index}`} className="event-dot" style={{ background: `var(--color-${e.type})` }}></div>)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function SchedulePage() {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    useEffect(() => {
        // Set the initial date only on the client side to avoid hydration mismatch
        setSelectedDay(new Date().getDate());
    }, []);

    const selectedDayEvents = useMemo(() => {
        if (!selectedDay) return [];
        return CALENDAR_EVENTS.filter(e => e.day === selectedDay);
    }, [selectedDay]);

    return (
        <section id="schedule" className="content-section alt-bg">
            <div className="calendar-header">
                <h2 className="section-title">SCHEDULE & EVENTS</h2>
                <div className="flex gap-2">
                    <button className="btn btn-secondary">PREV</button>
                    <div className="calendar-month-display">JANUARY 2026</div>
                    <button className="btn btn-secondary">NEXT</button>
                </div>
            </div>

            <div className="calendar-legend">
                <div className="legend-item"><span className="legend-color" style={{ background: 'var(--color-game)' }}></span> GAMES</div>
                <div className="legend-item"><span className="legend-color" style={{ background: 'var(--color-media)' }}></span> MEDIA/PODCAST</div>
                <div className="legend-item"><span className="legend-color" style={{ background: 'var(--color-community)' }}></span> COMMUNITY</div>
                <div className="legend-item"><span className="legend-color" style={{ background: 'var(--color-promo)' }}></span> FAN GIVEAWAYS</div>
            </div>

            {selectedDay !== null && (
                <Calendar events={CALENDAR_EVENTS} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            )}

            <div className="event-list-container">
                <h3 className="event-list-title">UPCOMING EVENTS for April {selectedDay}</h3>
                <div>
                    {selectedDayEvents.length === 0 ? (
                        <div className="text-muted-foreground p-5">No events scheduled.</div>
                    ) : (
                        selectedDayEvents.map((e, index) => (
                            <div key={`${e.title}-${index}`} className="event-list-item">
                                <div className="event-time">{e.time}</div>
                                <div className="event-details">
                                    <span className="event-tag" style={{ border: `1px solid var(--color-${e.type})`, color: `var(--color-${e.type})` }}>{e.type}</span>
                                    <h4>{e.title}</h4>
                                    <p>{e.desc}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
