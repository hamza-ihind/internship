'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Banknote,
  Briefcase,
  BookOpen,
  Award,
  CheckCircle,
  Share2,
  Bookmark,
  Building2,
  Mail,
  Phone,
  GraduationCap,
  Languages,
  FileText,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { format, formatDistanceToNow } from 'date-fns';

interface Internship {
  id: string;
  title: string;
  company: string;
  status: string;
  contactEmail: string;
  contactPhone: string;
  city: string;
  country: string;
  address: string | null;
  mode: string;
  remote: boolean;
  datePosted: string | null;
  validThrough: string | null;
  startDate: string | null;
  durationMonths: number | null;
  hoursPerWeek: number | null;
  internshipType: string;
  employmentType: string;
  isPaid: boolean;
  salary: number | null;
  salaryUnit: string | null;
  requiredLevel: string;
  targetSchools: string[];
  allowedFields: string[];
  requiredLanguages: string[];
  shortDescription: string;
  fullDescription: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  applyMethod: string;
  externalUrl: string | null;
  requiredDocs: string[];
  requires_cv: boolean;
  maxApplications: number | null;
  applicationDeadline: string | null;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  _count?: {
    applications: number;
  };
}

export default function InternshipDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await fetch(`/api/internships/${params.id}`);
        if (!response.ok) {
          throw new Error('Internship not found');
        }
        const data = await response.json();

        // Only show published internships to public
        if (data.status !== 'PUBLISHED') {
          throw new Error('Internship not available');
        }

        setInternship(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load internship',
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInternship();
    }
  }, [params.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: internship?.title,
        text: `Check out this internship opportunity at ${internship?.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    if (internship?.applyMethod === 'external' && internship?.externalUrl) {
      window.open(internship.externalUrl, '_blank');
    } else {
      // Navigate to internal application flow
      router.push(`/internships/${params.id}/apply`);
    }
  };

  const formatSalary = () => {
    if (!internship?.isPaid) return 'Unpaid Internship';
    if (!internship.salary) return 'Paid Internship';
    return `${internship.salary} ${internship.salaryUnit || 'MAD/month'}`;
  };

  const formatDuration = () => {
    if (!internship?.durationMonths) return 'Flexible';
    return `${internship.durationMonths} Month${internship.durationMonths > 1 ? 's' : ''}`;
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Flexible';
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  const isExpired = () => {
    if (!internship?.validThrough) return false;
    return new Date(internship.validThrough) < new Date();
  };

  const getWorkMode = () => {
    if (internship?.remote) return 'Remote';
    if (internship?.mode === 'HYBRID') return 'Hybrid';
    return 'On-site';
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Loading internship details...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !internship) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md mx-auto px-4">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Internship Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              {error ||
                "The internship you're looking for doesn't exist or has been removed."}
            </p>
            <Button
              onClick={() => router.push('/internships')}
              className="bg-primary hover:bg-primary/90"
            >
              Browse Other Internships
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
          <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <Button
                variant="outline"
                onClick={() => router.push('/internships')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Internships</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button
                  variant={isSaved ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Bookmark
                    className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                  />
                  <span className="hidden sm:inline">
                    {isSaved ? 'Saved' : 'Save'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Company and Title */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-4 ring-primary/10 flex-shrink-0">
                <Building2 className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {internship.tags?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {isExpired() && (
                    <Badge variant="destructive">Applications Closed</Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                  {internship.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-4">
                  {internship.company}
                </p>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>
                      {internship.city}, {internship.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>{getWorkMode()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{formatDuration()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Banknote className="h-4 w-4 text-primary" />
                    <span>{formatSalary()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="flex-1 space-y-6">
              {/* About the Internship */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    About this Internship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {internship.fullDescription || internship.shortDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              {internship.responsibilities?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {internship.responsibilities.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Qualifications */}
              {internship.qualifications?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Qualifications & Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {internship.qualifications.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Benefits */}
              {internship.benefits?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Benefits & Perks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {internship.benefits.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Required Languages */}
              {internship.requiredLanguages?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="h-5 w-5 text-primary" />
                      Required Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {internship.requiredLanguages.map((lang, index) => (
                        <Badge key={index} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Target Fields */}
              {internship.allowedFields?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Target Fields of Study
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {internship.allowedFields.map((field, index) => (
                        <Badge key={index} variant="outline">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="w-full lg:w-96 space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-24 border-2 border-primary/20">
                <CardContent className="pt-6">
                  {isExpired() ? (
                    <div className="text-center py-4">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <h3 className="font-semibold text-lg mb-2">
                        Applications Closed
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        This internship is no longer accepting applications.
                      </p>
                    </div>
                  ) : (
                    <>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 h-12 text-lg mb-4"
                        onClick={handleApply}
                      >
                        {internship.applyMethod === 'external' ? (
                          <>
                            Apply on Company Website
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          'Apply Now'
                        )}
                      </Button>
                      {internship.applicationDeadline && (
                        <p className="text-center text-sm text-muted-foreground">
                          Apply by {formatDate(internship.applicationDeadline)}
                        </p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Internship Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Internship Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">
                      {formatDate(internship.startDate)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{formatDuration()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Work Mode</span>
                    <span className="font-medium">{getWorkMode()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Employment Type
                    </span>
                    <span className="font-medium capitalize">
                      {internship.employmentType.replace('-', ' ')}
                    </span>
                  </div>
                  {internship.hoursPerWeek && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Hours/Week
                        </span>
                        <span className="font-medium">
                          {internship.hoursPerWeek} hours
                        </span>
                      </div>
                    </>
                  )}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compensation</span>
                    <span className="font-medium">{formatSalary()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Required Level
                    </span>
                    <span className="font-medium">
                      {internship.requiredLevel}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents */}
              {internship.requiredDocs?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Required Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {internship.requiredDocs.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {internship.contactEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${internship.contactEmail}`}
                        className="text-primary hover:underline"
                      >
                        {internship.contactEmail}
                      </a>
                    </div>
                  )}
                  {internship.contactPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${internship.contactPhone}`}
                        className="text-primary hover:underline"
                      >
                        {internship.contactPhone}
                      </a>
                    </div>
                  )}
                  {internship.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <span className="text-muted-foreground">
                        {internship.address}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {internship.viewCount || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {internship._count?.applications || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Applications
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-xs text-muted-foreground text-center">
                    Posted{' '}
                    {formatDistanceToNow(new Date(internship.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
