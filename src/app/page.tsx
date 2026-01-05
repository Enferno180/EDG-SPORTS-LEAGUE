'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div className="bg-background min-h-screen text-foreground font-body">

            {/* HERO SECTION - NBA Style: Main Story Left, Top Headlines Right */}
            <section className="container mx-auto px-0 md:px-5 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Hero Article (8 cols) - REPLACED WITH VIDEO PLAYER */}
                    <div className="lg:col-span-8 group relative bg-black rounded-sm border border-white/10 shadow-sm overflow-hidden">
                        <div className="relative aspect-[16/9] w-full">
                            <img
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2070&auto=format&fit=crop"
                                alt="EDG Game of the Week"
                            />

                            {/* Gradient Overlay for Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none flex flex-col justify-end p-6 md:p-8">
                                <span className="bg-primary text-black text-xs font-bold px-2 py-1 mb-3 w-fit uppercase tracking-wider">Game of the Week</span>
                                <h1 className="text-3xl md:text-5xl font-head font-black text-white leading-[0.9] mb-2 uppercase italic drop-shadow-md">
                                    THE TAKEOVER HAS ARRIVED
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl line-clamp-2 drop-shadow-sm">
                                    EDG Sports League redefines the professional ecosystem with a fatal four playoff format.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top Headlines Sidebar (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-0 bg-card border border-border/50 shadow-sm rounded-sm overflow-hidden h-fit">
                        <div className="bg-card p-3 border-b border-border/50 flex justify-between items-center">
                            <h3 className="font-head font-bold text-lg text-foreground uppercase tracking-tight">Top Headlines</h3>
                            <Link href="/news" className="text-xs font-bold text-primary hover:text-white uppercase transition-colors">See All</Link>
                        </div>

                        {/* News List Items */}
                        <div className="divide-y divide-border/50">
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

            {/* QUICK LINKS / STATS STRIP */}
            <section className="bg-card border-y border-border/50 py-6 mb-12 overflow-x-auto">
                <div className="container mx-auto px-5 flex items-center justify-between gap-12 min-w-[900px]">
                    <Link href="/stats/standings" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                        <div>
                            <div className="text-xs font-bold text-muted-foreground uppercase">EAST LEADER</div>
                            <div className="font-head font-bold text-lg text-foreground leading-none group-hover:text-primary transition-colors">POINT BREEZE PANTHERS</div>
                        </div>
                    </Link>
                    <div className="h-8 w-px bg-border/50"></div>
                    <Link href="/stats/leaders" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">27.2</div>
                        <div>
                            <div className="text-xs font-bold text-muted-foreground uppercase">SCORING LEADER</div>
                            <div className="font-head font-bold text-lg text-foreground leading-none group-hover:text-primary transition-colors">N. ALLEN</div>
                        </div>
                    </Link>
                    <div className="h-8 w-px bg-border/50"></div>
                    <Link href="/schedule" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs animate-pulse">LIVE</div>
                        <div>
                            <div className="text-xs font-bold text-muted-foreground uppercase">NEXT GAME</div>
                            <div className="font-head font-bold text-lg text-foreground leading-none group-hover:text-primary transition-colors">7:00 PM EST</div>
                        </div>
                    </Link>
                    <div className="h-8 w-px bg-border/50"></div>
                    <Link href="/tryouts" className="px-6 py-2 bg-primary text-black font-head font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors rounded-sm">
                        REGISTER NOW
                    </Link>
                </div>
            </section>

            {/* LATEST NEWS GRID */}
            <section className="container mx-auto px-5 mb-20">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-head font-black uppercase italic tracking-tighter text-foreground">LATEST NEWS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { id: 1, title: "The Real EDG Sports Podcast: Episode 1 is Live", img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop", href: "/coming-soon" },
                        { id: 2, title: "Now Hiring: Podcast Hosts & Game Commentators", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop", href: "/careers" },
                        { id: 4, title: "Community Outreach: Events in the City", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop", href: "/coming-soon" },
                        { id: 5, title: "2026 Open Tryouts: Your Shot at the League", img: "/images/combine_workbench.png", href: "/tryouts" }
                    ].map((item) => (
                        <Link key={item.id} href={item.href} className="group cursor-pointer block">
                            <div className="aspect-video bg-secondary mb-3 overflow-hidden rounded-sm relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">News</div>
                            <h3 className="font-head font-bold text-xl text-foreground leading-tight mb-3 group-hover:underline decoration-2 underline-offset-2 decoration-primary">
                                {item.title}
                            </h3>
                            <p className="text-base text-muted-foreground line-clamp-2 leading-relaxed">
                                Read more about this story...
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
