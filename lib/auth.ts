import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        // In a real app, store hashed passwords; for now assume a demo flow
        // Compare against a hashed password stored in a separate table/field if present
        const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
        const hasPassword = (profile as any)?.passwordHash as string | undefined;
        if (!hasPassword) return { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan } as any;
        const ok = await compare(password, hasPassword);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan } as any;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? "USER";
        token.plan = (user as any).plan ?? "FREE";
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = (token as any).role;
      (session.user as any).plan = (token as any).plan;
      return session;
    },
  },
};