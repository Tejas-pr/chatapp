import { prismaClient } from "@repo/db/client";
import { betterAuth, jwt } from 'better-auth'
export { fromNodeHeaders, toNodeHandler } from 'better-auth/node'
import { nextCookies } from 'better-auth/next-js'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const auth = betterAuth({

  database: prismaAdapter(prismaClient, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    nextCookies()
  ],
})