import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import CoachDashboard from "./CoachDashboard";

export default async function CoachPage() {
    const session = await auth();

    if (!session || (session.user?.role !== 'COACH' && session.user?.role !== 'ADMIN')) {
        redirect('/'); // Or /login if you prefer, but middleware handles most protection
    }

    // Fetch all teams and players for the Coach's view
    // In a real app, you might only fetch the team assigned to this coach.
    const teams = await prisma.team.findMany({
        include: {
            players: {
                orderBy: {
                    number: 'asc'
                }
            }
        },
        orderBy: {
            name: 'asc'
        }
    });

    return (
        <main className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black italic tracking-tighter text-white">COACH DASHBOARD</h1>
                    <p className="text-muted-foreground">Manage your roster, track attendance, and log scouting notes.</p>
                </div>

                <CoachDashboard teams={teams} />
            </div>
        </main>
    );
}
