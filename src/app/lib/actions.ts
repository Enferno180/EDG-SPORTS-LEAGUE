
'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import prisma from '@/lib/prisma'

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const email = formData.get('email') as string;

        // 1. Determine Redirect URL based on Role (Pre-check)
        // We do this optimistically. If auth fails, the redirect won't happen anyway.
        let redirectTo = '/';
        if (email) {
            const user = await prisma.user.findUnique({
                where: { email },
                select: { role: true }
            });

            if (user?.role === 'SCOREKEEPER') redirectTo = '/scorekeeper';
            else if (user?.role === 'ADMIN') redirectTo = '/admin';
            else if (user?.role === 'COACH') redirectTo = '/coach';
        }

        // 2. Sign In with dynamic redirect
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}
