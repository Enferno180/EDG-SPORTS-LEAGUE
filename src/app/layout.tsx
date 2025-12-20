
import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Ticker } from '@/components/Ticker'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'EDG SPORTS LEAGUE',
    description: 'Elevating the Game. Empowering the Future.',
}

import { Providers } from './providers'

// ... existing code ...

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            {/* ... head ... */}
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,400&family=Roboto+Slab:wght@400;700&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
                <script src="https://unpkg.com/@phosphor-icons/web" async></script>
            </head>
            <body className="bg-background text-foreground min-h-screen flex flex-col font-body">
                <Providers>
                    <Ticker />
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                </Providers>
                <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-sm">
                    {/* ... footer content ... */}
                    <div className="container mx-auto px-5">
                        {/* ... existing footer content ... */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                            {/* Brand Column */}
                            <div className="col-span-2 lg:col-span-2">
                                <Link href="/" className="inline-block mb-4">
                                    <Image
                                        src="/edg-logo.jpg"
                                        alt="EDG Sports League"
                                        width={150}
                                        height={50}
                                        className="h-12 w-auto object-contain"
                                    />
                                </Link>
                                <p className="text-muted-foreground/80 max-w-sm mb-6">
                                    A professional basketball ecosystem bridging the gap between streetball and the pros.
                                    Elevating the game in Philadelphia.
                                </p>
                                <div className="flex gap-4">
                                    {/* Social placeholders */}
                                    <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary hover:text-black transition-colors flex items-center justify-center cursor-pointer">IG</div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary hover:text-black transition-colors flex items-center justify-center cursor-pointer">X</div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary hover:text-black transition-colors flex items-center justify-center cursor-pointer">YT</div>
                                </div>
                            </div>

                            {/* League Links */}
                            <div className="col-span-1">
                                <h4 className="font-head font-bold text-white mb-4 tracking-wider">THE LEAGUE</h4>
                                <ul className="space-y-2">
                                    <li><Link href="/stats/standings" className="text-muted-foreground hover:text-primary transition-colors">Standings</Link></li>
                                    <li><Link href="/schedule" className="text-muted-foreground hover:text-primary transition-colors">Schedule</Link></li>
                                    <li><Link href="/stats/players" className="text-muted-foreground hover:text-primary transition-colors">Player Stats</Link></li>
                                    <li><Link href="/stats/teams" className="text-muted-foreground hover:text-primary transition-colors">Team Stats</Link></li>
                                    <li><Link href="/stats/leaders" className="text-muted-foreground hover:text-primary transition-colors">League Leaders</Link></li>
                                    <li><Link href="/stats/injuries" className="text-muted-foreground hover:text-primary transition-colors">Injury Report</Link></li>
                                </ul>
                            </div>

                            {/* Company Links */}
                            <div className="col-span-1">
                                <h4 className="font-head font-bold text-white mb-4 tracking-wider">EDG NETWORK</h4>
                                <ul className="space-y-2">
                                    <li><Link href="/media" className="text-muted-foreground hover:text-primary transition-colors">Media & News</Link></li>
                                    <li><Link href="/fanzone" className="text-muted-foreground hover:text-primary transition-colors">Fan Zone</Link></li>
                                    <li><Link href="/tryouts" className="text-muted-foreground hover:text-primary transition-colors">Join the League</Link></li>
                                    <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                                    <li><Link href="/partners" className="text-muted-foreground hover:text-primary transition-colors">Partners</Link></li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div className="col-span-1">
                                <h4 className="font-head font-bold text-white mb-4 tracking-wider">SUPPORT</h4>
                                <ul className="space-y-2">
                                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
                            <div>&copy; 2025 EDG Sports League. All rights reserved.</div>
                            <div className="mt-2 md:mt-0">Philadelphia, PA</div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}
