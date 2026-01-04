'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function registerProspect(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;
    const height = formData.get('height') as string;
    const weight = formData.get('weight') as string;
    const position = formData.get('position') as string;
    const school = formData.get('school') as string;
    const hometown = formData.get('hometown') as string;
    const dob = formData.get('dob') as string;

    if (!firstName || !lastName || !email || !password || !position || !height || !weight) {
        return { success: false, message: "Missing required fields: Name, Email, Password, Position, Height, or Weight is missing." };
    }

    try {
        // Create User and Player in a transaction to ensure linkage
        await prisma.$transaction(async (tx) => {
            // Check for existing user
            const existingUser = await tx.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error("Email already registered. Please login.");
            }

            // 1. Create the Player Profile
            const player = await tx.player.create({
                data: {
                    name: `${firstName} ${lastName}`,
                    position: position,
                    height: height,
                    weight: weight,
                    isProspect: true,
                    email: email,
                    phone: phone,
                    school: school,
                    hometown: hometown,
                    dob: dob,
                    // Default stats
                    ppg: 0, rpg: 0, apg: 0, spg: 0, bpg: 0,
                    fgPct: 0, threePtPct: 0, ftPct: 0, tov: 0,
                    ovr: 60,
                    archetype: 'Prospect'
                }
            });

            // 2. Create the User Account linked to the Player
            await tx.user.create({
                data: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    password: password, // Note: In production, hash this password!
                    role: 'PLAYER',
                    playerId: player.id
                }
            });
        });

        revalidatePath('/scouting-report');
        revalidatePath('/draft-board');
        return { success: true, message: 'Registration successful!' };
    } catch (e: any) {
        console.error("Failed to register prospect:", e);
        // Clean up error message
        const msg = e.message.replace('Error: ', '');
        return { success: false, message: msg || 'Registration failed.' };
    }
}
