import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      image,
      phone,
      city,
      country,
      dateOfBirth,
      university,
      faculty,
      degree,
      level,
      graduationYear,
      skills,
      preferredLocations,
      workMode,
      linkedinUrl,
      githubUrl,
    } = body;

    // Validate required fields
    if (!university || !faculty || !degree || !level) {
      return NextResponse.json(
        {
          error: 'Missing required fields: university, faculty, degree, level',
        },
        { status: 400 }
      );
    }

    // Update user's onboarding status and profile image
    await db.user.update({
      where: { id: session.user.id },
      data: {
        onboardingCompleted: true,
        image: image || undefined,
      },
    });

    // Create or update profile
    await db.profile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        phone,
        city,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        university,
        faculty,
        degree,
        level,
        graduationYear,
        skills: skills || [],
        preferredLocations: preferredLocations || [],
        workMode,
        linkedinUrl,
        githubUrl,
      },
      update: {
        phone,
        city,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        university,
        faculty,
        degree,
        level,
        graduationYear,
        skills: skills || [],
        preferredLocations: preferredLocations || [],
        workMode,
        linkedinUrl,
        githubUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
    });
  } catch (error) {
    console.error('Onboarding API error:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({
      onboardingCompleted: user?.onboardingCompleted ?? false,
    });
  } catch (error) {
    console.error('Onboarding status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check onboarding status' },
      { status: 500 }
    );
  }
}
