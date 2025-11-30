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
  DollarSign,
  Bookmark,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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

// Dummy data for internships - Moroccan Companies
const dummyInternships = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Capgemini Maroc',
    location: 'Casablanca',
    startDate: 'Immediately',
    duration: '6 Months',
    stipend: '3000 DH',
    lastDate: '15-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '5 Days Ago',
    logo: 'https://logo.clearbit.com/capgemini.com',
    isClosed: false,
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Attijariwafa Bank',
    location: 'Rabat',
    startDate: '01-02-2026',
    duration: '4 Months',
    stipend: '2500 DH',
    lastDate: '20-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '3 Days Ago',
    logo: 'https://logo.clearbit.com/attijariwafabank.com',
    isClosed: false,
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Majorel Morocco',
    location: 'Work From Home',
    startDate: '15-01-2026',
    duration: '3 Months',
    stipend: '2000 DH',
    lastDate: '10-01-2026',
    tags: ['Part Time', 'Pre Placement Opportunity'],
    posted: '7 Days Ago',
    logo: 'https://logo.clearbit.com/majorel.com',
    isClosed: false,
  },
  {
    id: 4,
    title: 'Marketing & Communication',
    company: 'Maroc Telecom',
    location: 'Casablanca',
    startDate: '01-01-2026',
    duration: '5 Months',
    stipend: '3500 DH',
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
    stipend: '3200 DH',
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
    stipend: '4000 DH',
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
    stipend: '3500 DH',
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
    stipend: '2200 DH',
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
    stipend: '3800 DH',
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
    stipend: '3000 DH',
    lastDate: '20-01-2026',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '8 Days Ago',
    logo: 'https://logo.clearbit.com/inwi.ma',
    isClosed: false,
  },
];

export default function InternshipsPage() {
  const router = useRouter();
  const [internships, setInternships] = useState(dummyInternships);
  const [filteredInternships, setFilteredInternships] =
    useState(dummyInternships);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedStipend, setSelectedStipend] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [prePlacementOnly, setPrePlacementOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter logic
  useEffect(() => {
    let filtered = internships;

    if (searchTerm) {
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProfile) {
      filtered = filtered.filter((internship) =>
        internship.title.toLowerCase().includes(selectedProfile.toLowerCase())
      );
    }

    if (selectedCompany) {
      filtered = filtered.filter((internship) =>
        internship.company.toLowerCase().includes(selectedCompany.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter((internship) =>
        internship.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((internship) =>
        selectedType === 'workFromHome'
          ? internship.location === 'Work From Home'
          : internship.location !== 'Work From Home'
      );
    }

    if (selectedTiming) {
      filtered = filtered.filter((internship) =>
        internship.tags.includes(
          selectedTiming === 'partTime' ? 'Part Time' : 'Full Time'
        )
      );
    }

    if (selectedStipend) {
      filtered = filtered.filter((internship) => {
        const stipend = internship.stipend;
        if (selectedStipend === '0k') return stipend === 'Unpaid';
        if (selectedStipend === '5k')
          return stipend.includes('6000') || stipend.includes('8000');
        if (selectedStipend === '10k')
          return stipend.includes('10000') || stipend.includes('11000');
        if (selectedStipend === '20k')
          return stipend.includes('15000') || stipend.includes('12000');
        if (selectedStipend === '25k+') return false; // No internships above 25k in dummy data
        return true;
      });
    }

    if (prePlacementOnly) {
      filtered = filtered.filter((internship) =>
        internship.tags.includes('Pre Placement Opportunity')
      );
    }

    setFilteredInternships(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedProfile,
    selectedCompany,
    selectedStipend,
    selectedLocation,
    selectedType,
    selectedTiming,
    selectedDuration,
    prePlacementOnly,
    internships,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInternships = filteredInternships.slice(startIndex, endIndex);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedProfile('');
    setSelectedCompany('');
    setSelectedStipend('');
    setSelectedLocation('');
    setSelectedType('');
    setSelectedTiming('');
    setSelectedDuration('');
    setPrePlacementOnly(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Filters (Desktop Only) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="p-6 border-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Filters
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Clear all
                </button>
              </div>

              {/* Profile Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Profile
                </Label>
                <Input
                  placeholder="Search Profile"
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  className="border-border focus:border-primary"
                />
              </div>

              {/* Company Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Company
                </Label>
                <Input
                  placeholder="Select Company"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="border-border focus:border-primary"
                />
              </div>

              {/* Stipend Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Minimum Monthly Stipend
                </Label>
                <RadioGroup
                  value={selectedStipend}
                  onValueChange={setSelectedStipend}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="0k" id="0k" />
                    <Label htmlFor="0k" className="text-sm">
                      0k
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="5k" id="5k" />
                    <Label htmlFor="5k" className="text-sm">
                      5k
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="10k" id="10k" />
                    <Label htmlFor="10k" className="text-sm">
                      10k
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="20k" id="20k" />
                    <Label htmlFor="20k" className="text-sm">
                      20k
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="25k+" id="25k+" />
                    <Label htmlFor="25k+" className="text-sm">
                      25k+
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Location
                </Label>
                <Input
                  placeholder="Select Location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border-border focus:border-primary"
                />
              </div>

              {/* Internship Type Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Internship Type
                </Label>
                <RadioGroup
                  value={selectedType}
                  onValueChange={setSelectedType}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular" className="text-sm">
                      Regular (In-office/On-field)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="workFromHome" id="workFromHome" />
                    <Label htmlFor="workFromHome" className="text-sm">
                      Work From Home
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Timing Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Timing
                </Label>
                <RadioGroup
                  value={selectedTiming}
                  onValueChange={setSelectedTiming}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="partTime" id="partTime" />
                    <Label htmlFor="partTime" className="text-sm">
                      Part Time
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="fullTime" id="fullTime" />
                    <Label htmlFor="fullTime" className="text-sm">
                      Full Time
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-foreground mb-2 block">
                  Internship Duration
                </Label>
                <Select
                  value={selectedDuration}
                  onValueChange={setSelectedDuration}
                >
                  <SelectTrigger className="border-border">
                    <SelectValue placeholder="Duration" />
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

              {/* Pre-Placement Filter */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="prePlacement"
                    checked={prePlacementOnly}
                    onCheckedChange={(checked) =>
                      setPrePlacementOnly(checked as boolean)
                    }
                  />
                  <Label htmlFor="prePlacement" className="text-sm">
                    Internship With Pre-Placement Opportunity
                  </Label>
                </div>
              </div>

              <Button
                onClick={() => {}}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Apply
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
                    {/* Profile Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Profile
                      </Label>
                      <Input
                        placeholder="Search Profile"
                        value={selectedProfile}
                        onChange={(e) => setSelectedProfile(e.target.value)}
                        className="border-border focus:border-primary"
                      />
                    </div>

                    {/* Company Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Company
                      </Label>
                      <Input
                        placeholder="Select Company"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="border-border focus:border-primary"
                      />
                    </div>

                    {/* Stipend Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Minimum Monthly Stipend
                      </Label>
                      <RadioGroup
                        value={selectedStipend}
                        onValueChange={setSelectedStipend}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="0k" id="mobile-0k" />
                          <Label htmlFor="mobile-0k" className="text-sm">
                            0k
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="5k" id="mobile-5k" />
                          <Label htmlFor="mobile-5k" className="text-sm">
                            5k
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="10k" id="mobile-10k" />
                          <Label htmlFor="mobile-10k" className="text-sm">
                            10k
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="20k" id="mobile-20k" />
                          <Label htmlFor="mobile-20k" className="text-sm">
                            20k
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="25k+" id="mobile-25k+" />
                          <Label htmlFor="mobile-25k+" className="text-sm">
                            25k+
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Location Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Location
                      </Label>
                      <Input
                        placeholder="Select Location"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="border-border focus:border-primary"
                      />
                    </div>

                    {/* Internship Type Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Internship Type
                      </Label>
                      <RadioGroup
                        value={selectedType}
                        onValueChange={setSelectedType}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="regular" id="mobile-regular" />
                          <Label htmlFor="mobile-regular" className="text-sm">
                            Regular (In-office/On-field)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem
                            value="workFromHome"
                            id="mobile-workFromHome"
                          />
                          <Label
                            htmlFor="mobile-workFromHome"
                            className="text-sm"
                          >
                            Work From Home
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Timing Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Timing
                      </Label>
                      <RadioGroup
                        value={selectedTiming}
                        onValueChange={setSelectedTiming}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem
                            value="partTime"
                            id="mobile-partTime"
                          />
                          <Label htmlFor="mobile-partTime" className="text-sm">
                            Part Time
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem
                            value="fullTime"
                            id="mobile-fullTime"
                          />
                          <Label htmlFor="mobile-fullTime" className="text-sm">
                            Full Time
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Duration Filter */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-2 block">
                        Internship Duration
                      </Label>
                      <Select
                        value={selectedDuration}
                        onValueChange={setSelectedDuration}
                      >
                        <SelectTrigger className="border-border">
                          <SelectValue placeholder="Duration" />
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

                    {/* Pre-Placement Filter */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mobile-prePlacement"
                          checked={prePlacementOnly}
                          onCheckedChange={(checked) =>
                            setPrePlacementOnly(checked as boolean)
                          }
                        />
                        <Label
                          htmlFor="mobile-prePlacement"
                          className="text-sm"
                        >
                          Internship With Pre-Placement Opportunity
                        </Label>
                      </div>
                    </div>

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
            <div className="mb-4 md:mb-6">
              <div className="relative">
                <Input
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-20 py-2 md:py-3 border-border focus:border-primary text-sm md:text-base"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchTerm('')}
                      className="p-1 h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Button className="bg-primary hover:bg-primary/90 h-8 w-8 p-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 md:mb-6">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Showing {startIndex + 1} to{' '}
                {Math.min(endIndex, filteredInternships.length)} of{' '}
                {filteredInternships.length} Internships
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
                  Show
                </span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(parseInt(value))}
                >
                  <SelectTrigger className="w-14 sm:w-16 border-border text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
                  Internships
                </span>
              </div>
            </div>

            {/* Internship Cards */}
            <div className="space-y-3 md:space-y-4">
              {currentInternships.map((internship) => (
                <Card
                  key={internship.id}
                  className="p-4 md:p-6 hover:shadow-lg transition-shadow border-2"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex space-x-3 md:space-x-4 w-full sm:w-auto">
                      <img
                        src={internship.logo}
                        alt={internship.company}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 line-clamp-2">
                          {internship.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <p className="text-xs md:text-sm text-muted-foreground truncate">
                            {internship.company}
                          </p>
                          {internship.location === 'Work From Home' ? (
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-800"
                            >
                              {internship.location}
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 text-gray-800 flex items-center space-x-1"
                            >
                              <MapPin className="h-3 w-3" />
                              <span>{internship.location}</span>
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-3 text-xs md:text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                            <span className="truncate">
                              Start: {internship.startDate}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                            <span className="truncate">
                              {internship.duration}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                            <span className="truncate">
                              {internship.stipend}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                            <span className="truncate">
                              Due: {internship.lastDate}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                          {internship.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`text-xs ${
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
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 w-full sm:w-auto">
                      <p className="text-xs text-muted-foreground order-2 sm:order-1">
                        {internship.posted}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 order-1 sm:order-2"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end items-center mt-4">
                    <div className="w-full sm:w-auto">
                      {internship.isClosed ? (
                        <Badge className="bg-destructive text-destructive-foreground w-full sm:w-auto justify-center">
                          Internship Closed
                        </Badge>
                      ) : (
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                          onClick={() =>
                            router.push(`/internships/${internship.id}`)
                          }
                        >
                          View Details →
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 md:mt-8 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-border text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                <div className="flex gap-1 sm:gap-2">
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const pageNum =
                      Math.max(1, Math.min(totalPages - 2, currentPage - 1)) +
                      i;
                    return (
                      <Button
                        key={pageNum}
                        size="sm"
                        variant={
                          currentPage === pageNum ? 'default' : 'outline'
                        }
                        onClick={() => setCurrentPage(pageNum)}
                        className={`text-xs sm:text-sm ${
                          currentPage === pageNum
                            ? 'bg-primary text-primary-foreground'
                            : 'border-border'
                        }`}
                      >
                        {pageNum}
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
                  className="border-border text-xs sm:text-sm"
                >
                  Next
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
