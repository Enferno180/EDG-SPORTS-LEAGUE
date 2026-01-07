import React from 'react';
import Link from 'next/link';

export function ClassifiedInterruption({
    title = "Classified Material",
    subtitle = "Clearance Level 5 Required"
}: {
    title?: string,
    subtitle?: string
}) {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-black text-white">

            {/* Background elements (grid/noise) */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl w-full border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-12 text-center rounded-sm">

                {/* Stamp Animation */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 transform rotate-12 opacity-80 animate-pulse-slow">
                    <div className="border-4 border-red-600/50 text-red-600/50 px-4 py-2 font-black text-2xl md:text-4xl uppercase tracking-widest rounded mask-stamp">
                        TOP SECRET
                    </div>
                </div>

                <div className="mb-8">
                    <div className="inline-block bg-white/10 rounded-full p-6 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">
                        {title}
                    </h1>
                    <div className="h-1 w-16 bg-red-600 mx-auto rounded my-4"></div>
                    <p className="text-xl font-mono text-red-400 tracking-widest uppercase mb-8">
                        {subtitle}
                    </p>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                    The EDG Scouting Department is currently finalizing evaluations for the 2026 Draft Class.
                    Full reports and metrics will be declassified following the official Combine.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/register" className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded transition-colors">
                        Register for Draft
                    </Link>
                    <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded transition-colors">
                        Return to HQ
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 mx-auto max-w-xs">
                    <p className="text-xs text-white/20 font-mono text-center">
                        SECURE CONNECTION ESTABLISHED<br />
                        IP: REDACTED<br />
                        SESSION ID: {Math.random().toString(36).substring(7).toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    );
}
