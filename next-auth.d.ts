import { Role } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: Role;
  onboardingCompleted?: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: Role;
      image?: string;
      onboardingCompleted?: boolean;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: Role;
    image?: string;
    onboardingCompleted?: boolean;
  }
}

import { JWT } from '@auth/core/jwt';

declare module '@auth/core/jwt' {
  interface JWT {
    role?: Role;
    onboardingCompleted?: boolean;
  }
}
