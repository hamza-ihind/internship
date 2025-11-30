'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  TrendingUp,
  BookmarkIcon,
  Search,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

// Dummy data
const stats = [
  {
    name: 'Applications Sent',
    value: '8',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'In Review',
    value: '5',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    name: 'Accepted',
    value: '2',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Saved',
    value: '12',
    icon: BookmarkIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

const recentApplications = [
  {
    id: 1,
    position: 'Full Stack Developer',
    company: 'Capgemini Maroc',
    status: 'pending',
    appliedDate: '2 days ago',
    logo: 'https://logo.clearbit.com/capgemini.com',
  },
  {
    id: 2,
    position: 'Data Analyst',
    company: 'Attijariwafa Bank',
    status: 'reviewing',
    appliedDate: '5 days ago',
    logo: 'https://logo.clearbit.com/attijariwafabank.com',
  },
  {
    id: 3,
    position: 'UI/UX Designer',
    company: 'Majorel Morocco',
    status: 'accepted',
    appliedDate: '1 week ago',
    logo: 'https://logo.clearbit.com/majorel.com',
  },
];

const recommendedInternships = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'SQLI Morocco',
    location: 'Rabat',
    stipend: '3200 DH',
    logo: 'https://logo.clearbit.com/sqli.com',
  },
  {
    id: 2,
    title: 'Business Intelligence',
    company: 'OCP Group',
    location: 'Casablanca',
    stipend: '4000 DH',
    logo: 'https://logo.clearbit.com/ocpgroup.ma',
  },
  {
    id: 3,
    title: 'Mobile Developer',
    company: 'Société Générale',
    location: 'Casablanca',
    stipend: '3500 DH',
    logo: 'https://logo.clearbit.com/societegenerale.com',
  },
];

export default function UserDashboard() {
  const { data: session } = useSession();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
      ? 'Good Afternoon'
      : 'Good Evening';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {greeting}, {session?.user?.name || 'Student'}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Ready to take the next step in your career? Let's find your perfect
          internship.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <h3 className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </h3>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/internships">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Browse Internships
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Find your perfect opportunity
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/profile">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Complete Your Profile
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Stand out to employers
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Applications & Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Link href="/dashboard/applications">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex items-center gap-4 pb-4 last:pb-0 border-b last:border-b-0"
                >
                  <img
                    src={application.logo}
                    alt={application.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {application.position}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {application.company}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          application.status === 'accepted'
                            ? 'default'
                            : application.status === 'reviewing'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {application.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {application.appliedDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Internships */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recommended For You</CardTitle>
            <Link href="/internships">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="flex items-center gap-4 pb-4 last:pb-0 border-b last:border-b-0"
                >
                  <img
                    src={internship.logo}
                    alt={internship.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {internship.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {internship.company}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{internship.location}</span>
                      <span>•</span>
                      <span className="text-primary font-medium">
                        {internship.stipend}/month
                      </span>
                    </div>
                  </div>
                  <Link href={`/internships/${internship.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Complete Your Profile
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                A complete profile increases your chances of getting hired by 3x
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-background rounded-full h-2 max-w-xs">
                  <div className="bg-primary rounded-full h-2 w-2/3" />
                </div>
                <span className="text-sm font-medium">67%</span>
              </div>
            </div>
            <Link href="/dashboard/profile">
              <Button>Complete Now</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
