
import React from 'react';

export default function TryoutsPage() {
    return (
        <section id="tryouts" className="content-section">
            <h2 className="section-title">
                OPEN RUN TRYOUTS <span className="section-title-tag">CLASS OF 2026</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h3 className="text-3xl font-head mb-5">EARN YOUR SPOT</h3>
                    <p className="text-foreground/80 mb-5 leading-relaxed">
                        The road to the EDG Sports League starts here. We are scouting for
                        the 2026 season. Think you have what it takes to compete with
                        Philly's best? Show up, ball out, and get signed.
                    </p>
                    <ul className="list-none p-0 mb-7 text-foreground/90 space-y-2">
                        <li className="flex items-center gap-2.5"><i className="ph-fill ph-calendar-check text-accent"></i> Next Session: Saturday, May 10th</li>
                        <li className="flex items-center gap-2.5"><i className="ph-fill ph-map-pin text-accent"></i> Location: The Main Gym (North Philly)</li>
                        <li className="flex items-center gap-2.5"><i className="ph-fill ph-money text-accent"></i> Registration Fee: $20 (Cashless Only)</li>
                    </ul>
                    <div className="cashless-banner text-left p-4 mb-5 text-sm">
                        <span>*Tryout registration fee guarantees 3 games and a reversible jersey.</span>
                    </div>

                    <div className="disclaimer-box">
                        <h4 className="font-head text-lg mb-2.5">SEASON CONTRACT DISCLAIMER</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed mb-2.5">
                            <strong>Once a player is selected (drafted) by a coach:</strong> The
                            player pays a registration fee for the season equal to{' '}
                            <strong>$35 per game</strong> on a 40 game season. Full team
                            uniforms are <strong>$250</strong>.
                        </p>
                        <p className="text-sm text-foreground/80 leading-relaxed mb-2.5">
                            Must be paid in full to <strong>EDG Sports League</strong>. No
                            payments are made to any staff or affiliates whatsoever.
                        </p>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                            <strong>Compensation:</strong> Players are compensated for every
                            game played with <strong>50 bonus</strong> for games won.
                            Payments are through Cash App, Venmo, or Zelle.
                        </p>
                    </div>
                </div>

                <div className="bg-secondary p-8 border border-border rounded-lg">
                    <h4 className="subsection-title mb-5">PLAYER REGISTRATION</h4>
                    <form>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="form-label">First Name</label>
                                <input type="text" className="search-input w-full" />
                            </div>
                            <div>
                                <label className="form-label">Last Name</label>
                                <input type="text" className="search-input w-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="form-label">Height</label>
                                <input type="text" className="search-input w-full" placeholder="e.g. 6'4" />
                            </div>
                            <div>
                                <label className="form-label">Weight</label>
                                <input type="text" className="search-input w-full" placeholder="lbs" />
                            </div>
                            <div>
                                <label className="form-label">Age</label>
                                <input type="number" className="search-input w-full" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Primary Position</label>
                            <select className="filter-select w-full">
                                <option>Point Guard</option>
                                <option>Shooting Guard</option>
                                <option>Small Forward</option>
                                <option>Power Forward</option>
                                <option>Center</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Highest Level Played</label>
                            <select className="filter-select w-full">
                                <option>High School Varsity</option>
                                <option>College (D1/D2/D3)</option>
                                <option>Overseas / Pro</option>
                                <option>Streetball / Rec</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="search-input w-full" />
                        </div>

                        <button className="btn w-full">REGISTER NOW ($20)</button>
                        <p className="text-center text-muted-foreground/50 text-xs mt-2.5">Secure payment via Stripe/Square at next step.</p>
                    </form>
                </div>
            </div>
        </section>
    );
}
