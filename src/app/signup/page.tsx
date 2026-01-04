'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signupUser } from './actions';
import Link from 'next/link';

export default function SignupPage() {
    const [errorMessage, dispatch] = useFormState(signupUser, undefined);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-black">
            <form action={dispatch} className="flex flex-col gap-4 rounded-lg bg-white/5 p-10 border border-white/10 w-full max-w-md shadow-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white tracking-tighter italic">JOIN THE <span className="text-edg-red">FAM</span></h1>
                    <p className="text-white/50 text-xs uppercase tracking-widest">Create your Fan Account</p>
                </div>

                <div>
                    <label className="block text-xs font-bold text-white/50 mb-1 uppercase" htmlFor="name">Full Name</label>
                    <input
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-edg-red transition-colors"
                        id="name" name="name" placeholder="John Doe" required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-white/50 mb-1 uppercase" htmlFor="email">Email Address</label>
                    <input
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-edg-red transition-colors"
                        id="email" type="email" name="email" placeholder="john@example.com" required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-white/50 mb-1 uppercase" htmlFor="password">Password</label>
                    <input
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-edg-red transition-colors"
                        id="password" type="password" name="password" required minLength={6}
                    />
                </div>

                <div className="text-red-500 text-xs h-4 font-bold text-center">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>

                <SignupButton />

                <div className="mt-6 text-center text-xs text-white/30">
                    <p>Already have an account? <Link href="/login" className="text-white hover:text-edg-red underline transition-colors">Log In</Link></p>
                </div>
            </form>
        </div>
    );
}

function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <button aria-disabled={pending} className="bg-white text-black font-black py-4 rounded hover:bg-edg-red hover:text-white transition-all uppercase tracking-widest transform active:scale-95">
            {pending ? 'Creating Account...' : 'Create Account'}
        </button>
    );
}
