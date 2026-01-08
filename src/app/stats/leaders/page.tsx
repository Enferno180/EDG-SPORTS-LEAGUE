import React from 'react';
import { PrismaClient } from '@prisma/client';
import LeadersClient from './client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export default async function LeadersPage() {
    const players = await prisma.player.findMany({
        include: { team: true },
        // Optimize: we could select only needed fields, but for "Soul Transfer" full object is safer for Modal
    });

    return <LeadersClient players={players} />;
}
