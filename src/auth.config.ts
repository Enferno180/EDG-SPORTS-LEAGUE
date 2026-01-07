import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
    theme: {
        logo: "/edg-logo.jpg",
    },
    session: { strategy: "jwt" },
    secret: "super_secure_secret_key_12345", // In production, use process.env.AUTH_SECRET
    pages: {
        signIn: '/login',
    },
    providers: [
        // Needed for type compatibility, but the real logic is in auth.ts
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                return null;
            },
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname.startsWith("/admin")) {
                return auth?.user?.role === "ADMIN"
            }
            if (pathname.startsWith("/coach")) {
                return auth?.user?.role === "ADMIN" || auth?.user?.role === "COACH"
            }
            if (pathname.startsWith("/scorekeeper")) {
                return auth?.user?.role === "ADMIN" || auth?.user?.role === "SCOREKEEPER"
            }
            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as any
            }
            return session
        },
    },
} satisfies NextAuthConfig
