'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { registerProspect } from './actions';
import { Button } from '@/components/ui/button';
import CheckoutForm from "@/components/CheckoutForm";

// Mock Stripe (since we are doing server action for now)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function RegisterPage() {
    const [step, setStep] = useState<'info' | 'payment'>('info');
    const [clientSecret, setClientSecret] = useState("");
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        height: '', weight: '', position: '', school: '', hometown: '', dob: '',
        session: 'Session 1: July 10'
    });

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "registration-fee" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'night' as const,
        variables: {
            colorPrimary: '#ff3333',
            colorBackground: '#1a1a1a',
            colorText: '#ffffff',
            colorDanger: '#df1b41',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '4px',
        },
    };

    const options = { clientSecret, appearance };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('payment');
    };

    return (
        <section className="container mx-auto px-5 py-12 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <h1 className="section-title mb-2 text-center">SEASON REGISTRATION</h1>
                <p className="text-muted-foreground text-center mb-8">
                    {step === 'info' ? 'Step 1: Player Bio' : 'Step 2: Secure Payment'}
                </p>

                <div className="bg-card border border-white/10 p-8 rounded-lg shadow-2xl">

                    {/* STEP 1: PLAYER INFO */}
                    {step === 'info' && (
                        <form onSubmit={nextStep} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">First Name</label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Last Name</label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Active Phone #</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="(555) 123-4567" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Height</label>
                                    <input required name="height" value={formData.height} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="6'2&quot;" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Weight (lbs)</label>
                                    <input required name="weight" value={formData.weight} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="195" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Date of Birth</label>
                                    <input required type="date" name="dob" value={formData.dob} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Position(s)</label>
                                    <input required name="position" value={formData.position} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="PG / SG" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">School Attended</label>
                                    <input required name="school" value={formData.school} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="High School / College" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Hometown</label>
                                    <input required name="hometown" value={formData.hometown} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:border-edg-red outline-none" placeholder="Philadelphia, PA" />
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-white/10">
                                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Select Combine Session</label>
                                <select name="session" value={formData.session} onChange={handleInput} className="w-full bg-black/50 border border-white/20 rounded p-2 text-white">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <option key={i} value={`Session ${i + 1}`}>Session {i + 1}: July {10 + i} (Open: {Math.max(0, 40 - i * 2)} Slots)</option>
                                    ))}
                                </select>
                                <p className="text-xs text-edg-red mt-1">Limited to 40 players per session.</p>
                            </div>

                            <button type="submit" className="w-full bg-edg-red hover:bg-red-700 text-white font-bold py-4 rounded uppercase tracking-widest mt-6 transition-transform hover:scale-[1.01]">
                                Continue to Payment
                            </button>
                        </form>
                    )}

                    {/* STEP 2: PAYMENT */}
                    {step === 'payment' && (
                        <div className="space-y-6 fade-in-up">

                            {/* Summary Recap */}
                            <div className="bg-white/5 p-4 rounded border border-white/10 text-sm space-y-2">
                                <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                                    <span className="font-bold text-white uppercase tracking-wider">Player Profile</span>
                                    <button onClick={() => setStep('info')} className="text-edg-red hover:underline text-xs uppercase font-bold">Edit</button>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-300">
                                    <div><span className="text-gray-500 text-xs block">Name</span>{formData.firstName} {formData.lastName}</div>
                                    <div><span className="text-gray-500 text-xs block">DOB</span>{formData.dob}</div>
                                    <div><span className="text-gray-500 text-xs block">Hometown</span>{formData.hometown}</div>
                                    <div><span className="text-gray-500 text-xs block">School</span>{formData.school}</div>
                                    <div><span className="text-gray-500 text-xs block">Stats</span>{formData.height} / {formData.weight}lbs</div>
                                    <div><span className="text-gray-500 text-xs block">Position</span>{formData.position}</div>
                                    <div className="col-span-2"><span className="text-gray-500 text-xs block">Contact</span>{formData.email} | {formData.phone}</div>
                                    <div className="col-span-2 pt-2 border-t border-white/10 mt-1"><span className="text-edg-red font-bold text-xs block">Selected Session</span>{formData.session}</div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="text-gray-400">Combine & Tryout Fee</span>
                                    <span className="font-bold text-white">$75.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mb-4">
                                    <span className="text-gray-400">Processing</span>
                                    <span className="font-bold text-white">$0.00</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-800 mb-6">
                                    <span className="font-bold text-white">Total Due</span>
                                    <span className="font-bold text-edg-red text-xl">$75.00</span>
                                </div>

                                {clientSecret ? (
                                    <div className="relative">
                                        <div className="opacity-50 pointer-events-none filter blur-sm">
                                            <Elements options={options} stripe={stripePromise}>
                                                <CheckoutForm />
                                            </Elements>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <form action={async () => {
                                                const data = new FormData();
                                                Object.keys(formData).forEach(key => data.append(key, formData[key as keyof typeof formData]));
                                                await registerProspect(data);
                                            }}>
                                                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-xl shadow-xl uppercase tracking-widest scale-110">
                                                    Confirm Registration (Demo)
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center h-48">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
