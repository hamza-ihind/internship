'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  Users,
  Building2,
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ArrowRight,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';

// Dummy data for dashboard
const stats = [
  {
    name: 'Total Internships',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Active Users',
    value: '2,847',
    change: '+18%',
    trend: 'up',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Companies',
    value: '89',
    change: '+5%',
    trend: 'up',
    icon: Building2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Applications',
    value: '1,234',
    change: '-3%',
    trend: 'down',
    icon: FileText,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

const recentInternships = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Capgemini Maroc',
    status: 'active',
    applications: 45,
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Attijariwafa Bank',
    status: 'active',
    applications: 32,
    posted: '3 days ago',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Majorel Morocco',
    status: 'pending',
    applications: 18,
    posted: '5 days ago',
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'Maroc Telecom',
    status: 'closed',
    applications: 67,
    posted: '1 week ago',
  },
  {
    id: 5,
    title: 'Software Engineer',
    company: 'SQLI Morocco',
    status: 'active',
    applications: 28,
    posted: '4 days ago',
  },
];

const recentApplications = [
  {
    id: 1,
    applicant: 'Ahmed Benani',
    position: 'Full Stack Developer',
    company: 'Capgemini Maroc',
    status: 'pending',
    date: '2 hours ago',
  },
  {
    id: 2,
    applicant: 'Fatima Zahra',
    position: 'Data Analyst',
    company: 'Attijariwafa Bank',
    status: 'reviewed',
    date: '5 hours ago',
  },
  {
    id: 3,
    applicant: 'Youssef Idrissi',
    position: 'UI/UX Designer',
    company: 'Majorel Morocco',
    status: 'accepted',
    date: '1 day ago',
  },
  {
    id: 4,
    applicant: 'Salma Alami',
    position: 'Software Engineer',
    company: 'SQLI Morocco',
    status: 'rejected',
    date: '1 day ago',
  },
];

const quickActions = [
  {
    title: 'Create Internship',
    description: 'Post a new internship opportunity',
    href: '/admin/internships/create',
    icon: Briefcase,
    color: 'primary',
  },
  {
    title: 'Manage Users',
    description: 'View and manage user accounts',
    href: '/admin/users',
    icon: Users,
    color: 'secondary',
  },
  {
    title: 'Review Applications',
    description: 'Check pending applications',
    href: '/admin/applications',
    icon: FileText,
    color: 'accent',
  },
  {
    title: 'View Analytics',
    description: 'See detailed reports and insights',
    href: '/admin/analytics',
    icon: TrendingUp,
    color: 'muted',
  },
];

export default function AdminDashboard() {
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
          {greeting}, {session?.user?.name || 'Admin'}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your platform today.
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
                  <h3 className="text-2xl font-bold text-foreground mt-2">
                    {stat.value}
                  </h3>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      from last month
                    </span>
                  </div>
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
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <action.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Internships */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Internships</CardTitle>
            <Link href="/admin/internships">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="flex items-center justify-between pb-4 last:pb-0 border-b last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {internship.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {internship.company}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          internship.status === 'active'
                            ? 'default'
                            : internship.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className="text-xs"
                      >
                        {internship.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {internship.applications} applications
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-muted-foreground">
                      {internship.posted}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Link href="/admin/applications">
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
                  className="flex items-center justify-between pb-4 last:pb-0 border-b last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {application.applicant}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {application.position}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {application.company}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center justify-end gap-1 mb-1">
                      {application.status === 'pending' && (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                      {application.status === 'reviewed' && (
                        <Eye className="h-4 w-4 text-blue-600" />
                      )}
                      {application.status === 'accepted' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {application.status === 'rejected' && (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          application.status === 'pending'
                            ? 'text-yellow-600'
                            : application.status === 'reviewed'
                            ? 'text-blue-600'
                            : application.status === 'accepted'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {application.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Total Internships</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">892</p>
              <p className="text-sm text-muted-foreground">
                Successful Placements
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">2,847</p>
              <p className="text-sm text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-3">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-sm text-muted-foreground">Partner Companies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
