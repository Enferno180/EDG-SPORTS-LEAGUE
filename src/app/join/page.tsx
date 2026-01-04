import prisma from '@/lib/prisma';
import { Check } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-dynamic';

export default async function JoinPage() {
    const plans = await prisma.subscriptionPlan.findMany({
        orderBy: { price: 'asc' }
    });

    // Fallback if no plans seeded
    const fallbackPlans = [
        { id: 'p1', name: 'Rookie', price: 999, features: '["Match Access", "Member Badge"]' },
        { id: 'p2', name: 'Pro', price: 1999, features: '["All Matches", "10% Merch Discount", "Pro Badge"]' },
        { id: 'p3', name: 'All-Star', price: 4999, features: '["VIP Seating", "20% Merch Discount", "Meet & Greet"]' },
    ];

    const displayPlans = plans.length > 0 ? plans : [];

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4">
                    Join The <span className="text-brand-primary">Club</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Unlock exclusive perks, discounts, and VIP access by becoming an official member.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {displayPlans.length === 0 ? (
                    fallbackPlans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan as any} />
                    ))
                ) : (
                    displayPlans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))
                )}
            </div>
        </div>
    );
}

function PlanCard({ plan }: { plan: { id: string, name: string, price: number, features: string, stripePriceId?: string } }) {
    const features = JSON.parse(plan.features);

    return (
        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 flex flex-col hover:border-brand-primary/50 hover:transform hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-2xl font-black italic uppercase mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold">${(plan.price / 100).toFixed(2)}</span>
                <span className="text-gray-500 ml-2">/mo</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                        <Check className="text-brand-primary mt-1" weight="bold" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button disabled className="w-full py-4 bg-gray-800 text-gray-400 font-bold uppercase rounded cursor-not-allowed">
                Subscribing Disabled
            </button>
        </div>
    );
}
