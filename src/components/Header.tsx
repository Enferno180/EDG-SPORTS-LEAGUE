import React from 'react'; // useState is removed, but React might still be needed for JSX
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import { NavDropdown } from '@/components/NavDropdown';

export async function Header() {
    const session = await auth();
    // isMobileMenuOpen state and setIsMobileMenuOpen are removed as Header is now a Server Component.
    // The mobile menu functionality needs to be extracted into a separate Client Component
    // that will manage its own state and be imported here.
    // For the purpose of this single file edit, the mobile menu toggle and display logic
    // will be commented out or removed, as it cannot function without client-side state.
    // A follow-up step would be to create a dedicated client component for the mobile navigation.

    // Consolidated Links - Critical League Info Only
    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'STANDINGS', href: '/stats/standings' },
        { name: 'PLAYER STATS', href: '/stats/players' },
        { name: 'TEAM STATS', href: '/stats/teams' },
        { name: 'LEADERS', href: '/stats/leaders' },
        { name: 'INJURIES', href: '/stats/injuries' },
        { name: 'SCHEDULE', href: '/schedule' },
        { name: 'MEDIA', href: '/media' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 py-3">
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
                    <Link href="/stats/standings" className="text-1xl font-bold italic tracking-tighter text-muted-foreground hover:text-primary transition-colors">STANDINGS</Link>
                    <Link href="/schedule" className="text-1xl font-bold italic tracking-tighter text-muted-foreground hover:text-primary transition-colors">SCHEDULE</Link>

                    {/* PLAYERS Dropdown */}
                    <NavDropdown
                        title="PLAYERS"
                        items={[
                            { label: 'Player Stats', href: '/stats/players' },
                            { label: 'League Leaders', href: '/stats/leaders' },
                            { label: 'Injury Report', href: '/stats/injuries' },
                            { label: 'Player of the Week', href: '/stats/player-of-the-week' }
                        ]}
                    />

                    {/* TEAMS Dropdown */}
                    <NavDropdown
                        title="TEAMS"
                        items={[
                            { label: 'Team Stats', href: '/stats/teams' },
                            { label: 'Rosters', href: '/teams/rosters' },
                            { label: 'Starting Lineups', href: '/teams/lineups' }
                        ]}
                    />

                    <Link href="/media" className="text-1xl font-bold italic tracking-tighter text-muted-foreground hover:text-primary transition-colors">MEDIA</Link>
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

                {/* Mobile Menu Toggle (Placeholder - functionality disabled during refactor) */}
                <button
                    className="lg:hidden text-2xl focus:outline-none text-foreground"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Navigation - Temporarily Removed until Client Component refactor */}
        </header>
    );
}
