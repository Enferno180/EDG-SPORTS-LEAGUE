'use client';

import { useState } from 'react';
import { updatePlayerStats } from './actions';
import { Player } from '@prisma/client';

export default function EditStatsForm({ player }: { player: Player }) {
    const [formData, setFormData] = useState({
        gamesPlayed: player.gamesPlayed || 0,
        totalPoints: player.totalPoints || 0,
        totalRebounds: player.totalRebounds || 0,
        totalAssists: player.totalAssists || 0,
        totalSteals: player.totalSteals || 0,
        totalBlocks: player.totalBlocks || 0,
        totalTurnovers: player.totalTurnovers || 0,
        fgm: player.fgm || 0,
        fga: player.fga || 0,
        threePtm: player.threePtm || 0,
        threePta: player.threePta || 0,
        ftm: player.ftm || 0,
        fta: player.fta || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value) || 0;
        setFormData({ ...formData, [e.target.name]: val });
    };

    const handleSubmit = async () => {
        const res = await updatePlayerStats(player.id, formData);
        if (res.success) {
            alert('Stats Updated!');
            // Optional: redirect or refresh
        } else {
            alert('Error: ' + res.message);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-bold mb-4 text-brand-primary">Game Totals</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Games Played" name="gamesPlayed" val={formData.gamesPlayed} onChange={handleChange} />
                    <Field label="Total Points" name="totalPoints" val={formData.totalPoints} onChange={handleChange} />
                    <Field label="Total Rebounds" name="totalRebounds" val={formData.totalRebounds} onChange={handleChange} />
                    <Field label="Total Assists" name="totalAssists" val={formData.totalAssists} onChange={handleChange} />
                    <Field label="Total Steals" name="totalSteals" val={formData.totalSteals} onChange={handleChange} />
                    <Field label="Total Blocks" name="totalBlocks" val={formData.totalBlocks} onChange={handleChange} />
                    <Field label="Total Turnovers" name="totalTurnovers" val={formData.totalTurnovers} onChange={handleChange} />
                </div>
            </div>

            <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-bold mb-4 text-brand-primary">Shooting Totals</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="FGM" name="fgm" val={formData.fgm} onChange={handleChange} />
                    <Field label="FGA" name="fga" val={formData.fga} onChange={handleChange} />
                    <Field label="3PM" name="threePtm" val={formData.threePtm} onChange={handleChange} />
                    <Field label="3PA" name="threePta" val={formData.threePta} onChange={handleChange} />
                    <Field label="FTM" name="ftm" val={formData.ftm} onChange={handleChange} />
                    <Field label="FTA" name="fta" val={formData.fta} onChange={handleChange} />
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full py-4 bg-white text-black font-bold uppercase rounded hover:bg-gray-200"
            >
                Save & Recalculate Averages
            </button>
        </div>
    );
}

function Field({ label, name, val, onChange }: any) {
    return (
        <div>
            <label className="block text-xs text-gray-400 mb-1">{label}</label>
            <input
                type="number"
                name={name}
                value={val}
                onChange={onChange}
                className="w-full p-2 bg-[#222] border border-white/10 rounded text-white font-mono"
            />
        </div>
    );
}
