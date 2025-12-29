
import React from 'react';

export function Ticker() {
    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {Array(10).fill(null).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="ticker-item font-bold text-primary">2026 PLAYER WORKOUT COMBINE & TRYOUTS: REGISTER NOW</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item">SECURE YOUR SPOT FOR THE 2026 SEASON</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item">VINE STREET VENOM VS TIOGA TIGERS: TICKETS ON SALE</div>
                        <div className="ticker-item text-white/50">•</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
