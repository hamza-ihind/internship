import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET all internships (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const internships = await prisma.internship.findMany({
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ internships });
  } catch (error) {
    console.error('Error fetching internships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch internships' },
      { status: 500 }
    );
  }
}

// POST create new internship (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    const internship = await prisma.internship.create({
      data: {
        title,
        company,
        status: status || 'DRAFT',
        contactEmail,
        contactPhone,
        city,
        country,
        address,
        mode,
        remote: remote || false,
        datePosted: datePosted ? new Date(datePosted) : new Date(),
        validThrough: validThrough ? new Date(validThrough) : null,
        startDate: startDate ? new Date(startDate) : null,
        durationMonths,
        hoursPerWeek,
        internshipType,
        employmentType,
        isPaid: isPaid || false,
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
        requires_cv: requires_cv !== undefined ? requires_cv : true,
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

    return NextResponse.json({ internship }, { status: 201 });
  } catch (error) {
    console.error('Error creating internship:', error);
    return NextResponse.json(
      { error: 'Failed to create internship' },
      { status: 500 }
    );
  }
}
