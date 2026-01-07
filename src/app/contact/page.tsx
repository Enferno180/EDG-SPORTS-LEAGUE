import React from 'react';
import Image from 'next/image';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>

            <div className="relative z-10 max-w-2xl w-full text-center space-y-12">

                {/* Pulsating Logo */}
                <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <Image
                        src="/edg-logo.jpg"
                        alt="EDG Sports League"
                        fill
                        className="object-contain animate-pulse-slow drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    />
                </div>

                {/* Message */}
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase">
                        We Hear You
                    </h1>

                    <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>

                    <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-lg mx-auto">
                        <span className="font-bold text-white">EDG SPORTS LEAGUE</span> cares about our fans and is willing to listen to your feedback.
                    </p>

                    <p className="text-sm font-bold tracking-widest text-white/50 uppercase">
                        Thank You
                    </p>
                </div>

                {/* Contact Action */}
                <div className="pt-8">
                    <a
                        href="mailto:edgsportsinfo@edgsportsleague.com"
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent border-2 border-white/20 hover:border-primary hover:bg-primary/10 rounded overflow-hidden"
                    >
                        <span className="absolute inset-0 w-full h-full -mt-10 transition-all duration-700 transform opacity-0 rotate-12 group-hover:-translate-x-40 ease bg-gradient-to-r from-primary/20 to-transparent group-hover:opacity-100"></span>
                        <span className="relative flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="tracking-widest uppercase">Contact Us Now</span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
