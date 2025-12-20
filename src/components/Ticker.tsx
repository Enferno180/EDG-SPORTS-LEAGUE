
import React from 'react';

export function Ticker() {
    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {Array(10).fill(null).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="ticker-item">SEASON 2025 REGISTRATION OPEN</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item">VINE STREET VENOM VS TIOGA TIGERS: TICKETS ON SALE</div>
                        <div className="ticker-item text-white/50">•</div>
                        <div className="ticker-item">NEW MERCH DROP FRIDAY</div>
                        <div className="ticker-item text-white/50">•</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
