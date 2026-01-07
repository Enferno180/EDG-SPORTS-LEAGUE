import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        Terms of Use
                    </h1>
                    <p className="text-xl text-white/70 font-light">
                        Protecting Our Community, Our Game, and Your Data.
                    </p>
                    <p className="text-sm text-white/40 mt-2 uppercase tracking-widest">
                        Last Updated: January 8, 2026
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-10 text-justify leading-relaxed text-gray-300">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-primary block rounded-full"></span>
                            1. Welcome to the EDG Family
                        </h2>
                        <p>
                            At <strong>EDG SPORTS LEAGUE</strong>, we are building more than just a sports platform; we are building a community fueled by passion, competition, and respect. By accessing our website, purchasing tickets, or engaging with our content, you agree to these Terms of Use. We care deeply about your safety and experience, and these terms exist to ensure a level playing field for everyone—fans, players, and employees alike.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            2. Your Data & Privacy
                        </h2>
                        <p>
                            We treat your data with the same respect we demand on the court. <strong>EDG SPORTS LEAGUE</strong> employs industry-standard security measures to protect your personal information. We do not sell your data to third parties for their marketing purposes without your explicit consent. Your digital footprint here is safe, used strictly to enhance your experience, process transactions, and improve our league operations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            3. Code of Conduct
                        </h2>
                        <p>
                            Membership in our community is a privilege. We have a zero-tolerance policy for harassment, hate speech, or malicious behavior towards other fans, our players, or EDG employees. Whether in our digital forums or at live events, we expect sportsmanship. Violation of these standards may result in immediate suspension of your account and banning from future events, as we prioritize the safety and mental well-being of our entire ecosystem.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            4. Intellectual Property
                        </h2>
                        <p>
                            The EDG, EDG SPORTS LEAGUE, team logos, player likenesses, and broadcast content are the exclusive intellectual property of EDG SPORTS LEAGUE. You are welcome to share our content for non-commercial fan engagement (we love the hype!), but unauthorized reproduction, broadcasting, or commercial use is strictly prohibited and legally actionable. Respect the brand that respects the game.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            5. Liability & Safety
                        </h2>
                        <p>
                            While we strive for perfection, <strong>EDG SPORTS LEAGUE</strong> is not liable for indirect, incidental, or consequential damages arising from your use of our services. For live events, attendees assume all risks inherent to sporting events. However, we pledge to maintain rigorous safety protocols at all venues to minimize these risks because your physical safety is paramount to us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            6. Governing Law
                        </h2>
                        <p>
                            These terms are governed by the laws of the State of Pennsylvania and applicable federal laws of the United States. Any disputes arising from these terms shall be resolved in the appropriate state or federal courts located within Pennsylvania.
                        </p>
                    </section>

                    <div className="pt-10 border-t border-white/10 mt-12 text-center">
                        <p className="mb-6 italic text-white/50">
                            Thank you for being part of the journey. We are honored to have you.
                        </p>
                        <Link href="/" className="inline-block px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm font-bold tracking-widest uppercase transition-colors">
                            Return Home
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
