import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-white/70 font-light">
                        Trust is the foundation of our league. Here is how we protect yours.
                    </p>
                    <p className="text-sm text-white/40 mt-2 uppercase tracking-widest">
                        Effective Date: January 8, 2026
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-10 text-justify leading-relaxed text-gray-300">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-primary block rounded-full"></span>
                            1. Our Commitment
                        </h2>
                        <p>
                            At <strong>EDG SPORTS LEAGUE</strong>, your privacy is not an afterthought; it is a core value. Whether you are buying tickets, browsing stats, or buying merchandise, you trust us with your information. We honor that trust by being transparent about what we collect, why we collect it, and how strictly we guard it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            2. Information We Collect
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 mt-2 marker:text-primary">
                            <li><strong>Account Info:</strong> Name, email, and preferences when you register.</li>
                            <li><strong>Transaction Data:</strong> Securely tokenized payment details for tickets and gear (we do not store raw credit card numbers).</li>
                            <li><strong>Usage Data:</strong> How you interact with our site (e.g., favorite teams, stats viewed) to tailor your experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            3. How We Use Your Data
                        </h2>
                        <p>
                            We use your data solely to deliver the EDG experience: processing your orders, granting access to premium stats, and communicating league updates. We <strong>never</strong> sell your personal data to third-party data brokers. Any sharing is strictly limited to essential service providers (like payment processors) who are contractually bound to protect your data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            4. Security Measures
                        </h2>
                        <p>
                            We implement robust, industry-standard security protocols including encryption (SSL/TLS), secure servers, and regular security audits. While no online platform can be 100% immune to risks, we work tirelessly to stay ahead of threats and keep your information secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            5. Your Rights
                        </h2>
                        <p>
                            You own your data. You have the right to access, correct, or request deletion of your personal information at any time. If you wish to exercise these rights, simply contact us via our <Link href="/contact" className="text-primary hover:underline">Contact Page</Link>. We are here to serve you, not the other way around.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-1 h-8 bg-white/30 block rounded-full"></span>
                            6. Cookies & Tracking
                        </h2>
                        <p>
                            We use cookies sparingly—primarily to keep you logged in and to remember your preferences (like your favorite team theme). You can control cookie settings through your browser, though disabling them may affect some "cool factor" features of the site.
                        </p>
                    </section>

                    <div className="pt-10 border-t border-white/10 mt-12 text-center">
                        <p className="mb-6 italic text-white/50">
                            Your safety is our game plan.
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
