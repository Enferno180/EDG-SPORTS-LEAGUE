
import React from 'react';

export function Ticker() {
    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {Array(4).fill(null).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="ticker-item font-bold text-primary">THE REAL EDG SPORTS PODCAST: EPISODE 1 OUT NOW</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item">WE ARE HIRING: PODCAST HOSTS & GAME COMMENTATORS</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item">SNEAKER WATCH: LATEST DROPS & RELEASE DATES</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item">COMMUNITY OUTREACH: EVENTS IN THE CITY</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item font-bold text-primary">2026 COMBINE & TRYOUTS: REGISTER NOW</div>
                        <div className="ticker-item text-white/50">•</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
