'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div className="bg-background min-h-screen text-foreground font-body overflow-x-hidden">

            {/* HERO SECTION - High Density Mobile: Horizontal Scroll Snap */}
            <section className="container mx-auto px-0 lg:px-5 py-0 lg:py-10">
                <div className="flex lg:grid lg:grid-cols-12 gap-0 lg:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar h-[85vh] lg:h-auto">

                    {/* Main Hero Article (8 cols) */}
                    <div className="min-w-full lg:min-w-0 lg:col-span-8 group relative bg-black rounded-none lg:rounded-sm border-b lg:border border-white/10 shadow-sm overflow-hidden snap-center">
                        <div className="relative w-full h-full">
                            <img
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop"
                                alt="EDG Game of the Week"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none flex flex-col justify-end p-6 md:p-8 pb-20 lg:pb-8">
                                <span className="bg-primary text-black text-xs font-bold px-2 py-1 mb-3 w-fit uppercase tracking-wider">Game of the Week</span>
                                <h1 className="text-4xl md:text-5xl font-head font-black text-white leading-[0.9] mb-2 uppercase italic drop-shadow-md">
                                    THE TAKEOVER HAS ARRIVED
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl line-clamp-2 drop-shadow-sm">
                                    EDG Sports League redefines the professional ecosystem with a fatal four playoff format.
                                </p>
                            </div>

                            {/* Mobile Swipe Indicator */}
                            <div className="absolute bottom-4 right-4 lg:hidden animate-pulse">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                                    Top Headlines <span className="text-primary">→</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Headlines Sidebar (4 cols) - Mobile: Exact functionality as sidebar but swiped to */}
                    <div className="min-w-full lg:min-w-0 lg:col-span-4 flex flex-col bg-card border-l lg:border border-border/50 shadow-sm overflow-hidden h-full snap-center pt-24 lg:pt-0">
                        <div className="bg-card p-3 border-b border-border/50 flex justify-between items-center sticky top-0 bg-card z-10">
                            <h3 className="font-head font-bold text-lg text-foreground uppercase tracking-tight">Top Headlines</h3>
                            <Link href="/news" className="text-xs font-bold text-primary hover:text-white uppercase transition-colors">See All</Link>
                        </div>

                        {/* News List Items - Scrollable content within the slide */}
                        <div className="divide-y divide-border/50 flex-1 overflow-y-auto">
                            {[
                                { title: "THE REAL EDG PODCAST: EP 1", time: "OUT NOW", cat: "MEDIA", href: "/coming-soon", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=200&auto=format&fit=crop" },
                                { title: "JOB ALERT: HOSTS & COMMENTATORS", time: "APPLY NOW", cat: "CAREERS", href: "/careers", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=200&auto=format&fit=crop" },
                                { title: "COMMUNITY: GIVING BACK", time: "WEEKEND", cat: "OUTREACH", href: "/coming-soon", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=200&auto=format&fit=crop" },
                                { title: "2026 COMBINE REGISTRATION", time: "open", cat: "TRYOUTS", href: "/tryouts", img: "/images/combine_workbench.png" },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="flex gap-4 p-4 hover:bg-white/5 transition-colors group">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-primary uppercase">{item.cat}</span>
                                            <span className="text-[10px] text-muted-foreground">• {item.time}</span>
                                        </div>
                                        <h4 className="font-head font-bold text-base leading-tight text-foreground group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <div className="w-20 h-14 bg-secondary rounded-sm overflow-hidden flex-shrink-0 relative">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* QUICK LINKS / STATS STRIP - High Density Horizontal Scroll */}
            <section className="bg-card border-y border-border/50 py-4 lg:py-6 mb-8 lg:mb-12 overflow-x-auto no-scrollbar sticky top-[80px] z-30 shadow-lg lg:static lg:shadow-none">
                <div className="container mx-auto lg:px-5 flex items-center gap-8 lg:gap-12 min-w-max px-5">
                    <Link href="/stats/standings" className="flex items-center gap-3 group min-w-[200px]">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm lg:text-base">1</div>
                        <div>
                            <div className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase">EAST LEADER</div>
                            <div className="font-head font-bold text-base lg:text-lg text-foreground leading-none group-hover:text-primary transition-colors">POINT BREEZE</div>
                        </div>
                    </Link>
                    <div className="h-6 lg:h-8 w-px bg-border/50"></div>
                    <Link href="/stats/leaders" className="flex items-center gap-3 group min-w-[180px]">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm lg:text-base">27.2</div>
                        <div>
                            <div className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase">SCORING LEADER</div>
                            <div className="font-head font-bold text-base lg:text-lg text-foreground leading-none group-hover:text-primary transition-colors">N. ALLEN</div>
                        </div>
                    </Link>
                    <div className="h-6 lg:h-8 w-px bg-border/50"></div>
                    <Link href="/schedule" className="flex items-center gap-3 group min-w-[180px]">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-[10px] lg:text-xs animate-pulse">LIVE</div>
                        <div>
                            <div className="text-[10px] lg:text-xs font-bold text-muted-foreground uppercase">NEXT GAME</div>
                            <div className="font-head font-bold text-base lg:text-lg text-foreground leading-none group-hover:text-primary transition-colors">7:00 PM EST</div>
                        </div>
                    </Link>
                    <div className="h-6 lg:h-8 w-px bg-border/50"></div>
                    <Link href="/tryouts" className="px-5 py-2 bg-primary text-black font-head font-bold text-xs lg:text-sm uppercase tracking-wider hover:bg-white transition-colors rounded-sm whitespace-nowrap">
                        REGISTER NOW
                    </Link>
                </div>
            </section>

            {/* LATEST NEWS GRID - High Density Compact Grid */}
            <section className="container mx-auto px-2 lg:px-5 mb-20">
                <div className="flex items-center justify-between mb-4 lg:mb-8 border-b border-white/10 pb-4 px-3 lg:px-0">
                    <h2 className="text-xl lg:text-2xl font-head font-black uppercase italic tracking-tighter text-foreground">LATEST NEWS</h2>
                </div>

                {/* 2-column grid on mobile (High Density) instead of 1-column stack */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
                    {[
                        { id: 1, title: "The Real EDG Sports Podcast: Episode 1 is Live", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop", href: "/coming-soon" },
                        { id: 2, title: "Now Hiring: Podcast Hosts & Game Commentators", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop", href: "/careers" },
                        { id: 4, title: "Community Outreach: Events in the City", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop", href: "/coming-soon" },
                        { id: 5, title: "2026 Open Tryouts: Your Shot at the League", img: "/images/combine_workbench.png", href: "/tryouts" }
                    ].map((item) => (
                        <Link key={item.id} href={item.href} className="group cursor-pointer block bg-card rounded-sm overflow-hidden border border-border/30">
                            <div className="aspect-video bg-secondary mb-0 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-3">
                                <div className="text-[9px] font-bold text-primary mb-1 uppercase tracking-wide">News</div>
                                <h3 className="font-head font-bold text-sm lg:text-xl text-foreground leading-tight mb-0 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
