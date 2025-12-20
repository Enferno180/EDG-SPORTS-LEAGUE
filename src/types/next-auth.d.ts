import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: 'ADMIN' | 'COACH' | 'PLAYER' | 'FAN'
        } & DefaultSession["user"]
    }

    interface User {
        role: 'ADMIN' | 'COACH' | 'PLAYER' | 'FAN'
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: 'ADMIN' | 'COACH' | 'PLAYER' | 'FAN'
    }
}
