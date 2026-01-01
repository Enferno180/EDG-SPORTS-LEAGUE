"use client";

import { useState, useEffect } from 'react';
import { CaretCircleUp, CheckCircle, Fire, IceCream } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface PollProps {
    sneakers: {
        title: string;
        image?: string;
        day: number;
    }[];
}

const SneakerPoll = ({ sneakers }: PollProps) => {
    const { data: session } = useSession();
    const [selected, setSelected] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [votes, setVotes] = useState<Record<string, number>>({});

    // Initialize mock votes
    useEffect(() => {
        const initialVotes: Record<string, number> = {};
        sneakers.forEach(s => {
            // Generate deterministic mock votes based on length of title for consistent demo
            initialVotes[s.title] = Math.floor(s.title.length * 12.5) + 40;
        });
        setVotes(initialVotes);

        const savedVote = localStorage.getItem('sneaker_poll_vote');
        if (savedVote && session?.user) {
            setSelected(savedVote);
            setHasVoted(true);
        }
    }, [sneakers, session]);

    const handleVote = (title: string) => {
        if (!session) return;
        if (hasVoted) return;

        setSelected(title);
        setHasVoted(true);
        setVotes(prev => ({
            ...prev,
            [title]: prev[title] + 1
        }));
        localStorage.setItem('sneaker_poll_vote', title);
    };

    // Calculate percentages
    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

    return (
        <div className="bg-black/80 backdrop-blur-md border border-neutral-800 rounded-xl p-6 mt-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--color-fashion)_0%,_transparent_20%)] opacity-5 pointer-events-none"></div>

            <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2 relative z-10">
                <CaretCircleUp weight="fill" className="text-[var(--color-fashion)]" />
                Fan Poll: Most Anticipated Drop?
            </h2>
            <p className="text-neutral-400 mb-6 text-sm relative z-10">
                {session ? "Cast your vote for the biggest release of January." : "Log in to cast your vote for the biggest release."}
            </p>

            <div className="space-y-4 relative z-10">
                {sneakers.map((sneaker) => {
                    const voteCount = votes[sneaker.title] || 0;
                    const percentageValue = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                    const percentage = percentageValue.toFixed(1);
                    const isSelected = selected === sneaker.title;
                    const isHot = percentageValue >= 15; // Threshold for "Hot"

                    const canVote = !!session && !hasVoted;

                    return (
                        <div
                            key={sneaker.title}
                            className={`relative group transition-all duration-300 ${!session || hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
                            onClick={() => canVote && handleVote(sneaker.title)}
                        >
                            {/* Progress Bar Background */}
                            <div className="absolute inset-0 bg-neutral-900 rounded-lg overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ease-out ${isSelected ? 'bg-[var(--color-fashion)] opacity-20' : 'bg-neutral-800 opacity-50'}`}
                                    style={{ width: hasVoted ? `${percentage}%` : '0%' }}
                                />
                            </div>

                            <div className={`relative p-4 rounded-lg border flex items-center justify-between transition-colors
                                ${isSelected
                                    ? 'border-[var(--color-fashion)] bg-transparent'
                                    : 'border-transparent hover:border-neutral-700 hover:bg-white/5'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                                        {sneaker.image ? (
                                            <img src={sneaker.image} alt="Sneaker" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">IMG</div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-sm ${isSelected ? 'text-[var(--color-fashion)]' : 'text-neutral-200'}`}>
                                            {sneaker.title.replace(" (Men's Sizes)", "")}
                                        </h3>
                                        {hasVoted && (
                                            <div className="flex items-center gap-1 text-xs font-bold mt-0.5">
                                                {isHot ? (
                                                    <span className="text-orange-500 flex items-center gap-1"><Fire weight="fill" /> {percentage}%</span>
                                                ) : (
                                                    <span className="text-blue-300 flex items-center gap-1"><IceCream weight="fill" /> {percentage}%</span>
                                                )}
                                                <span className="text-neutral-500 font-normal ml-1">({voteCount} votes)</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {!session ? (
                                        <Link href="/api/auth/signin" className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs font-bold hover:bg-neutral-700 transition-colors">
                                            LOGIN
                                        </Link>
                                    ) : hasVoted ? (
                                        isSelected && <CheckCircle weight="fill" className="text-[var(--color-fashion)] text-xl" />
                                    ) : (
                                        <button className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-[var(--color-fashion)] hover:text-white text-xs font-bold transition-colors">
                                            VOTE
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SneakerPoll;
