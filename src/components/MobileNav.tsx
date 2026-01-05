'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CaretDown, CaretUp, List, X } from '@phosphor-icons/react';

interface NavItem {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
    {
        label: 'PLAYER STATS',
        children: [
            { label: 'Player Stats', href: '/stats/players' },
            { label: 'League Leaders', href: '/stats/leaders' },
            { label: 'Injury Report', href: '/stats/injuries' },
        ]
    },
    {
        label: 'SCOUTING',
        children: [
            { label: 'Registration', href: '/register' },
            { label: 'Big Board', href: '/draft-board' },
            { label: 'Draft Order', href: '/draft-order' },
            { label: 'Prospects', href: '/scouting-report' },
        ]
    },
    { label: 'SCHEDULE', href: '/schedule' },
    { label: 'TICKETS', href: '/tickets' },
    { label: 'TV', href: '/tv' },
    {
        label: 'THE DROP',
        children: [
            { label: 'EDG Life (Apparel)', href: '/drop-zone#life' },
            { label: 'EDG Game Time (Gear)', href: '/drop-zone#gametime' },
            { label: 'Accessories', href: '/drop-zone#accessories' },
            { label: 'Shop All', href: '/drop-zone' },
        ]
    },
    {
        label: 'TEAMS',
        children: [
            { label: 'Team Stats', href: '/stats/teams' },
            { label: 'Standings', href: '/stats/standings' },
            { label: 'Power Rankings', href: '/power-rankings' },
            { label: 'Rosters', href: '/teams/rosters' },
            { label: 'Starting Lineups', href: '/teams/lineups' }
        ]
    },
    {
        label: 'MEDIA',
        children: [
            { label: 'Top 10 Highlights', href: '/media/highlights/top-10' },
            { label: 'Player of the Game', href: '/media/highlights/potg' },
            { label: 'Combine All-Access', href: '/media/combine' },
            { label: 'Podcast', href: '/media/podcast' }
        ]
    }
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleExpand = (label: string) => {
        setExpandedItem(expandedItem === label ? null : label);
    };

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="text-white hover:text-primary transition-colors p-2"
                aria-label="Open Menu"
            >
                <List size={32} weight="bold" />
            </button>

            {/* Overlay / Drawer */}
            <div
                className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-white/10">
                        <span className="font-head font-bold text-2xl text-white tracking-widest">MENU</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-primary transition-colors p-2"
                            aria-label="Close Menu"
                        >
                            <X size={32} weight="bold" />
                        </button>
                    </div>

                    {/* Links */}
                    <nav className="flex-1 p-6 space-y-2">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="border-b border-white/5 last:border-0">
                                {item.children ? (
                                    <div className="py-2">
                                        <button
                                            onClick={() => toggleExpand(item.label)}
                                            className="flex items-center justify-between w-full py-3 text-xl font-head font-bold text-white uppercase tracking-wider hover:text-primary transition-colors"
                                        >
                                            {item.label}
                                            {expandedItem === item.label ? (
                                                <CaretUp size={20} className="text-primary" />
                                            ) : (
                                                <CaretDown size={20} className="text-muted-foreground" />
                                            )}
                                        </button>

                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${expandedItem === item.label
                                                    ? 'grid-rows-[1fr] opacity-100 mb-4'
                                                    : 'grid-rows-[0fr] opacity-0'
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/20 ml-2">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            className="text-base text-gray-400 hover:text-white transition-colors font-medium"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className="block py-4 text-xl font-head font-bold text-white uppercase tracking-wider hover:text-primary transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Footer / Socials in Menu */}
                    <div className="p-6 bg-white/5 mt-auto">
                        <div className="text-xs text-center text-muted-foreground uppercase tracking-widest">
                            &copy; 2025 EDG Sports League
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
