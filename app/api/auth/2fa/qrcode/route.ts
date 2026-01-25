import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = speakeasy.generateSecret({
      name: `InternshipPlatform (${session.user.email})`,
      issuer: 'InternshipPlatform',
    });

    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url!);

    return NextResponse.json({
      qrCode: qrCodeDataUrl,
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url,
    });
  } catch (error) {
    console.error('Error generating 2FA QR code:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 },
    );
  }
}
