
import React from 'react';

export default function FanZonePage() {
    return (
        <section id="fanzone" className="content-section">
            <h2 className="section-title">FAN ZONE</h2>

            <div className="cashless-banner">
                <i className="ph-bold ph-credit-card text-lg"></i>
                <span><strong>CASHLESS VENUE:</strong> Secure, contactless payments only. We accept Cards, Apple Pay, and Buy Now, Pay Later options.</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <h3 className="subsection-title">GAME TICKETS</h3>
                    <div className="space-y-4">
                        <div className="ticket-card">
                            <div>
                                <div className="ticket-eyebrow">WEEK 31 • PLAYOFFS</div>
                                <h4 className="ticket-title">SATURDAY SHOWDOWN</h4>
                                <div className="ticket-meta">April 12 @ 12:00 PM - 8:00 PM</div>
                            </div>
                            <button className="btn btn-sm">$15</button>
                        </div>
                        <div className="ticket-card">
                            <div>
                                <div className="ticket-eyebrow">WEEK 31 • PLAYOFFS</div>
                                <h4 className="ticket-title">SUNDAY ELIMINATION</h4>
                                <div className="ticket-meta">April 13 @ 12:00 PM - 6:00 PM</div>
                            </div>
                            <button className="btn btn-sm">$15</button>
                        </div>
                        <div className="ticket-card is-disabled">
                            <div>
                                <div className="ticket-eyebrow">SEASON PASS</div>
                                <h4 className="ticket-title">FULL ACCESS PASS</h4>
                                <div className="ticket-meta">All Games + Playoffs</div>
                            </div>
                            <button className="btn btn-sm" disabled>SOLD OUT</button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <h3 className="subsection-title">MEMBERSHIP</h3>
                    <div className="membership-card featured">
                        <div className="membership-badge">BEST VALUE</div>
                        <div className="mb-5">
                            <h4 className="membership-title">COURTSIDE CLUB</h4>
                            <div className="membership-subtitle">OFFICIAL MEMBER</div>
                        </div>
                        <ul className="membership-features">
                            <li>✓ Priority Seating at Main Court</li>
                            <li>✓ Exclusive &quot;City Edition&quot; Jersey</li>
                            <li>✓ 15% Off Team Shop</li>
                            <li>✓ Meet & Greet w/ MVPs</li>
                        </ul>
                        <div>
                            <div className="membership-price">$150 <span className="text-base text-muted-foreground">/ YR</span></div>
                            <button className="btn w-full">JOIN THE CLUB</button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <h3 className="subsection-title">NEWSLETTER</h3>
                    <div className="newsletter-box">
                        <div>
                            <h4 className="text-2xl mb-1">NEVER MISS A GAME</h4>
                            <p className="text-muted-foreground text-sm">Get the schedule, scores, and injury reports delivered to your inbox.</p>
                        </div>
                        <div className="flex gap-2.5 w-full">
                            <input type="email" placeholder="Enter your email" className="search-input flex-grow" />
                            <button className="btn">SUBSCRIBE</button>
                        </div>
                    </div>
                </div>

            </div>

            <h3 className="subsection-title mt-16">THE DROP: OFFICIAL MERCH</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="shop-item">
                    <div className="shop-placeholder bg-muted flex items-center justify-center h-48 rounded-md">
                        <span className="text-muted-foreground">JERSEY MOCKUP</span>
                    </div>
                    <h3>EDG OFFICIAL JERSEY</h3>
                    <p className="text-accent mt-1">$85.00</p>
                    <div className="mt-auto">
                        <div className="text-xs text-muted-foreground mb-1">or 4 payments of $21.25</div>
                        <button className="btn w-full">PRE-ORDER</button>
                    </div>
                </div>
                <div className="shop-item">
                    <div className="shop-placeholder bg-muted flex items-center justify-center h-48 rounded-md">
                        <span className="text-muted-foreground">HOODIE MOCKUP</span>
                    </div>
                    <h3>&quot;FATAL FOUR&quot; HOODIE</h3>
                    <p className="text-accent mt-1">$65.00</p>
                    <div className="mt-auto">
                        <div className="text-xs text-muted-foreground mb-1">or 4 payments of $16.25</div>
                        <button className="btn w-full">ADD TO CART</button>
                    </div>
                </div>
                <div className="shop-item">
                    <div className="shop-placeholder bg-muted flex items-center justify-center h-48 rounded-md">
                        <span className="text-muted-foreground">HAT MOCKUP</span>
                    </div>
                    <h3>PHILLY SKYLINE CAP</h3>
                    <p className="text-accent mt-1">$35.00</p>
                    <div className="mt-auto">
                        <div className="text-xs text-muted-foreground mb-1">or 4 payments of $8.75</div>
                        <button className="btn w-full">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
