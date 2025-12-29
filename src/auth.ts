import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"

export const config = {
    ...authConfig,
    adapter: PrismaAdapter(prisma) as any,
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

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({
                    where: { email }
                });

                if (!user) return null;

                // Simple password check for prototype (In production: use bcrypt/argon2)
                if (user.password !== password) return null;

                return { id: user.id, name: user.name, email: user.email, role: user.role }
            },
        }),
    ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
