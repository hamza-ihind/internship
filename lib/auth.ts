import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.image = user.image;
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
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;

        // Fetch fresh user data from database to ensure we have the latest image
        const user = await prisma.user.findUnique({
          where: { id: token.sub! },
          select: { image: true, name: true, email: true },
        });

        if (user) {
          session.user.email = user.email;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/connexion',
    signOut: '/auth/connexion',
  },
};
