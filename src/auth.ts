import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

// Mock User Database
const users = [
    { id: '1', name: 'Admin User', email: 'admin@edg.com', password: '123', role: 'ADMIN' },
    { id: '2', name: 'Coach Carter', email: 'coach@edg.com', password: '123', role: 'COACH' },
    { id: '3', name: 'D. Wright', email: 'player@edg.com', password: '123', role: 'PLAYER' },
    { id: '4', name: 'Super Fan', email: 'fan@edg.com', password: '123', role: 'FAN' },
] as const;

export const config = {
    theme: {
        logo: "/edg-logo.jpg",
    },
    secret: "super_secure_secret_key_12345",
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string
                const password = credentials.password as string

                const user = users.find((u) => u.email === email && u.password === password)

                if (!user) {
                    return null
                }

                return { id: user.id, name: user.name, email: user.email, role: user.role }
            },
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
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
                session.user.role = token.role
            }
            return session
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
