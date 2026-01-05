'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="relative mb-8">
                {/* Pulsating Effect */}
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>

                {/* Spinning Logo */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 animate-[spin_3s_linear_infinite]">
                    <Image
                        src="/edg-logo.jpg"
                        alt="EDG Sports Logo"
                        fill
                        className="object-contain rounded-full border-4 border-primary/50"
                    />
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-head font-black text-white italic tracking-tighter mb-4 text-center animate-pulse">
                COMING SOON
            </h1>

            <p className="text-gray-400 text-lg md:text-xl font-medium mb-12 text-center max-w-md">
                We are building something specially for you. Stay tuned.
            </p>

            <Link
                href="/careers"
                className="group flex flex-col items-center justify-center gap-2 text-primary hover:text-white transition-colors"
            >
                <span className="text-xl md:text-2xl font-bold uppercase tracking-widest border-b-2 border-primary group-hover:border-white pb-1">
                    Host / Hostess Wanted
                </span>
                <span className="text-sm text-gray-400 group-hover:text-gray-200">
                    Apply Now
                </span>
            </Link>
        </div>
    );
}
