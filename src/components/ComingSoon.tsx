import React from 'react';
import Link from 'next/link';

interface ComingSoonProps {
    title?: string;
    subtitle?: string;
    backLink?: string;
    backText?: string;
}

export default function ComingSoon({
    title = "COMING SOON",
    subtitle = "This content is currently in production.",
    backLink = "/",
    backText = "Return Home"
}: ComingSoonProps) {
    return (
        <div className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Philadelphia_Skyline_Night.jpg/2560px-Philadelphia_Skyline_Night.jpg')" }}
            >
            </div>
            <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm"></div>

            {/* Content */}
            <div className="relative z-20 text-center p-8 max-w-2xl">
                {/* Heartbeat Animation */}
                <div className="w-32 h-32 mb-8 rounded-full bg-white flex items-center justify-center animate-heartbeat shadow-[0_0_40px_rgba(255,255,255,0.3)] mx-auto">
                    <span className="font-black italic text-black text-4xl tracking-tighter">EDG</span>
                </div>

                {/* Text */}
                <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white mb-4 tracking-tighter animate-fade-in-up">
                    EDG <span className="text-brand-primary">SPORTS</span>
                </h1>

                <div className="h-1 w-24 bg-brand-primary mx-auto mb-8 rounded-full"></div>

                <h2 className="text-2xl md:text-3xl font-bold uppercase text-white/90 mb-4 tracking-widest animate-fade-in-up delay-100">
                    {title}
                </h2>

                <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-200">
                    {subtitle}
                </p>

                {/* Action */}
                <Link href={backLink}>
                    <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 animate-fade-in-up delay-300">
                        {backText}
                    </button>
                </Link>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-8 text-center w-full z-20 text-white/20 text-xs uppercase tracking-[0.2em] font-bold">
                Philadelphia • Est. 2026
            </div>
        </div>
    );
}
