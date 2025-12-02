import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET single internship (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const internship = await prisma.internship.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
          orderBy: {
            submittedAt: 'desc',
          },
        },
      },
    });

    if (!internship) {
      return NextResponse.json(
        { error: 'Internship not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ internship });
  } catch (error) {
    console.error('Error fetching internship:', error);
    return NextResponse.json(
      { error: 'Failed to fetch internship' },
      { status: 500 }
    );
  }
}

// PUT update internship (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const body = await request.json();

    const {
      title,
      company,
      status,
      contactEmail,
      contactPhone,
      city,
      country,
      address,
      mode,
      remote,
      datePosted,
      validThrough,
      startDate,
      durationMonths,
      hoursPerWeek,
      internshipType,
      employmentType,
      isPaid,
      salary,
      salaryUnit,
      requiredLevel,
      targetSchools,
      allowedFields,
      requiredLanguages,
      shortDescription,
      fullDescription,
      responsibilities,
      qualifications,
      benefits,
      applyMethod,
      externalUrl,
      requiredDocs,
      requires_cv,
      autoClose,
      maxApplications,
      applicationDeadline,
      visibility,
      tags,
      adminNotes,
    } = body;

    // Validate required fields
    if (
      !title ||
      !company ||
      !contactEmail ||
      !contactPhone ||
      !city ||
      !country ||
      !mode ||
      !internshipType ||
      !employmentType ||
      !requiredLevel ||
      !shortDescription ||
      !fullDescription
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const internship = await prisma.internship.update({
      where: { id },
      data: {
        title,
        company,
        status,
        contactEmail,
        contactPhone,
        city,
        country,
        address,
        mode,
        remote,
        datePosted: datePosted ? new Date(datePosted) : undefined,
        validThrough: validThrough ? new Date(validThrough) : null,
        startDate: startDate ? new Date(startDate) : null,
        durationMonths,
        hoursPerWeek,
        internshipType,
        employmentType,
        isPaid,
        salary,
        salaryUnit,
        requiredLevel,
        targetSchools: targetSchools || [],
        allowedFields: allowedFields || [],
        requiredLanguages: requiredLanguages || [],
        shortDescription,
        fullDescription,
        responsibilities: responsibilities || [],
        qualifications: qualifications || [],
        benefits: benefits || [],
        applyMethod: applyMethod || 'platform',
        externalUrl,
        requiredDocs: requiredDocs || ['CV'],
        requires_cv,
        autoClose: autoClose || false,
        maxApplications,
        applicationDeadline: applicationDeadline
          ? new Date(applicationDeadline)
          : null,
        visibility: visibility || 'public',
        tags: tags || [],
        adminNotes,
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json({ internship });
  } catch (error) {
    console.error('Error updating internship:', error);
    return NextResponse.json(
      { error: 'Failed to update internship' },
      { status: 500 }
    );
  }
}

// DELETE internship (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if internship exists
    const internship = await prisma.internship.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!internship) {
      return NextResponse.json(
        { error: 'Internship not found' },
        { status: 404 }
      );
    }

    // Delete all related applications first
    await prisma.application.deleteMany({
      where: { internshipId: id },
    });

    // Delete the internship
    await prisma.internship.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Internship and related applications deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting internship:', error);
    return NextResponse.json(
      { error: 'Failed to delete internship' },
      { status: 500 }
    );
  }
}
