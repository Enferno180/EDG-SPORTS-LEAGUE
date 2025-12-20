
'use client';

import React from 'react';

export default function CareersPage() {
    const handleStaffApplication = () => {
        window.location.href = 'mailto:mwilson@edgsports.com?subject=EDG Staff Application';
    };

    return (
        <section id="careers" className="content-section alt-bg">
            <div className="careers-hero">
                <h2 className="text-5xl mb-5">BUILD THE LEAGUE</h2>
                <p className="max-w-xl mx-auto mb-8 text-foreground/80">
                    We are looking for the First 160. Players, Coaches, and Content
                    Creators who are ready to change the culture of Philadelphia sports.
                    Now hiring: <strong>Coaches, Media Crew, Podcast Hosts, and Stat Keepers</strong>.
                </p>
                <button onClick={handleStaffApplication} className="btn">APPLY FOR STAFF</button>
            </div>
        </section>
    );
}
