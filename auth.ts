import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        const { email, password } = credentials as { email: string; password: string };
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) {
            throw new Error("No user found");
          }
          if (!user.password) {
            throw new Error("User password is null");
          }
          const valid = await compare(password, user.password);
          if (!valid) {
            throw new Error("Incorrect password");
          }
          return { id: user.id, email: user.email };
        } catch (error) {
          console.error(error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",

});
