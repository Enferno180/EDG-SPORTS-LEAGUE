
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import { NavDropdown } from '@/components/NavDropdown';

export async function Header() {
    const session = await auth();

    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-5">
            <div className="container mx-auto px-5 flex items-center justify-between">
                {/* Logo & Brand */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/edg-logo.jpg"
                            alt="EDG Logo"
                            width={50}
                            height={50}
                            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                        <span className="font-head font-bold text-2xl tracking-super-wide text-white group-hover:text-primary transition-colors">EDG</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">

                    {/* STATS Dropdown */}
                    <NavDropdown
                        title="PLAYER STATS"
                        items={[
                            { label: 'Player Stats', href: '/stats/players' },
                            { label: 'League Leaders', href: '/stats/leaders' },
                            { label: 'Injury Report', href: '/stats/injuries' },
                        ]}
                    />

                    {/* SCOUTING Dropdown */}
                    <NavDropdown
                        title="SCOUTING"
                        items={[
                            { label: 'Registration', href: '/register' },
                            { label: 'Big Board', href: '/draft-board' },
                            { label: 'Draft Order', href: '/draft-order' },
                            { label: 'Prospects', href: '/scouting-report' },
                        ]}
                    />

                    {/* SCHEDULE Link */}
                    <Link href="/schedule" className="text-1xl font-bold italic tracking-tighter text-muted-foreground hover:text-primary transition-colors">SCHEDULE</Link>


                    {/* TICKETS Link */}
                    <Link href="/tickets" className="text-1xl font-bold italic tracking-tighter text-muted-foreground hover:text-primary transition-colors">TICKETS</Link>

                    {/* TV Link */}
                    <Link href="/tv" className="text-1xl font-bold italic tracking-tighter text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        TV
                    </Link>

                    {/* THE DROP Dropdown */}
                    <NavDropdown
                        title="THE DROP"
                        items={[
                            { label: 'EDG Life (Apparel)', href: '/drop-zone#life' },
                            { label: 'EDG Game Time (Gear)', href: '/drop-zone#gametime' },
                            { label: 'Accessories', href: '/drop-zone#accessories' },
                            { label: 'Shop All', href: '/drop-zone' },
                        ]}
                    />

                    {/* TEAMS Dropdown (Updated) */}
                    <NavDropdown
                        title="TEAMS"
                        items={[
                            { label: 'Team Stats', href: '/stats/teams' },
                            { label: 'Standings', href: '/stats/standings' },
                            { label: 'Power Rankings', href: '/power-rankings' },
                            { label: 'Rosters', href: '/teams/rosters' },
                            { label: 'Starting Lineups', href: '/teams/lineups' }
                        ]}
                    />

                    {/* MEDIA Dropdown */}
                    <NavDropdown
                        title="MEDIA"
                        items={[
                            { label: 'Top 10 Highlights', href: '/media/highlights/top-10' },
                            { label: 'Player of the Game', href: '/media/highlights/potg' },
                            { label: 'Combine All-Access', href: '/media/combine' },
                            { label: 'THE REAL EDG SPORTS PODCAST', href: '/media/podcast' }
                        ]}
                    />
                </nav>

                {/* Auth & Admin - Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {session?.user?.role === 'ADMIN' && (
                        <Link href="/admin" className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-widest border border-red-500/50 px-3 py-1 rounded">
                            Admin Dashboard
                        </Link>
                    )}

                    {session?.user ? (
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-xs font-bold text-white leading-tight">{session.user.name}</div>
                                <div className="text-[10px] text-white/50 uppercase tracking-wider">{session.user.role}</div>
                            </div>
                            <form action={async () => {
                                'use server';
                                await signOut({ redirectTo: "/" });
                            }}>
                                <button className="text-xs font-bold text-white/70 hover:text-white uppercase tracking-widest bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors">
                                    Foul Out
                                </button>
                            </form>
                        </div>
                    ) : (
                        <Link href="/login" className="text-xs font-bold text-white bg-primary hover:bg-primary/80 px-4 py-2 rounded uppercase tracking-widest transition-colors">
                            Check Rock
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle (Placeholder) */}
                <button
                    className="lg:hidden text-2xl focus:outline-none text-foreground"
                >
                    ☰
                </button>
            </div>
        </header>
    );
}
