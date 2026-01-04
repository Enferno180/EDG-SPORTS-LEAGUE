import prisma from '@/lib/prisma';
import { Calendar, Ticket } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-dynamic';

export default async function TicketsPage() {
    // In a real app, we would fetch games that have ticket types configured
    const ticketTypes = await prisma.ticketType.findMany({
        orderBy: { price: 'asc' } // Simple sort for now
    });

    // Group by Game (mocking game details since we don't have a full Game model with relation yet)
    // We will just list the ticket options directly for MVP.

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                        Game <span className="text-brand-primary">Tickets</span>
                    </h1>
                    <p className="text-gray-400 mt-2">Secure your seats for the upcoming season.</p>
                </header>

                <div className="space-y-6">
                    {ticketTypes.length === 0 ? (
                        <div className="p-12 bg-[#111] rounded-xl text-center text-gray-400 border border-white/10">
                            No tickets currently on sale.
                        </div>
                    ) : (
                        ticketTypes.map((ticket) => (
                            <div key={ticket.id} className="flex flex-col md:flex-row items-center justify-between bg-[#111] p-6 rounded-xl border border-white/10 hover:border-brand-primary/40 transition">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-lg flex items-center justify-center">
                                        <Ticket size={32} weight="fill" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{ticket.name}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><Calendar /> Next Game</span>
                                            <span>•</span>
                                            <span>Capacity: {ticket.capacity - ticket.sold} left</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 mt-4 md:mt-0">
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">${(ticket.price / 100).toFixed(2)}</div>
                                        <div className="text-xs text-gray-500">per seat</div>
                                    </div>
                                    <form action="/api/checkout" method="POST">
                                        <input type="hidden" name="ticketTypeId" value={ticket.id} />
                                        <button className="px-6 py-3 bg-brand-primary text-black font-bold uppercase rounded hover:bg-brand-primary/90 transition">
                                            Get Tickets
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
