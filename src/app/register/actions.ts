'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function registerProspect(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const height = formData.get('height') as string;
    const weight = formData.get('weight') as string;
    const position = formData.get('position') as string;
    const school = formData.get('school') as string;
    const hometown = formData.get('hometown') as string;
    const dob = formData.get('dob') as string;
    // session is not stored in DB, strictly informational for now

    if (!firstName || !lastName || !email) {
        throw new Error("Missing required fields");
    }

    try {
        await prisma.player.create({
            data: {
                name: `${firstName} ${lastName}`,
                position: position,
                height: height,
                weight: weight,
                teamId: null, // No team yet
                isProspect: true,
                email: email,
                phone: phone,
                school: school,
                hometown: hometown,
                dob: dob,
                // Default stats for a rookie/prospect
                ppg: 0,
                rpg: 0,
                apg: 0,
                spg: 0,
                bpg: 0,
                fgPct: 0,
                threePtPct: 0,
                ftPct: 0,
                tov: 0,
                ovr: 60, // Starting OVR for prospects
                archetype: 'Prospect'
            }
        });

        revalidatePath('/scouting-report');
        revalidatePath('/draft-board');
    } catch (e) {
        console.error("Failed to register prospect:", e);
        // In a real app, return error state.
        // For now we will allow it to fail silently or throw.
        throw new Error("Registration Failed");
    }

    // Redirect to the scouting report or a success page
    redirect('/scouting-report');
}
