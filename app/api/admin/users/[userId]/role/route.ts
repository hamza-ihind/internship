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
    const { role } = body;

    if (!['USER', 'ADMIN', 'MODERATOR'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role value' },
        { status: 400 },
      );
    }

    // Prevent admins from demoting themselves
    if (userId === session.user.id && role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You cannot change your own role' },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 },
    );
  }
}
