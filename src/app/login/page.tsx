'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/app/lib/actions'

export default function Page() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (
        <div className="flex h-screen w-full items-center justify-center bg-black">
            <form action={dispatch} className="flex flex-col gap-4 rounded-lg bg-white/5 p-10 border border-white/10 w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-4">Sign In</h1>

                <div>
                    <label className="block text-sm font-bold text-white/50 mb-1" htmlFor="email">Email</label>
                    <input
                        className="w-full bg-black/50 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-red-500"
                        id="email" type="email" name="email" placeholder="user@edg.com" required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-white/50 mb-1" htmlFor="password">Password</label>
                    <input
                        className="w-full bg-black/50 border border-white/10 rounded p-2 text-white focus:outline-none focus:border-red-500"
                        id="password" type="password" name="password" required minLength={3}
                    />
                </div>

                <div className="text-red-500 text-sm h-4">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>

                <LoginButton />

                <div className="mt-4 text-xs text-white/30">
                    <p>Test Credentials:</p>
                    <p>Admin: admin@edg.com / 123</p>
                    <p>Player: player@edg.com / 123</p>
                </div>
            </form>
            <div className="absolute bottom-10 text-white/30 text-xs">
                Don't have an account? <a href="/signup" className="text-white hover:text-red-500 underline">Sign Up</a>
            </div>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button aria-disabled={pending} className="bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition-colors uppercase tracking-widest">
            {pending ? 'Checking Rock...' : 'Check Rock'}
        </button>
    )
}
