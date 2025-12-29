
import React from 'react';
import { Header } from '@/components/Header';

export default function PlaceholderPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans">
            <Header />
            <div className="flex flex-col items-center justify-center h-[80vh] px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 mb-6 border-b-4 border-cyan-500 pb-2">
                    COMING SOON
                </h1>
                <p className="text-xl text-neutral-400 max-w-lg">
                    We are currently building this feature. Check back later for updates from the EDG Sports League.
                </p>
                <div className="mt-8 flex gap-4">
                    <a href="/" className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase tracking-widest rounded transition-colors">
                        Return Home
                    </a>
                </div>
            </div>
        </div>
    );
}
