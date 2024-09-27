import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { User } from "next-auth";  // Import the User type from next-auth

const db = new PrismaClient();

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    // Guest Provider using CredentialsProvider
    CredentialsProvider({
      name: "Guest",
      credentials: {},
      async authorize(credentials: any): Promise<User | null> {
        // Return guest user with a structure that satisfies the User type
        return {
          id: "guest",         // Add an ID
          name: "Guest User",   // Name of the guest user
          email: "guest@example.com",  // Email of the guest user
        };
      },
    }),
  ],

  secret: process.env.JWT_SECRET || "secret",

  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      if (user.email === "guest@example.com") {
        return true;
      }

      if (!user.email) {
        throw new Error("Email is required for sign-in");
      }

      const existingUser = await db.user.findFirst({
        where: { email: user.email },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email,
            name: user.name || "User",
            auth_type: account.provider || "Credentials",
            image: user.image || "",
            password: account.provider === "credentials" ? "Credentials" : "Github",
          },
        });
      } else {
        await db.user.update({
          where: { email: user.email },
          data: {
            name: user.name || existingUser.name,
            image: user.image || existingUser.image,
          },
        });
      }

      return true;
    },

    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};