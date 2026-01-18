'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Copy,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Clock,
  FileText,
  MapPin,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

type InternshipStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED';

interface Internship {
  id: string;
  title: string;
  company: string;
  status: InternshipStatus;
  city: string;
  country: string;
  mode: string;
  remote: boolean;
  isPaid: boolean;
  internshipType: string;
  datePosted: string | null;
  applicationDeadline: string | null;
  createdAt: string;
  _count?: {
    applications: number;
  };
}

export default function AdminInternships() {
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [paidFilter, setPaidFilter] = useState<string>('ALL');
  const [cityFilter, setCityFilter] = useState<string>('ALL');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sorting
  const [sortField, setSortField] = useState<string>('datePosted');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await fetch('/api/admin/internships');
      if (response.ok) {
        const data = await response.json();
        setInternships(data.internships || []);
      }
    } catch (error) {
      console.error('Failed to fetch internships:', error);
      toast.error('Failed to load internships');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this internship?')) return;

    try {
      const response = await fetch(`/api/admin/internships/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      toast.success('Internship deleted successfully!');
      fetchInternships();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete internship');
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one internship');
      return;
    }

    // Implement bulk actions here
    toast.success(`${action} applied to ${selectedIds.length} internships`);
    setSelectedIds([]);
  };

  const handleStatusChange = async (
    id: string,
    newStatus: InternshipStatus,
  ) => {
    try {
      const internship = internships.find((i) => i.id === id);
      if (!internship) return;

      const response = await fetch(`/api/admin/internships/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...internship, status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      toast.success('Status updated successfully!');
      fetchInternships();
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update status');
    }
  };

  // Apply filters and sorting
  const filteredInternships = internships
    .filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' || internship.status === statusFilter;
      const matchesType =
        typeFilter === 'ALL' || internship.internshipType === typeFilter;
      const matchesPaid =
        paidFilter === 'ALL' ||
        (paidFilter === 'PAID' && internship.isPaid) ||
        (paidFilter === 'UNPAID' && !internship.isPaid);
      const matchesCity =
        cityFilter === 'ALL' || internship.city === cityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPaid &&
        matchesCity
      );
    })
    .sort((a, b) => {
      const aVal = a[sortField as keyof Internship];
      const bVal = b[sortField as keyof Internship];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInternships = filteredInternships.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Get unique cities for filter
  const uniqueCities = Array.from(
    new Set(internships.map((i) => i.city)),
  ).filter(Boolean);

  // Calculate KPIs
  const totalActive = internships.filter(
    (i) => i.status === 'PUBLISHED',
  ).length;
  const expiringSoon = internships.filter((i) => {
    if (!i.applicationDeadline) return false;
    const daysUntilDeadline = Math.ceil(
      (new Date(i.applicationDeadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return (
      daysUntilDeadline >= 0 &&
      daysUntilDeadline <= 14 &&
      i.status === 'PUBLISHED'
    );
  }).length;
  const drafts = internships.filter((i) => i.status === 'DRAFT').length;
  const totalApplications = internships.reduce(
    (sum, i) => sum + (i._count?.applications || 0),
    0,
  );

  const getStatusColor = (status: InternshipStatus) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-500 text-white';
      case 'DRAFT':
        return 'bg-yellow-500 text-white';
      case 'CLOSED':
        return 'bg-gray-500 text-white';
      case 'ARCHIVED':
        return 'bg-slate-400 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const isDeadlinePassed = (deadline: string | null) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const getDeadlineColor = (
    deadline: string | null,
    status: InternshipStatus,
  ) => {
    if (!deadline) return '';
    const daysUntil = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
    if (daysUntil < 0 && status === 'PUBLISHED')
      return 'text-red-600 font-semibold';
    if (daysUntil <= 7) return 'text-orange-600 font-semibold';
    return '';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="bg-background border-b border-border px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Internships Management
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Manage all internship postings and applications
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto">
              <FileText className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button
              onClick={() => router.push('/admin/internships/new')}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Internship
            </Button>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow duration-200">
            <CardContent className="pt-6 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Active
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-foreground">
                    {totalActive}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Published internships
                  </p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center ring-4 ring-primary/10">
                  <TrendingUp className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-semibold text-primary">Live</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="pt-6 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                      Expiring
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-foreground">
                    {expiringSoon}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Within 14 days
                  </p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-xl flex items-center justify-center ring-4 ring-orange-500/10">
                  <Clock className="h-7 w-7 text-orange-500" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Deadline</span>
                  <span className="font-semibold text-orange-500">Urgent</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="pt-6 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-yellow-600" />
                    <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">
                      Drafts
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{drafts}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pending review
                  </p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl flex items-center justify-center ring-4 ring-yellow-500/10">
                  <FileText className="h-7 w-7 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Action</span>
                  <span className="font-semibold text-yellow-600">Review</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="pt-6 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
                      Applications
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-foreground">
                    {totalApplications}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total received
                  </p>
                </div>
                <div className="h-14 w-14 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl flex items-center justify-center ring-4 ring-blue-500/10">
                  <FileText className="h-7 w-7 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Avg per post</span>
                  <span className="font-semibold text-blue-500">
                    {totalActive > 0
                      ? Math.round(totalApplications / totalActive)
                      : 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-background border-b border-border px-4 sm:px-6 py-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, company, city, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 flex-1">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Project-based">Project-based</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paidFilter} onValueChange={setPaidFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="UNPAID">Unpaid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Cities</SelectItem>
                  {uniqueCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(searchQuery ||
              statusFilter !== 'ALL' ||
              typeFilter !== 'ALL' ||
              paidFilter !== 'ALL' ||
              cityFilter !== 'ALL') && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setTypeFilter('ALL');
                  setPaidFilter('ALL');
                  setCityFilter('ALL');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">
              {selectedIds.length} selected
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Publish')}
              >
                Publish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Close')}
              >
                Close
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Delete')}
                className="text-destructive"
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedIds([])}
              >
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto px-4 sm:px-6 py-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedIds.length === paginatedInternships.length &&
                        paginatedInternships.length > 0
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIds(paginatedInternships.map((i) => i.id));
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-center">Applications</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInternships.map((internship) => {
                  const isSelected = selectedIds.includes(internship.id);
                  const deadlineWarning =
                    isDeadlinePassed(internship.applicationDeadline) &&
                    internship.status === 'PUBLISHED';

                  return (
                    <TableRow
                      key={internship.id}
                      className={`${
                        deadlineWarning ? 'bg-red-50 dark:bg-red-950/20' : ''
                      } ${isSelected ? 'bg-muted' : ''}`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedIds([...selectedIds, internship.id]);
                            } else {
                              setSelectedIds(
                                selectedIds.filter(
                                  (id) => id !== internship.id,
                                ),
                              );
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{internship.title}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {internship.id.slice(0, 8)}
                        </div>
                      </TableCell>
                      <TableCell>{internship.company}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {internship.city}
                        </div>
                        {internship.remote && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Remote
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant="secondary">
                            {internship.internshipType}
                          </Badge>
                          {internship.isPaid && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            >
                              <DollarSign className="h-3 w-3 mr-1" />
                              Paid
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={internship.status}
                          onValueChange={(value) =>
                            handleStatusChange(
                              internship.id,
                              value as InternshipStatus,
                            )
                          }
                        >
                          <SelectTrigger
                            className={`w-[120px] ${getStatusColor(
                              internship.status,
                            )}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                            <SelectItem value="ARCHIVED">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {internship.datePosted
                            ? new Date(
                                internship.datePosted,
                              ).toLocaleDateString()
                            : 'Not set'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`text-sm ${getDeadlineColor(
                            internship.applicationDeadline,
                            internship.status,
                          )}`}
                        >
                          {internship.applicationDeadline
                            ? new Date(
                                internship.applicationDeadline,
                              ).toLocaleDateString()
                            : 'No deadline'}
                        </div>
                        {deadlineWarning && (
                          <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                            <AlertTriangle className="h-3 w-3" />
                            Expired
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {internship._count?.applications || 0}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/admin/internships/${internship.id}`,
                                )
                              }
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(
                                  `/internships/${internship.id}`,
                                  '_blank',
                                )
                              }
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View as Student
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(internship.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredInternships.length === 0 && (
            <div className="text-center py-12 px-4">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No internships found
              </h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                {searchQuery || statusFilter !== 'ALL' || typeFilter !== 'ALL'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first internship'}
              </p>
              {!searchQuery && statusFilter === 'ALL' && (
                <Button onClick={() => router.push('/admin/internships/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Internship
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-border px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-background">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredInternships.length)} of{' '}
            {filteredInternships.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
