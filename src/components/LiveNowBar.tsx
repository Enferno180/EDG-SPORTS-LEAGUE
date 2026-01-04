
import Link from 'next/link';
import React from 'react';

export const LiveNowBar = () => {
    return (
        <div className="w-full bg-red-600 text-white overflow-hidden flex items-center h-8 relative z-50">
            <div className="bg-black/50 px-4 h-full flex items-center font-bold text-xs uppercase z-10 shrink-0">
                <span className="animate-pulse mr-2">●</span> Live Now
            </div>
            <div className="flex-1 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block font-mono text-xs tracking-wider">
                    <span className="mx-8">KENSINGTON KOBRAS vs PHILLY KINGS (3rd Qtr - 84-82)</span>
                    <span className="mx-8 opacity-50">|</span>
                    <span className="mx-8">WATCH FREE ON EDG TV</span>
                    <span className="mx-8 opacity-50">|</span>
                    <span className="mx-8">COMING UP: VIPERS vs MARTIANS (8:00 PM)</span>
                </div>
            </div>
            <Link href="/tv" className="bg-black hover:bg-white hover:text-black transition-colors px-6 h-full flex items-center font-bold text-[10px] uppercase tracking-widest z-10 shrink-0">
                Watch Stream
            </Link>
        </div>
    );
};
