import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-[#111] p-8 rounded-2xl border border-white/10 text-center">
                <h1 className="text-3xl font-black italic uppercase mb-4">Register</h1>
                <p className="text-gray-400 mb-8">Create your official player account.</p>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded text-sm mb-6">
                    Registration is currently closed while we update our payment system.
                    Please check back later or contact support.
                </div>

                <div className="space-y-4">
                    <Button disabled className="w-full py-6 bg-gray-800 text-gray-400 font-bold uppercase rounded cursor-not-allowed">
                        Registration Closed
                    </Button>

                    <Link href="/" className="block text-sm text-brand-primary hover:underline">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
