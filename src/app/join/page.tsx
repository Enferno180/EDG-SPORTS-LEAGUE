import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TIER_DETAILS: Record<string, { name: string; price: string; features: string[] }> = {
    'tier_1': {
        name: 'The Digital Court',
        price: '$14.99/mo',
        features: [
            "Access to all 320 Live Games (Pixellot Feed)",
            "Access to Full Game Replays (VOD)",
            "Access to Player Stats & Ratings",
            "Mobile App Access"
        ]
    },
    'ticket_1': {
        name: 'Game Ticket',
        price: '$35.00',
        features: [
            "Single Game Entry",
            "Free Water Ice & Pretzel Voucher",
            "General Admission Seating",
            "Access to Fan Zone Area"
        ]
    },
    'tier_2': {
        name: 'The Home Court',
        price: '$39.99/mo',
        features: [
            "Everything in Digital Court",
            "15% Merch Discount Code",
            "Early Bird Ticket Access (24hr pre-sale)",
            "2 Free General Admission Tickets ($70 Value)"
        ]
    },
    'tier_3': {
        name: 'The Courtside Club',
        price: '$249.99/yr',
        features: [
            "Everything in Home Court",
            "Exclusive Founder's Jersey (Black/Gold)",
            "Discounted Seats (Center Court)",
            "20% Merch Discount",
            "Auto-entry: Halftime Half-Court Shot",
            "'Founding Member' Status on Website"
        ]
    }
};

export default async function JoinPage({ searchParams }: { searchParams: { tier?: string } }) {
    const session = await auth();
    const tierId = searchParams.tier || 'tier_1';
    const tier = TIER_DETAILS[tierId] || TIER_DETAILS['tier_1'];

    // If not logged in, show Auth Options
    if (!session) {
        return (
            <main className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center bg-black text-white">
                <div className="max-w-md w-full space-y-8 bg-zinc-900/50 border border-white/10 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        Join {tier.name}
                    </h1>
                    <div className="space-y-4 text-left bg-black/20 p-4 rounded-lg">
                        <p className="font-bold text-edg-red border-b border-white/10 pb-2 mb-2">INCLUDED:</p>
                        <ul className="space-y-2 text-sm text-gray-300">
                            {tier.features.map((feat, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-edg-red">✓</span> {feat}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        You must be logged in to purchase a membership.
                    </p>

                    <div className="space-y-4">
                        <Link href={`/login?callbackUrl=/join?tier=${tierId}`} className="block w-full">
                            <Button className="w-full bg-edg-red hover:bg-red-700 text-white font-bold py-3 uppercase tracking-widest">
                                Log In
                            </Button>
                        </Link>
                        <p className="text-xs text-center text-gray-500">OR</p>
                        <Link href={`/register?callbackUrl=/join?tier=${tierId}`} className="block w-full">
                            <Button variant="outline" className="w-full bg-transparent hover:bg-white/10 text-white border-white/20 font-bold py-3 uppercase tracking-widest">
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // If logged in, show Breakdown & Confirm
    return (
        <main className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center bg-black text-white">
            <div className="max-w-2xl w-full space-y-8 bg-zinc-900/50 border border-white/10 p-10 rounded-xl shadow-2xl backdrop-blur-sm">

                <div className="space-y-4">
                    <p className="text-edg-red font-bold uppercase tracking-widest text-sm">Summary of Benefits</p>
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase">
                        {tier.name}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-y border-white/10 py-8 my-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-white">What You Get:</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            {tier.features.map((feat, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-edg-red">✓</span> {feat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-lg text-white mb-2">Account:</h3>
                            <div className="p-3 bg-black/40 rounded border border-white/5">
                                <p className="text-sm font-bold text-white">{session.user?.name || 'Fan'}</p>
                                <p className="text-xs text-gray-500">{session.user?.email}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-gray-400">Total:</span>
                                <span className="text-3xl font-bold text-white">{tier.price}</span>
                            </div>
                            <p className="text-xs text-right text-edg-red italic">Renewable / One-time</p>
                        </div>
                    </div>
                </div>

                <Button className="w-full bg-edg-red hover:bg-red-700 text-white font-bold py-6 text-xl italic uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    Confirm & Start Membership
                </Button>

                <p className="text-xs text-muted-foreground">
                    Secured by Stripe (Mock). By confirming, you agree to the Terms of Service.
                </p>
            </div>
        </main>
    );
}
