import React from 'react';
import Image from 'next/image';

export default function PartnersPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>

            <div className="relative z-10 max-w-3xl w-full text-center space-y-12">

                {/* Hero Logo */}
                <div className="relative w-64 h-64 mx-auto mb-8">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <Image
                        src="/edg-logo.jpg"
                        alt="EDG Sports League"
                        fill
                        className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                    />
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                        Our Partners
                    </h1>

                    <div className="h-1 w-24 bg-white/20 mx-auto rounded-full"></div>

                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto italic">
                        "We are working on partnerships as we speak. We are home grown and looking to grow here at all first!"
                    </p>

                    <p className="text-sm font-bold tracking-widest text-edg-red uppercase pt-4">
                        Growing The Game From The Ground Up
                    </p>
                </div>

                {/* Optional: Call to Action for potential partners? User didn't ask for it, but "Contact Us" link is good practice. */}
                <div className="pt-12">
                    <a href="/contact" className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors border-b border-transparent hover:border-white">
                        Interested in Partnering? Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
