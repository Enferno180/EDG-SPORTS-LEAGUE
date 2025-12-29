import prisma from '@/lib/prisma';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ScoutingReportPage() {
    // Fetch all prospects
    const prospects = await prisma.player.findMany({
        where: {
            isProspect: true
        },
        orderBy: {
            id: 'desc' // Newest first
        }
    });

    return (
        <main className="min-h-screen pt-32 pb-12 px-6 bg-black text-white">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-white mb-2">
                            Scouting Report
                        </h1>
                        <p className="text-gray-400 text-xl font-light">
                            Incoming Draft Class & Combine Participants
                        </p>
                    </div>
                    <div className="bg-white/5 px-6 py-3 rounded border border-white/10">
                        <span className="block text-xs uppercase font-bold text-gray-500 mb-1">Class Size</span>
                        <span className="text-3xl font-black text-edg-red">{prospects.length}</span>
                    </div>
                </div>

                {/* Content */}
                {prospects.length === 0 ? (
                    <div className="text-center py-24 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <h3 className="text-2xl font-bold text-gray-500 uppercase">No Prospects Registered Yet</h3>
                        <p className="text-gray-600 mt-2">Be the first to secure your spot in the Draft.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prospects.map((player: any) => (
                            <div key={player.id} className="group bg-zinc-900 border border-white/10 rounded-sm overflow-hidden hover:border-edg-red transition-colors relative">
                                {/* "Draft Card" Look */}
                                <div className="p-6 relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-white/10 px-2 py-1 text-xs font-bold uppercase tracking-wider rounded text-white/70">
                                            {player.position}
                                        </div>
                                        <div className="text-edg-red font-black text-xl italic">
                                            {player.ovr} OVR
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-black uppercase italic leading-none mb-1 text-white group-hover:text-edg-red transition-colors">
                                        {player.name}
                                    </h3>

                                    <div className="h-px w-full bg-white/10 my-4"></div>

                                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                                        <div>
                                            <span className="block text-gray-500 text-xs uppercase font-bold">Height</span>
                                            <span className="font-bold text-white">{player.height}</span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-500 text-xs uppercase font-bold">Weight</span>
                                            <span className="font-bold text-white">{player.weight}lbs</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="block text-gray-500 text-xs uppercase font-bold">School / Origin</span>
                                            <span className="font-bold text-white truncate block">{player.school || 'Unlisted'}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="block text-gray-500 text-xs uppercase font-bold">Hometown</span>
                                            <span className="font-bold text-white truncate block">{player.hometown || 'Unknown'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
