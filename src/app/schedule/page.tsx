
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CALENDAR_EVENTS } from '@/lib/data';
import SneakerPoll from '@/components/SneakerPoll';

import { Sneaker, Microphone, Basketball, Users, Gift } from '@phosphor-icons/react';

// Main calendar component
const Calendar = ({ events, selectedDay, setSelectedDay }: { events: any[], selectedDay: number | null, setSelectedDay: (day: number) => void }) => {
    const today = new Date();
    // Default to January 2026
    const currentMonth = 0; // January
    const currentYear = 2026;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const [previewEvent, setPreviewEvent] = useState<{ image: string, title: string, desc: string } | null>(null);

    const handleMouseEnter = (dayEvents: any[]) => {
        const sneakerEvent = dayEvents.find(e => e.image);
        if (sneakerEvent) {
            setPreviewEvent(sneakerEvent);
        }
    };

    const handleMouseLeave = () => {
        setPreviewEvent(null);
    };

    const getEventIcons = (dayEvents: any[]) => {
        const types = new Set(dayEvents.map(e => e.type));
        const icons = [];
        if (types.has('fashion')) icons.push(<Sneaker key="sneaker" size={16} color="var(--color-fashion)" weight="fill" />);
        if (types.has('media')) icons.push(<Microphone key="mic" size={16} color="var(--color-media)" weight="fill" />);
        if (types.has('game')) icons.push(<Basketball key="game" size={16} color="var(--color-game)" weight="fill" />);
        if (types.has('community')) icons.push(<div key="philly" className="text-[10px] font-bold text-[#E60026]">P</div>); // Phillies P style representation
        if (types.has('promo')) icons.push(<Gift key="gift" size={16} color="var(--color-promo)" weight="fill" />);
        return icons;
    };

    return (
        <div className="calendar-container relative">
            {previewEvent && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none min-w-[300px]">
                    <div className="bg-black p-4 border-2 border-primary rounded shadow-2xl flex flex-col items-center">
                        <img src={previewEvent.image} alt={previewEvent.title} className="max-w-[300px] max-h-[300px] object-cover rounded mb-3" />
                        <div className="text-center font-bold text-primary text-xl uppercase tracking-tighter mb-1">{previewEvent.title}</div>
                        <div className="text-center text-xs text-white/80 font-mono">{previewEvent.desc.split('•')[2]?.trim() || 'COMING SOON'}</div>
                    </div>
                </div>
            )}
            <div className="calendar-grid">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => <div key={day} className="calendar-day-header">{day}</div>)}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} className="calendar-day is-disabled"></div>)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = events.filter(e => e.day === day);
                    return (
                        <div
                            key={day}
                            className={`calendar-day ${selectedDay === day ? 'active' : ''}`}
                            onClick={() => setSelectedDay(day)}
                            onMouseEnter={() => handleMouseEnter(dayEvents)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="day-number">{day}</div>
                            <div className="event-dots flex gap-1 justify-center mt-auto">
                                {getEventIcons(dayEvents)}
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
                <div className="legend-item"><Basketball size={16} color="var(--color-game)" weight="fill" /> GAMES</div>
                <div className="legend-item"><Microphone size={16} color="var(--color-media)" weight="fill" /> MEDIA/PODCAST</div>
                <div className="legend-item"><Sneaker size={16} color="var(--color-fashion)" weight="fill" /> SNEAKER DROP</div>
                <div className="legend-item"><div className="text-xs font-bold text-[#E60026]">P</div> COMMUNITY</div>
                <div className="legend-item"><Gift size={16} color="var(--color-promo)" weight="fill" /> FAN GIVEAWAYS</div>
            </div>

            {selectedDay !== null && (
                <Calendar events={CALENDAR_EVENTS} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            )}

            <div className="event-list-container">
                <h3 className="event-list-title">UPCOMING EVENTS for January {selectedDay}</h3>
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

            <SneakerPoll sneakers={CALENDAR_EVENTS.filter(e => e.type === 'fashion')} />
        </section>
    );
}
