'use client'

import { useState } from 'react'
import { deletePlayer, addPlayer } from './actions'

// We receive the server data as props
export default function RosterManager({ teams }: { teams: any[] }) {
    const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || '')
    const [isAdding, setIsAdding] = useState(false)

    const selectedTeam = teams.find((t: any) => t.id === selectedTeamId)

    // Sort players by OVR (descending)
    const players = selectedTeam?.players.sort((a: any, b: any) => b.ovr - a.ovr) || []

    return (
        <div className="space-y-6">
            {/* Team Selector */}
            <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg border border-white/10">
                <select
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded border border-gray-700"
                >
                    {teams.map((team: any) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>

                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold"
                >
                    {isAdding ? 'Cancel' : '+ Sign Player'}
                </button>
            </div>

            {/* Add Player Form */}
            {isAdding && (
                <form action={(formData) => {
                    formData.append('teamId', selectedTeamId)
                    addPlayer(formData).then(() => setIsAdding(false))
                }} className="bg-gray-800 p-6 rounded-lg border border-blue-500/30 space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">New Free Agent Signing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name="name" placeholder="Player Name" required className="bg-gray-900 text-white p-2 rounded border border-gray-700" />
                        <select name="position" className="bg-gray-900 text-white p-2 rounded border border-gray-700">
                            <option value="PG">Point Guard (PG)</option>
                            <option value="SG">Shooting Guard (SG)</option>
                            <option value="SF">Small Forward (SF)</option>
                            <option value="PF">Power Forward (PF)</option>
                            <option value="C">Center (C)</option>
                        </select>
                        <input name="height" placeholder="Height (e.g. 6'5\')" defaultValue="6'0\" className="bg-gray-900 text-white p-2 rounded border border-gray-700" />
                    </div>
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded">
                        Officialize Signing
                    </button>
                </form>
            )}

            {/* Roster Table */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-white/10">
                <div className="p-4 border-b border-white/10 flex justify-between items-center" style={{ borderLeft: `4px solid ${selectedTeam?.primaryColor}` }}>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-sm px-2 py-1 bg-white/10 rounded">{players.length} Players</span>
                        {selectedTeam?.name}
                    </h2>
                </div>

                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-950 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">OVR</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Pos</th>
                            <th className="px-6 py-3">Height</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {players.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No players on this roster.</td>
                            </tr>
                        ) : players.map((player: any) => (
                            <tr key={player.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-lg" style={{ color: player.ovr >= 90 ? '#fbbf24' : player.ovr >= 80 ? '#22c55e' : '#94a3b8' }}>
                                    {player.ovr}
                                </td>
                                <td className="px-6 py-4 font-medium text-white">{player.name}</td>
                                <td className="px-6 py-4">{player.position}</td>
                                <td className="px-6 py-4">{player.height}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => {
                                            if (confirm('Release ' + player.name + '?')) {
                                                deletePlayer(player.id)
                                            }
                                        }}
                                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1 rounded text-sm font-medium transition-colors"
                                    >
                                        Release
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
