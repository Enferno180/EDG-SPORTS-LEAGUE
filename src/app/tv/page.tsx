
import React from 'react';
import { auth } from '@/auth';
import Link from 'next/link';
import { Lock } from '@phosphor-icons/react/dist/ssr'; // Ensure you have this or use a simple SVG

export default async function TVPage() {
    const session = await auth();

    // Mock Live Status
    const isLive = true;

    return (
        <div className="min-h-screen pt-20 pb-12 bg-black text-white">
            {/* HER0 SECTION - LIVE PLAYER */}
            <section className="container mx-auto px-4 mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        Live Now
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter">
                        EDG SPORTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">TV</span>
                    </h1>
                </div>

                {/* MAIN PLAYER (YouTube Embed for MVP) */}
                <div className="relative w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center p-8 bg-cover bg-center" style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Philadelphia_Skyline_Night.jpg/2560px-Philadelphia_Skyline_Night.jpg')" }}>
                    {/* Dark Overlay for readability */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    <div className="relative z-10">
                        <div className="w-24 h-24 mb-6 rounded-full bg-white flex items-center justify-center animate-heartbeat shadow-[0_0_30px_rgba(255,255,255,0.5)] mx-auto">
                            <span className="font-black italic text-black text-3xl tracking-tighter">EDG</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-2 tracking-tighter">
                            EDG SPORTS <span className="text-brand-primary">TV</span>
                        </h2>
                        <p className="text-xl md:text-2xl font-bold uppercase text-white/50 tracking-widest">
                            Coming Soon
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold">Broad Street Bullies vs. Kensington Kobras</h2>
                        <p className="text-white/50 text-sm">Week 12 | Live from The Palestra</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded font-bold text-sm transition-colors">Share</button>
                        <button className="bg-edg-red hover:bg-red-700 px-4 py-2 rounded font-bold text-sm transition-colors">Chat</button>
                    </div>
                </div>
            </section>

            {/* CHANNEL GRID */}
            <section className="container mx-auto px-4">
                <h3 className="section-title text-2xl mb-8 border-b border-white/10 pb-4">CHANNELS</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* CHANNEL 1: FREE (Highlights) */}
                    <div className="group cursor-pointer">
                        <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden border border-white/10 mb-3 group-hover:border-edg-red transition-colors">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-transparent transition-colors">
                                <span className="text-4xl">▶</span>
                            </div>
                            {/* Placeholder Image */}
                            <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-[10px] font-bold uppercase rounded">Free</div>
                        </div>
                        <h4 className="font-bold text-lg group-hover:text-edg-red transition-colors">Daily Top 10</h4>
                        <p className="text-xs text-white/50">The best plays from around the league.</p>
                    </div>

                    {/* CHANNEL 2: PREMIUM (Gated) */}
                    <div className="group cursor-pointer relative">
                        <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-white/10 mb-3">
                            {session ? (
                                // LOGGED IN VIEW
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-white/20">
                                    <span className="text-sm font-mono">[PREMIUM FEED SIGNAL]</span>
                                </div>
                            ) : (
                                // LOCKED VIEW
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 p-6 text-center">
                                    <Lock size={48} className="text-edg-red mb-4" />
                                    <h4 className="font-bold text-xl mb-2">Locker Room Access</h4>
                                    <p className="text-xs text-white/70 mb-4 max-w-[200px]">
                                        Exclusive mic'd up content and raw footage.
                                    </p>
                                    <Link href="/join">
                                        <button className="bg-edg-red text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-widest hover:bg-red-700 transition-colors">
                                            Unlock Access
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <h4 className="font-bold text-lg text-white/50 group-hover:text-white transition-colors">EDG Insider: Locker Room</h4>
                        <p className="text-xs text-white/40">Raw, uncut footage from the halftime speech.</p>
                    </div>

                    {/* CHANNEL 3: PPV */}
                    <div className="group cursor-pointer">
                        <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden border border-white/10 mb-3 group-hover:border-edg-red transition-colors">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl text-white/20">📅</span>
                            </div>
                            <div className="absolute top-2 left-2 bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase rounded">Upcoming</div>
                        </div>
                        <h4 className="font-bold text-lg group-hover:text-edg-red transition-colors">Combine Weekends Start Late Spring 2026</h4>
                        <p className="text-xs text-white/50">Starts in 14 Days.</p>
                    </div>

                </div>
            </section>
        </div>
    );
}
