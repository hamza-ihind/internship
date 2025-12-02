import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user with profile and related data
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
    });

    const experiences = await db.experience.findMany({
      where: { userId: session.user.id },
      orderBy: { startDate: 'desc' },
    });

    const projects = await db.project.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    const certifications = await db.certification.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: 'desc' },
    });

    return NextResponse.json({
      user,
      profile,
      experiences,
      projects,
      certifications,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      city,
      country,
      dateOfBirth,
      photoUrl,
      university,
      faculty,
      degree,
      level,
      graduationYear,
      gpa,
      transcriptUrl,
      skills,
      languages,
      cvUrl,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      websiteUrl,
      preferredLocations,
      workMode,
      earliestStartDate,
      weeklyAvailabilityHours,
      profilePublic,
      marketingConsent,
      experiences,
      projects,
      certifications,
    } = body;

    // Update user basic info
    await db.user.update({
      where: { id: session.user.id },
      data: {
        name,
        image: photoUrl,
      },
    });

    // Upsert profile
    await db.profile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        phone,
        city,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        photoUrl,
        university,
        faculty,
        degree,
        level,
        graduationYear,
        gpa: gpa || null,
        transcriptUrl,
        skills: skills || [],
        languages: languages || [],
        cvUrl,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
        websiteUrl,
        preferredLocations: preferredLocations || [],
        workMode,
        earliestStartDate: earliestStartDate
          ? new Date(earliestStartDate)
          : null,
        weeklyAvailabilityHours,
        profilePublic,
        marketingConsent,
      },
      update: {
        phone,
        city,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        photoUrl,
        university,
        faculty,
        degree,
        level,
        graduationYear,
        gpa: gpa || null,
        transcriptUrl,
        skills: skills || [],
        languages: languages || [],
        cvUrl,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
        websiteUrl,
        preferredLocations: preferredLocations || [],
        workMode,
        earliestStartDate: earliestStartDate
          ? new Date(earliestStartDate)
          : null,
        weeklyAvailabilityHours,
        profilePublic,
        marketingConsent,
      },
    });

    // Handle experiences
    if (experiences && Array.isArray(experiences)) {
      // Delete existing experiences
      await db.experience.deleteMany({
        where: { userId: session.user.id },
      });

      // Create new experiences
      for (const exp of experiences) {
        if (exp.company && exp.title) {
          await db.experience.create({
            data: {
              userId: session.user.id,
              company: exp.company,
              title: exp.title,
              startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
              endDate:
                exp.endDate && !exp.isCurrent ? new Date(exp.endDate) : null,
              description: exp.description || null,
              isCurrent: exp.isCurrent || false,
            },
          });
        }
      }
    }

    // Handle projects
    if (projects && Array.isArray(projects)) {
      await db.project.deleteMany({
        where: { userId: session.user.id },
      });

      for (const proj of projects) {
        if (proj.title) {
          await db.project.create({
            data: {
              userId: session.user.id,
              title: proj.title,
              description: proj.description || null,
              techTags: proj.techTags || [],
              linkUrl: proj.linkUrl || null,
              startDate: proj.startDate ? new Date(proj.startDate) : null,
              endDate: proj.endDate ? new Date(proj.endDate) : null,
              isFeatured: proj.isFeatured || false,
            },
          });
        }
      }
    }

    // Handle certifications
    if (certifications && Array.isArray(certifications)) {
      await db.certification.deleteMany({
        where: { userId: session.user.id },
      });

      for (const cert of certifications) {
        if (cert.name && cert.issuer) {
          await db.certification.create({
            data: {
              userId: session.user.id,
              name: cert.name,
              issuer: cert.issuer,
              issuedAt: cert.issueDate ? new Date(cert.issueDate) : new Date(),
              expiresAt: cert.expiryDate ? new Date(cert.expiryDate) : null,
              credentialUrl: cert.credentialUrl || null,
            },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
