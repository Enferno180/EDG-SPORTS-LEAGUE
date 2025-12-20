'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div className="bg-background min-h-screen text-foreground font-body">

            {/* HERO SECTION - NBA Style: Main Story Left, Top Headlines Right */}
            <section className="container mx-auto px-0 md:px-5 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Main Hero Article (8 cols) */}
                    <div className="lg:col-span-8 group cursor-pointer relative">
                        <div className="relative aspect-[16/9] overflow-hidden bg-black rounded-sm border border-white/10 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop"
                                alt="Main Story"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                            />
                            {/* Gradient Overlay for Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                                <span className="bg-primary text-black text-xs font-bold px-2 py-1 mb-3 w-fit uppercase tracking-wider">Playoffs</span>
                                <h1 className="text-3xl md:text-5xl font-head font-black text-white leading-[0.9] mb-2 uppercase italic">
                                    THE TAKEOVER HAS ARRIVED
                                </h1>
                                <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl line-clamp-2">
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
                                { title: "RUST BUCKET WINS MVP", time: "2h ago", cat: "AWARDS" },
                                { title: "DIVISION STANDINGS SHAKEUP", time: "4h ago", cat: "STANDINGS" },
                                { title: "WEEK 30 POWER RANKINGS", time: "6h ago", cat: "ANALYSIS" },
                                { title: "INJURY REPORT: BIG MIKE OUT", time: "8h ago", cat: "INJURIES" },
                                { title: "RECRUITING: NEXT GEN TALENT", time: "12h ago", cat: "TRYOUTS" },
                            ].map((item, i) => (
                                <Link key={i} href="#" className="flex gap-4 p-4 hover:bg-white/5 transition-colors group">
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
                                            src={`https://images.unsplash.com/photo-${['1579952363873-27f3bde9c2d3', '1533923307519-c6e3d2315b80', '1519861531473-920026393112', '1504450284411-e1cb538ea5f3', '1518063319789-7217e6706b04'][i % 5]}?q=80&w=200&auto=format&fit=crop`}
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
            <section className="bg-card border-y border-border/50 py-4 mb-8 overflow-x-auto">
                <div className="container mx-auto px-5 flex items-center justify-between gap-8 min-w-[800px]">
                    <Link href="/stats/standings" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                        <div>
                            <div className="text-xs font-bold text-muted-foreground uppercase">EAST LEADER</div>
                            <div className="font-head font-bold text-lg text-foreground leading-none group-hover:text-primary transition-colors">PHILLY KINGS</div>
                        </div>
                    </Link>
                    <div className="h-8 w-px bg-border/50"></div>
                    <Link href="/stats/leaders" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">32.4</div>
                        <div>
                            <div className="text-xs font-bold text-muted-foreground uppercase">SCORING LEADER</div>
                            <div className="font-head font-bold text-lg text-foreground leading-none group-hover:text-primary transition-colors">A. IVERSON</div>
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
            <section className="container mx-auto px-5 mb-12">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-2">
                    <h2 className="text-2xl font-head font-black uppercase italic tracking-tighter text-foreground">LATEST NEWS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { id: 1, title: "The Fatal Four: Why the #1 Seed is key", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop" },
                        { id: 2, title: "Inside the Scouting Combine", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=600&auto=format&fit=crop" },
                        { id: 3, title: "Season Ticket Holder Benefits", img: "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=600&auto=format&fit=crop" },
                        { id: 4, title: "Community Court Renovation Project", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop" }
                    ].map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="aspect-video bg-secondary mb-3 overflow-hidden rounded-sm relative">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10"></div>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="text-xs font-bold text-primary mb-1 uppercase">Feature</div>
                            <h3 className="font-head font-bold text-lg text-foreground leading-tight mb-2 group-hover:underline decoration-2 underline-offset-2 decoration-primary">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                In the EDG league, coming in second puts you in the danger zone. Here is a breakdown of the playoff implications.
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
