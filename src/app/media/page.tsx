
import React from 'react';

export default function MediaPage() {
    return (
        <section id="media" className="content-section alt-bg">
            <h2 className="section-title">MEDIA CENTER</h2>
            <div className="mb-12">
                <div className="media-pass-banner">
                    <h3 className="media-pass-title">EDG SPORTS TV</h3>
                    <p className="media-pass-desc">
                        Stream every game live in HD. Get access to full game replays,
                        exclusive locker room content, and the "mic'd up" series.
                    </p>
                    <div className="flex justify-center gap-5 flex-wrap">
                        <button className="btn btn-outline border-white text-white hover:bg-white hover:text-black">SINGLE GAME ($5.99)</button>
                        <button className="btn">SEASON PASS ($49.99)</button>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="media-column">
                    <h3 className="subsection-title">HIGHLIGHT REEL</h3>
                    <div className="flex flex-col gap-5">
                        <div className="media-card">
                            <div className="media-thumb"><div className="play-btn">▶</div></div>
                            <div className="p-4">
                                <h4 className="mb-1">Top 10 Dunks: Week 29</h4>
                                <p className="text-muted-foreground text-sm">The most explosive plays from the weekend.</p>
                            </div>
                        </div>
                        <div className="media-card">
                            <div className="media-thumb"><div className="play-btn">▶</div></div>
                            <div className="p-4">
                                <h4 className="mb-1">Game Winner: Venom vs Bulls</h4>
                                <p className="text-muted-foreground text-sm">Last second shot seals the deal.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="media-column">
                    <h3 className="subsection-title">POD WITH EDG SPORTS</h3>
                    <div className="flex flex-col gap-5">
                        <div className="podcast-item">
                            <div className="podcast-icon">🎙️</div>
                            <div>
                                <h4 className="mb-0.5">Ep. 45: Playoff Predictions</h4>
                                <p className="text-muted-foreground text-xs">Our analysts break down the bracket.</p>
                                <span className="podcast-listen-link">LISTEN NOW</span>
                            </div>
                        </div>
                        <div className="podcast-item">
                            <div className="podcast-icon">🎙️</div>
                            <div>
                                <h4 className="mb-0.5">Ep. 44: Interview w/ Coach J</h4>
                                <p className="text-muted-foreground text-xs">Discussing the rebuild of the Stallions.</p>
                                <span className="podcast-listen-link">LISTEN NOW</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
