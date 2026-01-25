import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role as any;
        token.image = user.image;
        token.onboardingCompleted = user.onboardingCompleted;
      }

      // Handle session update (when user updates profile)
      if (trigger === 'update' && session) {
        if (session.image !== undefined) {
          token.image = session.image;
        }
        if (session.name !== undefined) {
          token.name = session.name;
        }
        if (session.email !== undefined) {
          token.email = session.email;
        }
        if (session.onboardingCompleted !== undefined) {
          token.onboardingCompleted = session.onboardingCompleted;
        }
      }

      // Refresh onboarding status from database on each request
      if (token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { onboardingCompleted: true },
        });
        if (user) {
          token.onboardingCompleted = user.onboardingCompleted;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as any;

        // Fetch fresh user data from database to ensure we have the latest data
        const user = await prisma.user.findUnique({
          where: { id: token.sub! },
          select: {
            image: true,
            name: true,
            email: true,
            role: true,
            onboardingCompleted: true,
          },
        });

        if (user) {
          session.user.email = user.email;
          session.user.name = user.name as any;
          session.user.image = user.image as any;
          session.user.role = user.role;
          session.user.onboardingCompleted = user.onboardingCompleted;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
  },
};
