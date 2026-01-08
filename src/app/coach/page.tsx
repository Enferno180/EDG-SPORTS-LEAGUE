
'use client';

import { useState, useEffect } from 'react';
import { submitIncidentReport, getCoachData } from './actions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Player } from '@prisma/client';

export default function CoachDashboard() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [incidents, setIncidents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [type, setType] = useState('BEHAVIOR');
    const [severity, setSeverity] = useState('LOW');
    const [desc, setDesc] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getCoachData().then(data => {
            if (data) {
                setPlayers(data.allPlayers);
                setIncidents(data.recentIncidents);
            }
            setLoading(false);
        });
    }, []);

    const handleSubmit = async () => {
        if (!desc) return alert("Description required");
        if (selectedPlayers.length === 0) return alert("Select at least one player");

        setSubmitting(true);
        const res = await submitIncidentReport({
            type,
            severity,
            description: desc,
            playerIds: selectedPlayers
        });
        setSubmitting(false);

        if (res.success) {
            alert("Report Submitted");
            setDesc('');
            setSelectedPlayers([]);
            // Refresh logic (simple reload for prototype)
            window.location.reload();
        } else {
            alert("Error: " + res.error);
        }
    };

    const togglePlayer = (id: string) => {
        if (selectedPlayers.includes(id)) {
            setSelectedPlayers(selectedPlayers.filter(p => p !== id));
        } else {
            setSelectedPlayers([...selectedPlayers, id]);
        }
    };

    if (loading) return <div className="p-10 text-white">Loading Portal...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-20">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8 text-edg-red">Coach <span className="text-white">Portal</span></h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* INCIDENT FORM */}
                <Card className="bg-[#1a1a1a] border-white/10">
                    <CardHeader>
                        <CardTitle className="text-xl uppercase tracking-wider text-red-500">File Incident Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="text-gray-400">Incident Type</Label>
                            <select
                                className="w-full p-2 bg-[#111] border border-white/10 rounded mt-1"
                                value={type} onChange={e => setType(e.target.value)}
                            >
                                <option value="BEHAVIOR">Conduct / Behavior</option>
                                <option value="INJURY">Injury Report</option>
                                <option value="EJECTION">Ejection / Tech</option>
                                <option value="DISPUTE">Dispute</option>
                            </select>
                        </div>

                        <div>
                            <Label className="text-gray-400">Severity</Label>
                            <div className="flex gap-2 mt-1">
                                {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map(lvl => (
                                    <button
                                        key={lvl}
                                        onClick={() => setSeverity(lvl)}
                                        className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${severity === lvl ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-white/10'}`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label className="text-gray-400">Involved Players</Label>
                            <div className="h-32 overflow-y-auto border border-white/10 rounded mt-1 bg-[#111] p-2 grid grid-cols-2 gap-1">
                                {players.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => togglePlayer(p.id)}
                                        className={`cursor-pointer px-2 py-1 text-xs rounded border ${selectedPlayers.includes(p.id) ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-transparent text-gray-400 hover:bg-white/5'}`}
                                    >
                                        {p.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Label className="text-gray-400">Description</Label>
                            <textarea
                                className="w-full h-32 p-3 bg-[#111] border border-white/10 rounded mt-1 focus:border-red-500 outline-none text-sm"
                                placeholder="Describe exactly what happened..."
                                value={desc} onChange={e => setDesc(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full bg-white text-black hover:bg-red-600 hover:text-white font-bold uppercase"
                        >
                            {submitting ? 'Submitting...' : 'Submit Report'}
                        </Button>
                    </CardContent>
                </Card>

                {/* DASHBOARD / HISTORY */}
                <div className="space-y-6">
                    <Card className="bg-[#1a1a1a] border-white/10">
                        <CardHeader>
                            <CardTitle className="text-xl uppercase tracking-wider">My Recent Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {incidents.length === 0 ? (
                                    <div className="text-gray-500 italic text-sm">No reports filed.</div>
                                ) : (
                                    incidents.map((inc: any) => (
                                        <div key={inc.id} className="p-3 bg-[#111] border-l-4 border-red-500 rounded-r">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="font-bold text-white text-sm">{inc.type}</span>
                                                <span className="text-[10px] text-gray-500">{new Date(inc.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="text-xs text-gray-400 line-clamp-2">{inc.description}</div>
                                            <div className="flex gap-2 mt-2">
                                                {inc.players.map((p: any) => (
                                                    <span key={p.id} className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] text-gray-500">{p.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1a1a] border-white/10">
                        <CardHeader>
                            <CardTitle className="text-xl uppercase tracking-wider">Coach Resources</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start text-left border-white/10 hover:bg-white/5">
                                📋 View Full League Schedule
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-left border-white/10 hover:bg-white/5">
                                📒 League Rulebook (PDF)
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
