import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const internships = await prisma.internship.findMany({
      where: {
        status: 'PUBLISHED',
        visibility: 'public',
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        company: true,
        city: true,
        country: true,
        mode: true,
        remote: true,
        startDate: true,
        durationMonths: true,
        employmentType: true,
        isPaid: true,
        salary: true,
        salaryUnit: true,
        shortDescription: true,
        tags: true,
        validThrough: true,
        createdAt: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    return NextResponse.json({ internships });
  } catch (error) {
    console.error('Error fetching public internships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch internships' },
      { status: 500 },
    );
  }
}
