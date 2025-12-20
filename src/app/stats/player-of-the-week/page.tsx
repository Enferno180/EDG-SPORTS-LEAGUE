'use client';

import React from 'react';
import Image from 'next/image';

export default function PlayerOfTheWeekPage() {
    return (
        <section className="container mx-auto px-5 py-8 min-h-screen flex flex-col items-center justify-center text-center">
            <h1 className="section-title mb-4">PLAYER OF THE WEEK</h1>
            <p className="text-muted-foreground mb-8 text-xl italic">Feature Coming Soon</p>

            <div className="relative w-64 h-64 opacity-50">
                <div className="absolute inset-0 border-4 border-dashed border-white/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center text-6xl">🏆</div>
            </div>
        </section>
    );
}
