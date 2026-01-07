import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const userRole = req.auth?.user?.role

    // Define protected routes and allowed roles
    // For now, let's just protect /admin as an example, since we don't have /coach pages yet
    const protectedRoutes = [
        { path: '/admin', roles: ['ADMIN'] },
        { path: '/coach', roles: ['ADMIN', 'COACH'] },
        { path: '/scorekeeper', roles: ['ADMIN', 'SCOREKEEPER'] },
    ]

    const routeConfig = protectedRoutes.find(r => nextUrl.pathname.startsWith(r.path));

    if (routeConfig) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', nextUrl))
        }
        if (!routeConfig.roles.includes(userRole as any)) {
            // Redirect to unauthorized or home if role doesn't match
            return NextResponse.redirect(new URL('/', nextUrl))
        }
    }

    return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
