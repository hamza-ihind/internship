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
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

// Extended dummy data with more details - Moroccan Companies
const detailedInternships = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Capgemini Maroc',
    location: 'Casablanca',
    startDate: 'Immediately',
    duration: '6 Months',
    stipend: '3000 DH /month',
    lastDate: '15-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '5 Days Ago',
    logo: 'https://logo.clearbit.com/capgemini.com',
    isClosed: false,

    // Detailed information
    description:
      'Join Capgemini Morocco, a global leader in consulting, technology services, and digital transformation. This internship offers hands-on experience in developing full-stack web applications using modern technologies. You will work with experienced engineers on projects for international clients across various sectors.',

    responsibilities: [
      'Develop and maintain web applications using React, Angular, Node.js, and databases',
      'Collaborate with cross-functional teams to implement responsive and scalable solutions',
      'Write clean, maintainable, and well-documented code following best practices',
      'Participate in agile ceremonies including daily standups, sprint planning, and retrospectives',
      'Debug and optimize existing applications for better performance',
      'Learn and implement industry-standard development methodologies and DevOps practices',
    ],

    requirements: [
      "Pursuing or completed Bachelor's or Master's degree in Computer Science, Software Engineering, or related field",
      'Strong knowledge of HTML, CSS, JavaScript, and modern frameworks (React, Angular, or Vue.js)',
      'Understanding of backend technologies (Node.js, Java, or .NET)',
      'Familiarity with databases (SQL and NoSQL)',
      'Good problem-solving and analytical skills',
      'Excellent communication skills in French or English',
      'Ability to work in a team environment',
    ],

    perks: [
      'Competitive stipend of 3000 DH per month',
      'Official internship certificate',
      'Letter of recommendation upon successful completion',
      'Mentorship from senior developers and architects',
      'Pre-placement opportunity for outstanding performers',
      'Access to Capgemini University and learning platforms',
      'Flexible working hours',
      'Modern office facilities in Casablanca Twin Center',
    ],

    skills: [
      'React',
      'Angular',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Java',
      'SQL',
      'MongoDB',
      'Git',
      'REST APIs',
      'Agile/Scrum',
    ],

    companyInfo: {
      name: 'Capgemini Maroc',
      about:
        'Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology. With over 5,000 employees in Morocco across multiple delivery centers, Capgemini Morocco serves clients worldwide with expertise in digital transformation, cloud services, cybersecurity, and AI.',
      website: 'www.capgemini.com',
      size: '5,000+ employees in Morocco',
      founded: '1967 (Morocco presence since 2000s)',
      industry: 'Information Technology & Consulting',
      headquarters: 'Casablanca, Morocco',
    },

    applicationInfo: {
      process:
        'Online application, resume screening, technical assessment (coding test), HR interview, and technical interview with team leads',
      timeline: 'Applications reviewed within 7-10 days',
      contact: 'recruitment.morocco@capgemini.com',
    },
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Attijariwafa Bank',
    location: 'Rabat',
    startDate: '01-02-2026',
    duration: '4 Months',
    stipend: '2500 DH /month',
    lastDate: '20-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '3 Days Ago',
    logo: 'https://logo.clearbit.com/attijariwafabank.com',
    isClosed: false,

    description:
      "Join Morocco's leading banking group as a Data Analyst Intern. This internship provides a unique opportunity to work with large-scale financial data, develop analytical models, and contribute to strategic decision-making processes. You'll be part of the Data & Analytics department working on real business challenges.",

    responsibilities: [
      'Collect, clean, and analyze large datasets from various banking systems',
      'Create dashboards and visualizations using Power BI and Tableau',
      'Assist in developing predictive models for customer behavior and risk assessment',
      'Generate reports and insights to support business decision-making',
      'Collaborate with IT and business teams to understand data requirements',
      'Participate in data governance and quality assurance initiatives',
    ],

    requirements: [
      "Pursuing or completed Bachelor's or Master's degree in Data Science, Statistics, Computer Science, or related field",
      'Proficiency in SQL and database management',
      'Experience with data visualization tools (Power BI, Tableau, or similar)',
      'Knowledge of Python or R for data analysis',
      'Understanding of statistical methods and data mining techniques',
      'Strong analytical and problem-solving skills',
      'Excellent communication skills in French and Arabic',
      'Interest in banking and financial services',
    ],

    perks: [
      'Competitive stipend of 2500 DH per month',
      'Certificate of completion from a leading banking institution',
      'Exposure to real-world banking data and analytics',
      'Mentorship from experienced data professionals',
      'Pre-placement opportunity based on performance',
      'Access to professional development programs',
      'Transportation allowance',
      'Staff cafeteria access',
    ],

    skills: [
      'SQL',
      'Python',
      'R',
      'Power BI',
      'Tableau',
      'Excel',
      'Data Mining',
      'Statistical Analysis',
      'Machine Learning',
      'ETL',
    ],

    companyInfo: {
      name: 'Attijariwafa Bank',
      about:
        "Attijariwafa bank is Morocco's leading banking and financial services group with a presence in 26 countries across Africa, Europe, and the Middle East. With over 20,000 employees and a strong commitment to innovation and digital transformation, the bank offers a dynamic environment for young professionals.",
      website: 'www.attijariwafabank.com',
      size: '20,000+ employees',
      founded: '1904',
      industry: 'Banking & Financial Services',
      headquarters: 'Casablanca, Morocco',
    },

    applicationInfo: {
      process:
        'Online application, CV screening, technical test (SQL and analytics), HR interview, and final interview with department manager',
      timeline: 'Applications reviewed within 5-7 days',
      contact: 'recrutement@attijariwafa.com',
    },
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Majorel Morocco',
    location: 'Work From Home',
    startDate: '15-01-2026',
    duration: '3 Months',
    stipend: '2000 DH /month',
    lastDate: '10-01-2026',
    tags: ['Part Time', 'Pre Placement Opportunity'],
    posted: '7 Days Ago',
    logo: 'https://logo.clearbit.com/majorel.com',
    isClosed: false,

    description:
      'Majorel Morocco is looking for a creative UI/UX Designer Intern to join our digital solutions team. This remote internship offers the flexibility to work from home while gaining valuable experience in designing user interfaces and experiences for international clients. You will work on diverse projects ranging from mobile apps to web platforms.',

    responsibilities: [
      'Design intuitive and visually appealing user interfaces for web and mobile applications',
      'Create wireframes, prototypes, and mockups using Figma or Adobe XD',
      'Conduct user research and usability testing to gather insights',
      'Collaborate with developers and product managers to implement designs',
      'Maintain and evolve design systems and style guides',
      'Present design concepts and iterations to stakeholders',
    ],

    requirements: [
      "Pursuing or completed Bachelor's degree in Design, HCI, or related field",
      'Proficiency in design tools (Figma, Adobe XD, Sketch, or similar)',
      'Understanding of user-centered design principles and best practices',
      'Basic knowledge of HTML/CSS is a plus',
      'Strong portfolio showcasing UI/UX design projects',
      'Excellent visual design skills with attention to detail',
      'Good communication skills in French or English',
      'Self-motivated and able to work independently in a remote setting',
    ],

    perks: [
      'Flexible remote work arrangement',
      'Stipend of 2000 DH per month',
      'Certificate of completion',
      'Build your portfolio with real-world projects',
      'Mentorship from senior designers',
      'Opportunity for full-time employment',
      'Access to design tools and resources',
      'Participate in design workshops and webinars',
    ],

    skills: [
      'Figma',
      'Adobe XD',
      'Sketch',
      'Photoshop',
      'Illustrator',
      'Prototyping',
      'User Research',
      'Wireframing',
      'Design Systems',
      'Responsive Design',
    ],

    companyInfo: {
      name: 'Majorel Morocco',
      about:
        'Majorel is a leading provider of customer experience and digital services for global brands. With a strong presence in Morocco and over 10,000 employees across multiple sites, Majorel combines passion, innovation, and technology to deliver outstanding customer experiences.',
      website: 'www.majorel.com',
      size: '10,000+ employees in Morocco',
      founded: '2019 (operations in Morocco since earlier)',
      industry: 'Customer Experience & Digital Services',
      headquarters: 'Rabat & Casablanca, Morocco',
    },

    applicationInfo: {
      process:
        'Online portfolio submission, portfolio review, design challenge, HR interview, and final interview with design team lead',
      timeline: 'Applications reviewed within 5 days',
      contact: 'careers.morocco@majorel.com',
    },
  },
  {
    id: 4,
    title: 'Marketing & Communication',
    company: 'Maroc Telecom',
    location: 'Casablanca',
    startDate: '01-01-2026',
    duration: '5 Months',
    stipend: '3500 DH /month',
    lastDate: '25-12-2025',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '12 Days Ago',
    logo: 'https://logo.clearbit.com/iam.ma',
    isClosed: true,
  },
  {
    id: 5,
    title: 'Software Engineer',
    company: 'SQLI Morocco',
    location: 'Rabat',
    startDate: '10-01-2026',
    duration: '6 Months',
    stipend: '3200 DH /month',
    lastDate: '05-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '2 Days Ago',
    logo: 'https://logo.clearbit.com/sqli.com',
    isClosed: false,
  },
  {
    id: 6,
    title: 'Business Intelligence Intern',
    company: 'OCP Group',
    location: 'Casablanca',
    startDate: '01-02-2026',
    duration: '6 Months',
    stipend: '4000 DH /month',
    lastDate: '15-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '4 Days Ago',
    logo: 'https://logo.clearbit.com/ocpgroup.ma',
    isClosed: false,
  },
  {
    id: 7,
    title: 'Mobile Developer',
    company: 'Société Générale Maroc',
    location: 'Casablanca',
    startDate: '20-01-2026',
    duration: '5 Months',
    stipend: '3500 DH /month',
    lastDate: '10-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '6 Days Ago',
    logo: 'https://logo.clearbit.com/societegenerale.com',
    isClosed: false,
  },
  {
    id: 8,
    title: 'Digital Marketing',
    company: 'Jumia Morocco',
    location: 'Work From Home',
    startDate: 'Immediately',
    duration: '3 Months',
    stipend: '2200 DH /month',
    lastDate: '31-12-2025',
    tags: ['Part Time', 'Pre Placement Opportunity'],
    posted: '1 Day Ago',
    logo: 'https://logo.clearbit.com/jumia.com',
    isClosed: false,
  },
  {
    id: 9,
    title: 'DevOps Engineer',
    company: 'Sopra Steria Morocco',
    location: 'Rabat',
    startDate: '15-01-2026',
    duration: '6 Months',
    stipend: '3800 DH /month',
    lastDate: '08-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '3 Days Ago',
    logo: 'https://logo.clearbit.com/soprasteria.com',
    isClosed: false,
  },
  {
    id: 10,
    title: 'Cybersecurity Analyst',
    company: 'Inwi',
    location: 'Casablanca',
    startDate: '01-02-2026',
    duration: '4 Months',
    stipend: '3000 DH /month',
    lastDate: '20-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '8 Days Ago',
    logo: 'https://logo.clearbit.com/inwi.ma',
    isClosed: false,
  },
];

export default function InternshipDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
    alert(
      'Application submitted successfully! You will hear back within 7 days.'
    );
    setShowApplicationForm(false);
  };

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
    alert(isSaved ? 'Removed from saved' : 'Saved successfully!');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-primary">Loading internship details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!internship) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Internship Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The internship you're looking for doesn't exist or has been
              removed.
            </p>
            <Button
              onClick={() => router.push('/internships')}
              className="bg-primary hover:bg-primary/90"
            >
              Browse Other Internships
            </Button>
          </div>
        </div>
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
                  variant="outline"
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

            {/* Header Content */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <img
                  src={internship.logo}
                  alt={internship.company}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-border shadow-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  {internship.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {internship.isClosed && (
                    <Badge variant="destructive" className="text-xs">
                      Closed
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                  {internship.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-4">
                  {internship.company}
                </p>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="font-medium text-sm truncate">
                        {internship.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border">
                    <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Stipend</p>
                      <p className="font-medium text-sm truncate">
                        {internship.stipend}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium text-sm truncate">
                        {internship.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-lg p-3 border border-border">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="font-medium text-sm text-destructive truncate">
                        {internship.lastDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            {!internship.isClosed && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Dialog
                  open={showApplicationForm}
                  onOpenChange={setShowApplicationForm}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="text-base gap-2 w-full sm:w-auto"
                    >
                      <Send className="h-4 w-4" />
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowApplicationForm(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Submit Application</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <p className="text-sm text-muted-foreground self-center">
                  Posted {internship.posted}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    About the Internship
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {internship.description}
                  </p>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Key Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {internship.responsibilities.map(
                      (responsibility: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {responsibility}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {internship.requirements.map(
                      (requirement: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {requirement}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Perks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Perks & Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {internship.perks.map((perk: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Company Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {internship.companyInfo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {internship.companyInfo.about}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry:</span>
                      <span className="font-medium text-right">
                        {internship.companyInfo.industry}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium text-right">
                        {internship.companyInfo.size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded:</span>
                      <span className="font-medium text-right">
                        {internship.companyInfo.founded}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium text-right">
                        {internship.companyInfo.headquarters}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() =>
                      window.open(
                        `https://${internship.companyInfo.website}`,
                        '_blank'
                      )
                    }
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                  </Button>
                </CardContent>
              </Card>

              {/* Application Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Application Process
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {internship.applicationInfo.process}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {internship.applicationInfo.timeline}
                  </p>
                  <Separator />
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <a
                      href={`mailto:${internship.applicationInfo.contact}`}
                      className="text-primary hover:underline"
                    >
                      {internship.applicationInfo.contact}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Internships */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        className="border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <h4 className="font-medium mb-1 hover:text-primary cursor-pointer">
                          {similar.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {similar.company}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {similar.location}
                          </span>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() =>
                              router.push(`/internships/${similar.id}`)
                            }
                            className="p-0 h-auto"
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
      <Footer />
    </>
  );
}
