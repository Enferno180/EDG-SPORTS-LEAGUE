'use client';

import { useState } from 'react';
import { processGameUpload } from './actions';
import { Button } from '@/components/ui/button';

export default function GameUploadPage() {
    const [jsonInput, setJsonInput] = useState('');
    const [result, setResult] = useState<{ success: boolean; message: string; errors?: string[] } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = async () => {
        setIsProcessing(true);
        setResult(null);
        try {
            const res = await processGameUpload(jsonInput);
            setResult(res);
        } catch (e) {
            setResult({ success: false, message: "An unexpected error occurred." });
        }
        setIsProcessing(false);
    };

    return (
        <div className="container mx-auto px-5 py-10">
            <h1 className="text-3xl font-bold text-white mb-6 uppercase italic">Upload Game Results</h1>

            <div className="bg-gray-900 border border-white/10 p-6 rounded-lg mb-8">
                <p className="text-gray-400 mb-4 text-sm">
                    Paste the JSON array of player stats below. This will automatically update player averages and increment their &quot;Games Played&quot; count.
                </p>
                <p className="text-xs text-gray-500 font-mono mb-4 bg-black/50 p-2 rounded">
                    Format: [{"{"}&quot;playerName&quot;: &quot;John Doe&quot;, &quot;points&quot;: 20, &quot;rebounds&quot;: 5, &quot;assists&quot;: 2, &quot;steals&quot;: 1, &quot;blocks&quot;: 0, &quot;turnovers&quot;: 3, &quot;fgm&quot;: 8, &quot;fga&quot;: 15 ...{"}"}, ...]
                </p>

                <textarea
                    className="w-full h-64 bg-black/50 border border-white/20 rounded p-4 text-white font-mono text-xs focus:border-edg-red outline-none mb-4"
                    placeholder="Paste JSON here..."
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                />

                <Button
                    onClick={handleUpload}
                    disabled={isProcessing || !jsonInput}
                    className="bg-edg-red hover:bg-red-700 text-white font-bold py-3 px-6 uppercase tracking-widest"
                >
                    {isProcessing ? 'Processing Stats...' : 'Process Game Data'}
                </Button>
            </div>

            {result && (
                <div className={`p-6 rounded border ${result.success ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
                    <h3 className={`font-bold text-lg mb-2 ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                        {result.success ? 'Upload Complete' : 'Upload Failed'}
                    </h3>
                    <p className="text-white text-sm mb-4">{result.message}</p>

                    {result.errors && result.errors.length > 0 && (
                        <div className="bg-black/30 p-4 rounded max-h-40 overflow-y-auto">
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Warnings / Errors:</h4>
                            <ul className="list-disc list-inside text-xs text-red-300 space-y-1">
                                {result.errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
