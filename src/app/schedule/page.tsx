
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CALENDAR_EVENTS } from '@/lib/data';
import SneakerPoll from '@/components/SneakerPoll';

import { Sneaker, Microphone, Basketball, Users, Barbell } from '@phosphor-icons/react';

// Main calendar component
const Calendar = ({ events, selectedDay, setSelectedDay, viewDate }: { events: any[], selectedDay: number | null, setSelectedDay: (day: number) => void, viewDate: Date }) => {
    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
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
        if (types.has('community')) icons.push(<div key="philly" className="w-4 h-4 flex items-center justify-center text-[10px] font-bold text-[#E60026]">P</div>); // Phillies P style representation
        if (types.has('tryouts')) icons.push(<Barbell key="tryouts" size={16} color="var(--color-promo)" weight="fill" />);
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
    const [filter, setFilter] = useState<string>('all'); // 'all', 'game', 'media', 'fashion', 'community', 'tryouts'

    useEffect(() => {
        // Set the initial date only on the client side to avoid hydration mismatch
        setSelectedDay(new Date().getDate());
    }, []);

    const [viewDate, setViewDate] = useState(new Date(2026, 0, 1)); // Start at Jan 2026

    const goToPrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const formattedMonth = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

    // Filter events
    const filteredEvents = useMemo(() => {
        if (filter === 'all') return CALENDAR_EVENTS;
        return CALENDAR_EVENTS.filter(e => e.type === filter);
    }, [filter]);

    const selectedDayEvents = useMemo(() => {
        if (!selectedDay) return [];
        return filteredEvents.filter(e => e.day === selectedDay);
    }, [selectedDay, filteredEvents]);

    const filters = [
        { id: 'all', label: 'ALL EVENTS', icon: null },
        { id: 'game', label: 'GAMES', icon: <Basketball size={16} weight="fill" /> },
        { id: 'media', label: 'MEDIA', icon: <Microphone size={16} weight="fill" /> },
        { id: 'fashion', label: 'DROPS', icon: <Sneaker size={16} weight="fill" /> },
        { id: 'community', label: 'COMMUNITY', icon: <div className="text-[10px] font-bold">P</div> },
        { id: 'tryouts', label: 'COMBINE', icon: <Barbell size={16} weight="fill" /> },
    ];

    return (
        <section id="schedule" className="content-section alt-bg relative">
            {/* HOVERING FILTER TAB */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 group">
                <div className="bg-black/90 border border-primary/30 rounded-full px-6 py-2 shadow-2xl backdrop-blur-md cursor-pointer flex items-center gap-2 hover:border-primary transition-all duration-300">
                    <span className="text-primary font-bold text-sm tracking-wider flex items-center gap-2">
                        FILTER SCHEDULE <span className="text-xs text-white/50 group-hover:hidden">▼</span>
                    </span>

                    {/* DROPDOWN CONTENT (Visible on Hover) */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[220px] bg-black border border-primary/20 rounded shadow-xl overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 flex flex-col">
                        {filters.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider hover:bg-white/10 flex items-center gap-3 transition-colors ${filter === f.id ? 'bg-primary text-black' : 'text-white'}`}
                            >
                                {f.icon && <span className={filter === f.id ? 'text-black' : 'text-primary'}>{f.icon}</span>}
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="calendar-header pt-12"> {/* Added PT for filter space */}
                <h2 className="section-title">SCHEDULE & EVENTS</h2>
                <div className="flex gap-2">
                    <button onClick={goToPrevMonth} className="btn btn-secondary">PREV</button>
                    <div className="calendar-month-display">{formattedMonth}</div>
                    <button onClick={goToNextMonth} className="btn btn-secondary">NEXT</button>
                </div>
            </div>

            <div className="calendar-legend opacity-50 hover:opacity-100 transition-opacity">
                <div className="legend-item"><Basketball size={16} color="var(--color-game)" weight="fill" /> GAMES</div>
                <div className="legend-item"><Microphone size={16} color="var(--color-media)" weight="fill" /> MEDIA/PODCAST</div>
                <div className="legend-item"><Sneaker size={16} color="var(--color-fashion)" weight="fill" /> SNEAKER DROP</div>
                <div className="legend-item"><div className="w-4 h-4 flex items-center justify-center text-xs font-bold text-[#E60026]">P</div> COMMUNITY</div>
                <div className="legend-item"><Barbell size={16} color="var(--color-promo)" weight="fill" /> COMBINE / TRYOUTS</div>
            </div>

            {selectedDay !== null && (
                <Calendar
                    events={filteredEvents}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    viewDate={viewDate}
                />
            )}

            <div className="event-list-container">
                <h3 className="event-list-title">UPCOMING EVENTS for {viewDate.toLocaleString('default', { month: 'long' })} {selectedDay}</h3>
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
