'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  BookOpen,
  Award,
  CheckCircle,
  Star,
  Share2,
  Bookmark,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Extended dummy data with more details
const detailedInternships = [
  {
    id: 1,
    title: 'Web Developer Intern',
    company: 'TBN Software Solutions & Consultancy',
    location: 'Work From Home',
    startDate: 'Immediately',
    duration: '5 Months',
    stipend: 'Unpaid',
    lastDate: '28-02-2024',
    tags: ['Part Time', 'Pre Placement Opportunity'],
    posted: '24 Days Ago',
    logo: 'https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=TBN',
    isClosed: false,

    // Detailed information
    description:
      'We are looking for a passionate Web Developer Intern to join our dynamic team. This internship offers hands-on experience in developing modern web applications using cutting-edge technologies. You will work on real projects that impact thousands of users.',

    responsibilities: [
      'Develop and maintain web applications using React, Node.js, and MongoDB',
      'Collaborate with the design team to implement responsive UI/UX designs',
      'Write clean, efficient, and well-documented code',
      'Participate in code reviews and team meetings',
      'Debug and fix issues in existing applications',
      'Learn and implement best practices in web development',
    ],

    requirements: [
      "Pursuing or completed Bachelor's degree in Computer Science or related field",
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Familiarity with React or other frontend frameworks is a plus',
      'Good problem-solving and analytical skills',
      'Strong communication and teamwork abilities',
      'Eagerness to learn and adapt to new technologies',
    ],

    perks: [
      'Certificate of completion',
      'Letter of recommendation',
      'Flexible work hours',
      'Mentorship from experienced developers',
      'Opportunity for full-time employment',
      'Access to premium learning resources',
    ],

    skills: [
      'React',
      'JavaScript',
      'HTML',
      'CSS',
      'Node.js',
      'MongoDB',
      'Git',
      'REST APIs',
    ],

    companyInfo: {
      name: 'TBN Software Solutions & Consultancy',
      about:
        'TBN Software Solutions is a leading IT services company specializing in web and mobile application development. We serve clients across various industries including healthcare, education, and e-commerce.',
      website: 'www.tbnsolutions.com',
      size: '50-200 employees',
      founded: '2015',
      industry: 'Information Technology',
      headquarters: 'Mumbai, India',
    },

    applicationInfo: {
      process:
        'Online application with resume screening, technical assessment, and final interview',
      timeline: 'Applications reviewed within 7 days',
      contact: 'hr@tbnsolutions.com',
    },
  },
  {
    id: 2,
    title: 'Hotel Sales Intern',
    company: 'PRASADS SP ENTERTAINMENT LLP',
    location: 'Vijayawada',
    startDate: '20-11-2023',
    duration: '6 Months',
    stipend: '₹ 11,000 /month',
    lastDate: '18-11-2023',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '26 Days Ago',
    logo: 'https://via.placeholder.com/80x80/EF4444/FFFFFF?text=PS',
    isClosed: false,

    description:
      "Join our dynamic sales team at one of Vijayawada's premier entertainment complexes. This internship will provide you with hands-on experience in hospitality sales, customer relationship management, and business development in the entertainment industry.",

    responsibilities: [
      'Assist in developing sales strategies for hotel and entertainment services',
      'Handle customer inquiries and provide excellent service',
      'Maintain relationships with corporate clients and travel agencies',
      'Prepare sales reports and analyze market trends',
      'Coordinate with different departments for customer requirements',
      'Participate in promotional events and marketing activities',
    ],

    requirements: [
      "Pursuing or completed Bachelor's degree in Business Administration, Marketing, or related field",
      'Excellent communication and interpersonal skills',
      'Basic knowledge of sales principles and customer service',
      'Proficiency in MS Office (Word, Excel, PowerPoint)',
      'Willingness to work in a fast-paced environment',
      'Local language proficiency preferred',
    ],

    perks: [
      'Competitive stipend of ₹11,000 per month',
      'Certificate of completion',
      'Free meals during work hours',
      'Uniform provided',
      'Transportation allowance',
      'Networking opportunities with industry professionals',
    ],

    skills: [
      'Sales',
      'Customer Service',
      'Communication',
      'MS Office',
      'Relationship Management',
      'Hospitality',
    ],

    companyInfo: {
      name: 'PRASADS SP ENTERTAINMENT LLP',
      about:
        'Prasads Entertainment is a leading entertainment and hospitality company operating multiplex cinemas, food courts, and recreational facilities across South India.',
      website: 'www.prasadentertainment.com',
      size: '200-500 employees',
      founded: '2002',
      industry: 'Entertainment & Hospitality',
      headquarters: 'Hyderabad, India',
    },

    applicationInfo: {
      process:
        'Resume screening, telephonic interview, and in-person interview',
      timeline: 'Applications reviewed within 5 days',
      contact: 'careers@prasadentertainment.com',
    },
  },
];

export default function InternshipDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  });

  useEffect(() => {
    // Simulate loading and find the internship
    const foundInternship = detailedInternships.find(
      (item) => item.id === parseInt(params.id as string)
    );

    setTimeout(() => {
      setInternship(foundInternship);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the application data to your backend
    alert(
      'Application submitted successfully! You will hear back within 7 days.'
    );
    setShowApplicationForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Internship Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The internship you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push('/internships')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Browse Other Internships
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/internships')}
                className="text-purple-700 hover:text-purple-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Internships
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-purple-700">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-700">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={internship.logo}
                  alt={internship.company}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-purple-900 mb-2">
                        {internship.title}
                      </h1>
                      <p className="text-lg text-gray-600 mb-2">
                        {internship.company}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {internship.tags.map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            className={
                              tag === 'Part Time'
                                ? 'bg-blue-100 text-blue-800'
                                : tag === 'Full Time'
                                ? 'bg-blue-100 text-blue-800'
                                : tag === 'Regular (In-office)'
                                ? 'bg-teal-100 text-teal-800'
                                : tag === 'Preferably Male'
                                ? 'bg-gray-100 text-gray-800'
                                : tag === 'Pre Placement Opportunity'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-2">
                        {internship.posted}
                      </p>
                      {internship.isClosed && (
                        <Badge className="bg-red-100 text-red-800">
                          Internship Closed
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-medium text-sm">
                          {internship.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium text-sm">
                          {internship.startDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="font-medium text-sm">
                          {internship.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Stipend</p>
                        <p className="font-medium text-sm">
                          {internship.stipend}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Application Deadline */}
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">
                      Application Deadline
                    </p>
                    <p className="text-sm text-purple-700">
                      {internship.lastDate}
                    </p>
                  </div>
                </div>
                {!internship.isClosed && (
                  <Dialog
                    open={showApplicationForm}
                    onOpenChange={setShowApplicationForm}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Apply for {internship.title}</DialogTitle>
                        <DialogDescription>
                          Submit your application for the internship at{' '}
                          {internship.company}
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleApplicationSubmit}
                        className="space-y-4 mt-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={applicationData.name}
                              onChange={(e) =>
                                setApplicationData({
                                  ...applicationData,
                                  name: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={applicationData.email}
                              onChange={(e) =>
                                setApplicationData({
                                  ...applicationData,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={applicationData.phone}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                phone: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="resume">Resume/CV Link *</Label>
                          <Input
                            id="resume"
                            placeholder="Enter Google Drive link or portfolio URL"
                            value={applicationData.resume}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                resume: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="coverLetter">Cover Letter</Label>
                          <Textarea
                            id="coverLetter"
                            placeholder="Tell us why you're a great fit for this internship..."
                            rows={4}
                            value={applicationData.coverLetter}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                coverLetter: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowApplicationForm(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Submit Application
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="responsibilities">
                  Responsibilities
                </TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="perks">Perks</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {internship.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="responsibilities" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Responsibilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {internship.responsibilities.map(
                        (responsibility: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              {responsibility}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {internship.requirements.map(
                        (requirement: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="perks" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Perks & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {internship.perks.map((perk: string, index: number) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Award className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Skills You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-100 text-purple-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Information */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Company Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-purple-900 mb-2">
                    {internship.companyInfo.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {internship.companyInfo.about}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Industry:</span>
                    <span className="font-medium">
                      {internship.companyInfo.industry}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Company Size:</span>
                    <span className="font-medium">
                      {internship.companyInfo.size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Founded:</span>
                    <span className="font-medium">
                      {internship.companyInfo.founded}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Headquarters:</span>
                    <span className="font-medium">
                      {internship.companyInfo.headquarters}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Globe className="h-4 w-4" />
                    <a
                      href={`https://${internship.companyInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-600"
                    >
                      {internship.companyInfo.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Application Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {internship.applicationInfo.process}
                  </p>
                  <p className="text-xs text-gray-500">
                    {internship.applicationInfo.timeline}
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${internship.applicationInfo.contact}`}
                      className="hover:text-purple-600"
                    >
                      {internship.applicationInfo.contact}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Quick Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{internship.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Stipend:</span>
                  <span className="font-medium text-green-600">
                    {internship.stipend}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{internship.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{internship.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Application Deadline:</span>
                  <span className="font-medium text-red-600">
                    {internship.lastDate}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Internships */}
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle>Similar Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                {detailedInternships
                  .filter(
                    (item) =>
                      item.id !== internship.id &&
                      item.tags.some((tag: string) =>
                        internship.tags.includes(tag)
                      )
                  )
                  .slice(0, 3)
                  .map((similar: any) => (
                    <div
                      key={similar.id}
                      className="border-b pb-3 last:border-b-0 last:pb-0"
                    >
                      <h4 className="font-medium text-purple-900 mb-1">
                        {similar.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {similar.company}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {similar.location}
                        </span>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() =>
                            router.push(`/internships/${similar.id}`)
                          }
                          className="text-purple-600 p-0 h-auto"
                        >
                          View →
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
