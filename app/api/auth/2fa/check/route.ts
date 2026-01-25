import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        hashedPassword: true,
        isTwoFactorEnabled: true,
        twoFactorSecret: true,
        isBlocked: true,
      },
    });

    if (!user || !user.hashedPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    if (user.isBlocked) {
      return NextResponse.json(
        { error: 'Your account has been blocked' },
        { status: 403 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // If 2FA is enabled, return the encrypted secret for verification
    if (user.isTwoFactorEnabled && user.twoFactorSecret) {
      return NextResponse.json({
        requiresTwoFactor: true,
        twoFactorSecret: user.twoFactorSecret, // This is already encrypted
        userId: user.id,
      });
    }

    // No 2FA, proceed with normal login
    return NextResponse.json({
      requiresTwoFactor: false,
    });
  } catch (error) {
    console.error('Error checking 2FA status:', error);
    return NextResponse.json(
      { error: 'Failed to check credentials' },
      { status: 500 },
    );
  }
}
