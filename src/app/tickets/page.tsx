
import React from 'react';
import { Header } from '@/components/Header';

// Mock Data for Tickets
const UPCOMING_GAMES = [
    {
        id: 1,
        date: 'FRI, JAN 12',
        time: '7:00 PM',
        homeTeam: 'Dauphin Ducks',
        awayTeam: 'Vine St Venom',
        venue: 'The EDG Arena, Philadelphia',
        price: 25,
        homeLogo: '/teams/dauphin-ducks.png',
        awayLogo: '/teams/vine-street-venom.png',
        status: 'Selling Fast'
    },
    {
        id: 2,
        date: 'SUN, JAN 14',
        time: '3:00 PM',
        homeTeam: 'Point Breeze Panthers',
        awayTeam: 'Kensington Kobras',
        venue: 'The EDG Arena, Philadelphia',
        price: 20,
        homeLogo: '/teams/point-breeze-panthers.png',
        awayLogo: '/teams/kensington-kobras.png',
        status: 'Available'
    },
    {
        id: 3,
        date: 'WED, JAN 17',
        time: '8:00 PM',
        homeTeam: 'Olney Owls',
        awayTeam: 'Manayunk Martians',
        venue: 'The EDG Arena, Philadelphia',
        price: 15,
        homeLogo: '/teams/olney-owls.png',
        awayLogo: '/teams/manayunk-martians.png',
        status: 'Available'
    },
    {
        id: 4,
        date: 'SAT, JAN 20',
        time: '7:30 PM',
        homeTeam: 'Dauphin Ducks',
        awayTeam: 'Point Breeze Panthers',
        venue: 'The EDG Arena, Philadelphia',
        price: 35,
        homeLogo: '/teams/dauphin-ducks.png',
        awayLogo: '/teams/point-breeze-panthers.png',
        status: 'High Demand'
    },
    {
        id: 5,
        date: 'TUE, JAN 23',
        time: '7:00 PM',
        homeTeam: 'Vine St Venom',
        awayTeam: 'Olney Owls',
        venue: 'The EDG Arena, Philadelphia',
        price: 22,
        homeLogo: '/teams/vine-street-venom.png',
        awayLogo: '/teams/olney-owls.png',
        status: 'Available'
    }
];

export default function TicketsPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-cyan-500 selection:text-black">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[400px] w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
                {/* Abstract Background pattern */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2690&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>

                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                        WITNESS THE FUTURE
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-300 font-medium tracking-wide">
                        LIVE AT THE EDG ARENA
                    </p>
                    <div className="mt-8">
                        <button className="px-8 py-3 bg-cyan-500 text-black font-bold text-lg rounded-none hover:bg-cyan-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                            VIEW SEASON SCHEDULE
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12">

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-neutral-900 border border-neutral-800 p-4 mb-10 shadow-lg">
                    <div className="flex items-center space-x-6 mb-4 md:mb-0">
                        <span className="text-neutral-400 uppercase tracking-widest text-sm font-bold">Filter By:</span>
                        <select className="bg-neutral-950 text-white border border-neutral-700 px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none hover:border-cyan-500 transition-colors">
                            <option>All Teams</option>
                            <option>Dauphin Ducks</option>
                            <option>Vine St Venom</option>
                        </select>
                        <select className="bg-neutral-950 text-white border border-neutral-700 px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none hover:border-cyan-500 transition-colors">
                            <option>January 2026</option>
                            <option>February 2026</option>
                        </select>
                    </div>
                    <div className="text-neutral-500 text-sm">
                        Showing {UPCOMING_GAMES.length} upcoming games
                    </div>
                </div>

                {/* Game Grid */}
                <div className="grid gap-6">
                    {UPCOMING_GAMES.map((game) => (
                        <div key={game.id} className="group relative bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-md hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <div className="flex flex-col md:flex-row items-center">

                                {/* Date Section */}
                                <div className="md:w-1/6 p-6 bg-neutral-950 text-center border-b md:border-b-0 md:border-r border-neutral-800 group-hover:bg-neutral-900 transition-colors">
                                    <div className="text-cyan-400 font-bold text-lg mb-1">{game.date.split(',')[0]}</div>
                                    <div className="text-3xl font-black text-white leading-none mb-1">{game.date.split(' ')[2]}</div>
                                    <div className="text-neutral-500 text-sm font-medium">{game.time}</div>
                                </div>

                                {/* Matchup Section */}
                                <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-between">
                                    <div className="flex items-center space-x-8 mb-6 md:mb-0 w-full md:w-auto justify-center">

                                        {/* Home Team */}
                                        <div className="text-center w-32">
                                            <div className="w-16 h-16 mx-auto mb-3 bg-neutral-800 rounded-full flex items-center justify-center p-2 group-hover:bg-neutral-700 transition-colors">
                                                {/* Fallback for missing images */}
                                                <img src={game.homeLogo} alt={game.homeTeam} />
                                            </div>
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors">{game.homeTeam}</h3>
                                        </div>

                                        <div className="text-2xl font-black text-neutral-600 italic">VS</div>

                                        {/* Away Team */}
                                        <div className="text-center w-32">
                                            <div className="w-16 h-16 mx-auto mb-3 bg-neutral-800 rounded-full flex items-center justify-center p-2 group-hover:bg-neutral-700 transition-colors">
                                                <img src={game.awayLogo} alt={game.awayTeam} />
                                            </div>
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors">{game.awayTeam}</h3>
                                        </div>
                                    </div>

                                    {/* Venue Info */}
                                    <div className="text-center md:text-left md:ml-8 mb-6 md:mb-0">
                                        <div className="flex items-center justify-center md:justify-start text-neutral-400 text-sm mb-1 uppercase tracking-wider font-bold">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            {game.venue}
                                        </div>
                                        <div className={`inline-block px-2 py-1 text-xs font-bold rounded ${game.status === 'Selling Fast' ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500'}`}>
                                            {game.status}
                                        </div>
                                    </div>

                                    {/* Action Section */}
                                    <div className="md:w-1/5 p-6 border-t md:border-t-0 md:border-l border-neutral-800 flex flex-col items-center justify-center bg-neutral-950 group-hover:bg-neutral-900 transition-colors">
                                        <div className="text-sm text-neutral-400 mb-1">Starting at</div>
                                        <div className="text-3xl font-black text-white mb-4">${game.price}</div>
                                        <button className="w-full py-3 bg-neutral-800 hover:bg-cyan-500 text-white hover:text-black font-bold uppercase tracking-wide transition-all duration-200 clip-path-slant">
                                            Buy Tickets
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
