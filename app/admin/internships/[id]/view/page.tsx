import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Edit,
  Copy,
  Archive,
  Eye,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Mail,
  Phone,
  ExternalLink,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InternshipDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/login');
  }

  const internship = await prisma.internship.findUnique({
    where: { id },
    include: {
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
      _count: {
        select: { applications: true },
      },
    },
  });

  if (!internship) {
    notFound();
  }

  // Calculate analytics
  const totalApplications = internship.applications.length;
  const pendingApplications = internship.applications.filter(
    (app) => app.status === 'PENDING'
  ).length;
  const acceptedApplications = internship.applications.filter(
    (app) => app.status === 'ACCEPTED'
  ).length;
  const rejectedApplications = internship.applications.filter(
    (app) => app.status === 'REJECTED'
  ).length;

  // Calculate conversion rate
  const conversionRate =
    totalApplications > 0
      ? ((acceptedApplications / totalApplications) * 100).toFixed(1)
      : '0';

  // Days since posted
  const daysSincePosted = internship.datePosted
    ? Math.floor(
        (Date.now() - new Date(internship.datePosted).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  // Status colors
  const statusColors = {
    DRAFT: 'bg-gray-500',
    PUBLISHED: 'bg-green-500',
    CLOSED: 'bg-red-500',
    ARCHIVED: 'bg-gray-400',
  };

  const applicationStatusColors = {
    PENDING: 'bg-yellow-500',
    ACCEPTED: 'bg-green-500',
    REJECTED: 'bg-red-500',
    WITHDRAWN: 'bg-gray-500',
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/internships">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{internship.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-muted-foreground">{internship.company}</p>
              <Badge className={statusColors[internship.status]}>
                {internship.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/internships/${internship.id}`} target="_blank">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View as Student
            </Button>
          </Link>
          <Link href={`/admin/internships/${internship.id}`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                {internship.status === 'ARCHIVED' ? 'Unarchive' : 'Archive'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{internship.status}</div>
            <p className="text-xs text-muted-foreground">
              {internship.isPaid ? 'Paid Position' : 'Unpaid Position'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {pendingApplications} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {acceptedApplications} accepted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Days Active</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysSincePosted}</div>
            <p className="text-xs text-muted-foreground">
              Since {internship.datePosted?.toLocaleDateString() || 'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Internship Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Information */}
          <Card>
            <CardHeader>
              <CardTitle>Internship Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {internship.city}, {internship.country}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline">{internship.mode}</Badge>
                      {internship.remote && (
                        <Badge variant="outline">Remote Available</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Duration & Schedule</p>
                    {internship.durationMonths && (
                      <p className="text-sm text-muted-foreground">
                        {internship.durationMonths} months
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {internship.internshipType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Compensation</p>
                    <p className="text-sm text-muted-foreground">
                      {internship.isPaid ? 'Paid' : 'Unpaid'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {internship.employmentType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">
                      {internship.startDate
                        ? new Date(internship.startDate).toLocaleDateString()
                        : 'Flexible'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">
                    {internship.contactEmail}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {internship.contactPhone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Overview</h4>
                <p className="text-sm text-muted-foreground">
                  {internship.shortDescription}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Full Description</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {internship.fullDescription}
                </div>
              </div>

              {internship.responsibilities.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {internship.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {internship.qualifications.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Qualifications</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {internship.qualifications.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {internship.benefits.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Benefits & Perks</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {internship.benefits.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Target Audience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2">Academic Level</p>
                <Badge>{internship.requiredLevel}</Badge>
              </div>

              {internship.targetSchools.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Target Schools</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.targetSchools.map((school) => (
                      <Badge key={school} variant="outline">
                        {school}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {internship.allowedFields.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Fields / Majors</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.allowedFields.map((field) => (
                      <Badge key={field} variant="outline">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {internship.requiredLanguages.length > 0 && (
                <div>
                  <p className="font-medium mb-2">Required Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.requiredLanguages.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium mb-2">Required Documents</p>
                <div className="flex flex-wrap gap-2">
                  {internship.requires_cv && (
                    <Badge variant="outline">CV Required</Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Application Deadline</p>
                  <p className="text-muted-foreground">
                    {internship.validThrough
                      ? new Date(internship.validThrough).toLocaleDateString()
                      : 'No deadline'}
                  </p>
                </div>

                <div>
                  <p className="font-medium">Total Applications</p>
                  <p className="text-muted-foreground">{totalApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Applications List */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Applications ({totalApplications})</CardTitle>
              <CardDescription>
                {pendingApplications} pending • {acceptedApplications} accepted
                • {rejectedApplications} rejected
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalApplications === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No applications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {internship.applications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Avatar>
                        <AvatarImage
                          src={application.user.image || undefined}
                        />
                        <AvatarFallback>
                          {application.user.name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-sm">
                              {application.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {application.user.email}
                            </p>
                          </div>
                          <Badge
                            className={
                              applicationStatusColors[application.status]
                            }
                          >
                            {application.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied{' '}
                          {new Date(
                            application.submittedAt
                          ).toLocaleDateString()}
                        </p>
                        {application.cvUrl && (
                          <a
                            href={application.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                          >
                            View CV
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge className={statusColors[internship.status]}>
                  {internship.status}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Posted Date</span>
                <span>
                  {internship.datePosted
                    ? new Date(internship.datePosted).toLocaleDateString()
                    : 'Not posted'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valid Through</span>
                <span>
                  {internship.validThrough
                    ? new Date(internship.validThrough).toLocaleDateString()
                    : 'No expiry'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span>
                  {new Date(internship.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated</span>
                <span>
                  {new Date(internship.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
