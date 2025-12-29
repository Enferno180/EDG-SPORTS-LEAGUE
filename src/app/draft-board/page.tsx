import prisma from '@/lib/prisma';
import DraftBoardClient from './DraftBoardClient';
import { Player } from '@/lib/data';
import { calculateOVR, type Position, type Archetype } from '@/lib/rating';

// Force dynamic to see new registrants instantly
export const dynamic = 'force-dynamic';

export default async function DraftBoardPage() {
    // Fetch all prospects sorted by OVR (Best players first)
    // Note: 'ovr' in DB is integer, we will map it to 'overall'
    const prospects = await prisma.player.findMany({
        where: {
            isProspect: true
        },
        orderBy: {
            ovr: 'desc'
        }
    });

    // Map Prisma Player to Client Player
    const formattedProspects: Player[] = prospects.map(p => ({
        id: p.id,
        name: p.name,
        team: p.team?.name || 'Free Agent', // Use team name if relationship loaded, else 'Free Agent' (requires include team?) Or just string. 
        // p.teamId is available. Let's assume Free Agent for prospects usually.
        // Wait, schema says team is relation. We need to include it or just default.
        // Prospects usually don't have teams yet unless signed? 
        // Registration sets it? Let's check schema.
        // For now, default to 'Draft Prospect' or similar.
        pos: p.position as Position,
        archetype: (p.archetype as Archetype) || 'Undecided',
        height: p.height,
        age: 0, // Not in DB yet? schema has dob? We can calc age or default 19
        jersey: p.number || 0,
        status: 'Active',
        injury: null,
        returnTime: null,
        avatar: p.avatar || `https://i.pravatar.cc/150?u=${p.id}`,
        mpg: 0,
        ppg: 0,
        rpg: 0,
        apg: 0,
        spg: 0,
        bpg: 0,
        fgPct: 0,
        threePtPct: 0,
        ftPct: 0,
        tov: 0,
        overall: p.ovr,
        nbaTranslate: 'N/A',
        attributes: { // Mock attributes based on OVR or generic
            insideScoring: p.ovr - 10,
            midRangeScoring: p.ovr - 5,
            threePointScoring: p.ovr - 15,
            passing: p.ovr - 10,
            ballHandling: p.ovr - 8,
            perimeterDefense: p.ovr - 5,
            postDefense: p.ovr - 20,
            steals: p.ovr - 10,
            blocks: p.ovr - 15,
            rebounding: p.ovr - 10,
            athleticism: p.ovr - 5,
            dunking: p.ovr - 5,
        },
        badges: []
    }));

    return (
        <main className="min-h-screen pt-32 pb-12 px-6 bg-black text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white mb-2">
                            Big Board
                        </h1>
                        <p className="text-gray-400 text-xl font-light">
                            Top 100 Prospect Rankings
                        </p>
                    </div>
                    <div>
                        <a href="/register" className="inline-block bg-edg-red text-white font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-red-700 transition-colors">
                            Join the Draft Class
                        </a>
                    </div>
                </div>

                <DraftBoardClient initialProspects={formattedProspects} />
            </div>
        </main>
    );
}
