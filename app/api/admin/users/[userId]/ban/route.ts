import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await params;
    const body = await request.json();
    const { isBlocked } = body;

    if (typeof isBlocked !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid isBlocked value' },
        { status: 400 },
      );
    }

    // Prevent admins from banning themselves
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'You cannot ban yourself' },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isBlocked },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user ban status:', error);
    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 },
    );
  }
}
