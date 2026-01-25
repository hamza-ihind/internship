import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import speakeasy from 'speakeasy';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { encrypt, decrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const { secret, token, action } = await req.json();
    const session = await getServerSession(authOptions);

    // Action: 'enable' - Enabling 2FA for the first time (requires session)
    // Action: 'verify' - Verifying during login (no session, secret is encrypted)
    // Action: 'disable' - Disabling 2FA (requires session)

    if (action === 'enable') {
      // User is enabling 2FA - requires active session
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1, // Allow 1 step tolerance
      });

      if (verified) {
        // Encrypt and save the secret to database
        const encryptedSecret = encrypt(secret);

        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            twoFactorSecret: encryptedSecret,
            isTwoFactorEnabled: true,
          },
        });

        return NextResponse.json({
          verified: true,
          message: '2FA enabled successfully',
        });
      }

      return NextResponse.json({
        verified: false,
        message: 'Invalid verification code',
      });
    }

    if (action === 'verify') {
      // User is verifying during login - no session yet
      // Secret comes from the database (encrypted)
      if (!secret || !token) {
        return NextResponse.json(
          { error: 'Missing secret or token' },
          { status: 400 },
        );
      }

      const decryptedSecret = decrypt(secret);

      const verified = speakeasy.totp.verify({
        secret: decryptedSecret,
        encoding: 'base32',
        token: token,
        window: 1,
      });

      return NextResponse.json({ verified });
    }

    if (action === 'disable') {
      // User is disabling 2FA - requires active session
      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Get the user's secret to verify
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { twoFactorSecret: true },
      });

      if (!user?.twoFactorSecret) {
        return NextResponse.json(
          { error: '2FA is not enabled' },
          { status: 400 },
        );
      }

      const decryptedSecret = decrypt(user.twoFactorSecret);

      const verified = speakeasy.totp.verify({
        secret: decryptedSecret,
        encoding: 'base32',
        token: token,
        window: 1,
      });

      if (verified) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            twoFactorSecret: null,
            isTwoFactorEnabled: false,
          },
        });

        return NextResponse.json({
          verified: true,
          message: '2FA disabled successfully',
        });
      }

      return NextResponse.json({
        verified: false,
        message: 'Invalid verification code',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error verifying 2FA:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 },
    );
  }
}
