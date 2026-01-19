'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  Search,
  X,
  MapPin,
  Calendar,
  Clock,
  Banknote,
  Bookmark,
  Filter,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, formatDistanceToNow } from 'date-fns';

interface Internship {
  id: string;
  title: string;
  company: string;
  city: string;
  country: string;
  mode: string;
  remote: boolean;
  startDate: string | null;
  durationMonths: number | null;
  employmentType: string;
  isPaid: boolean;
  salary: number | null;
  salaryUnit: string | null;
  shortDescription: string;
  tags: string[];
  validThrough: string | null;
  createdAt: string;
  _count?: {
    applications: number;
  };
}

export default function InternshipsPage() {
  const router = useRouter();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [paidOnly, setPaidOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch internships from API
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch('/api/internships/public');
        if (response.ok) {
          const data = await response.json();
          setInternships(data.internships || []);
          setFilteredInternships(data.internships || []);
        }
      } catch (error) {
        console.error('Failed to fetch internships:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = internships;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(lowerSearch) ||
          internship.company.toLowerCase().includes(lowerSearch) ||
          internship.city.toLowerCase().includes(lowerSearch) ||
          internship.shortDescription?.toLowerCase().includes(lowerSearch),
      );
    }

    if (selectedCompany) {
      filtered = filtered.filter((internship) =>
        internship.company
          .toLowerCase()
          .includes(selectedCompany.toLowerCase()),
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (internship) =>
          internship.city
            .toLowerCase()
            .includes(selectedLocation.toLowerCase()) ||
          internship.country
            .toLowerCase()
            .includes(selectedLocation.toLowerCase()),
      );
    }

    if (selectedMode) {
      if (selectedMode === 'remote') {
        filtered = filtered.filter((internship) => internship.remote);
      } else if (selectedMode === 'onsite') {
        filtered = filtered.filter((internship) => !internship.remote);
      } else if (selectedMode === 'hybrid') {
        filtered = filtered.filter(
          (internship) => internship.mode === 'HYBRID',
        );
      }
    }

    if (selectedType) {
      filtered = filtered.filter(
        (internship) =>
          internship.employmentType.toLowerCase() ===
          selectedType.toLowerCase(),
      );
    }

    if (selectedDuration) {
      const duration = parseInt(selectedDuration);
      filtered = filtered.filter(
        (internship) => internship.durationMonths === duration,
      );
    }

    if (paidOnly) {
      filtered = filtered.filter((internship) => internship.isPaid);
    }

    setFilteredInternships(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCompany,
    selectedLocation,
    selectedMode,
    selectedType,
    selectedDuration,
    paidOnly,
    internships,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInternships = filteredInternships.slice(startIndex, endIndex);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCompany('');
    setSelectedLocation('');
    setSelectedMode('');
    setSelectedType('');
    setSelectedDuration('');
    setPaidOnly(false);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCompany ||
    selectedLocation ||
    selectedMode ||
    selectedType ||
    selectedDuration ||
    paidOnly;

  const formatSalary = (internship: Internship) => {
    if (!internship.isPaid) return 'Unpaid';
    if (!internship.salary) return 'Paid';
    return `${internship.salary} ${internship.salaryUnit || 'MAD/month'}`;
  };

  const formatDuration = (months: number | null) => {
    if (!months) return 'Flexible';
    return `${months} Month${months > 1 ? 's' : ''}`;
  };

  const formatStartDate = (date: string | null) => {
    if (!date) return 'Flexible';
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const getTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const isExpired = (validThrough: string | null) => {
    if (!validThrough) return false;
    return new Date(validThrough) < new Date();
  };

  // Render filters section (used for both desktop and mobile)
  const FiltersContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {/* Company Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Company
        </Label>
        <Input
          placeholder="Search Company"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="border-border focus:border-primary"
        />
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Location
        </Label>
        <Input
          placeholder="City or Country"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border-border focus:border-primary"
        />
      </div>

      {/* Work Mode Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Work Mode
        </Label>
        <RadioGroup value={selectedMode} onValueChange={setSelectedMode}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem
              value="onsite"
              id={`${isMobile ? 'mobile-' : ''}onsite`}
            />
            <Label
              htmlFor={`${isMobile ? 'mobile-' : ''}onsite`}
              className="text-sm"
            >
              On-site
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem
              value="remote"
              id={`${isMobile ? 'mobile-' : ''}remote`}
            />
            <Label
              htmlFor={`${isMobile ? 'mobile-' : ''}remote`}
              className="text-sm"
            >
              Remote
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem
              value="hybrid"
              id={`${isMobile ? 'mobile-' : ''}hybrid`}
            />
            <Label
              htmlFor={`${isMobile ? 'mobile-' : ''}hybrid`}
              className="text-sm"
            >
              Hybrid
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Employment Type Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Employment Type
        </Label>
        <RadioGroup value={selectedType} onValueChange={setSelectedType}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem
              value="full-time"
              id={`${isMobile ? 'mobile-' : ''}fulltime`}
            />
            <Label
              htmlFor={`${isMobile ? 'mobile-' : ''}fulltime`}
              className="text-sm"
            >
              Full Time
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem
              value="part-time"
              id={`${isMobile ? 'mobile-' : ''}parttime`}
            />
            <Label
              htmlFor={`${isMobile ? 'mobile-' : ''}parttime`}
              className="text-sm"
            >
              Part Time
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Duration
        </Label>
        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
          <SelectTrigger className="border-border">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Month</SelectItem>
            <SelectItem value="2">2 Months</SelectItem>
            <SelectItem value="3">3 Months</SelectItem>
            <SelectItem value="4">4 Months</SelectItem>
            <SelectItem value="5">5 Months</SelectItem>
            <SelectItem value="6">6 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Paid Only Filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`${isMobile ? 'mobile-' : ''}paidOnly`}
            checked={paidOnly}
            onCheckedChange={(checked) => setPaidOnly(checked as boolean)}
          />
          <Label
            htmlFor={`${isMobile ? 'mobile-' : ''}paidOnly`}
            className="text-sm"
          >
            Paid Internships Only
          </Label>
        </div>
      </div>
    </>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading internships...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Filters (Desktop Only) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="p-6 border-2 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <FiltersContent />

              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="w-full"
                disabled={!hasActiveFilters}
              >
                Reset Filters
              </Button>
            </Card>
          </div>

          {/* Right Content - Search and Results */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2">
                        Active
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full sm:max-w-md overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersContent isMobile />
                    <div className="flex gap-2">
                      <Button
                        onClick={clearAllFilters}
                        variant="outline"
                        className="flex-1"
                      >
                        Clear All
                      </Button>
                      <Button
                        onClick={() => setMobileFiltersOpen(false)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-12 py-3 h-12 text-base border-2 focus:border-primary"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredInternships.length === 0
                  ? 'No internships found'
                  : `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredInternships.length)} of ${filteredInternships.length} internships`}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(parseInt(value))}
                >
                  <SelectTrigger className="w-16 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Internship Cards */}
            {currentInternships.length === 0 ? (
              <Card className="p-12 text-center">
                <Briefcase className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No internships found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {hasActiveFilters
                    ? 'Try adjusting your filters to find more opportunities'
                    : 'Check back later for new internship opportunities'}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear all filters
                  </Button>
                )}
              </Card>
            ) : (
              <div className="space-y-4">
                {currentInternships.map((internship) => (
                  <Card
                    key={internship.id}
                    className={`p-5 md:p-6 hover:shadow-lg transition-all duration-200 border-2 cursor-pointer ${
                      isExpired(internship.validThrough) ? 'opacity-60' : ''
                    }`}
                    onClick={() => router.push(`/internships/${internship.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex gap-4 flex-1 min-w-0">
                        {/* Company Avatar */}
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/10">
                          <Building2 className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Title & Company */}
                          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                            {internship.title}
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            {internship.company}
                          </p>

                          {/* Meta Information */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="truncate">
                                {internship.remote ? 'Remote' : internship.city}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="truncate">
                                {formatStartDate(internship.startDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="truncate">
                                {formatDuration(internship.durationMonths)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Banknote className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="truncate">
                                {formatSalary(internship)}
                              </span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="secondary"
                              className={
                                internship.employmentType === 'full-time'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                              }
                            >
                              {internship.employmentType === 'full-time'
                                ? 'Full Time'
                                : 'Part Time'}
                            </Badge>
                            {internship.remote && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              >
                                Remote
                              </Badge>
                            )}
                            {internship.isPaid && (
                              <Badge
                                variant="secondary"
                                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                              >
                                Paid
                              </Badge>
                            )}
                            {internship.tags?.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Posted Date & Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                        <p className="text-xs text-muted-foreground order-2 sm:order-1">
                          {getTimeAgo(internship.createdAt)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 order-1 sm:order-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Save functionality here
                          }}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                      {internship.validThrough && (
                        <p className="text-xs text-muted-foreground">
                          {isExpired(internship.validThrough)
                            ? 'Application closed'
                            : `Apply by ${format(new Date(internship.validThrough), 'MMM dd, yyyy')}`}
                        </p>
                      )}
                      <div className="ml-auto">
                        {isExpired(internship.validThrough) ? (
                          <Badge variant="destructive">Closed</Badge>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/internships/${internship.id}`);
                            }}
                          >
                            View Details →
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                        size="sm"
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className="w-9 h-9 p-0"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
