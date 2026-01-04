'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function signupUser(prevState: string | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string; // Prototype only

    if (!name || !email || !password) {
        return "Complete all fields.";
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return "Email already taken.";

        await prisma.user.create({
            data: {
                name,
                email,
                password, // Storing plain text for prototype velocity as requested.
                role: 'USER', // Default role
            }
        });

    } catch (e) {
        return "Failed to create account.";
    }

    // Redirect to login on success
    redirect('/login?success=true');
}
