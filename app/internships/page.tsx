'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, MapPin, Calendar, Clock, DollarSign, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Dummy data for internships
const dummyInternships = [
  {
    id: 1,
    title: 'Web Developer',
    company: 'TBN Software Solutions & Consultancy',
    location: 'Work From Home',
    startDate: 'Immediately',
    duration: '5 Months',
    stipend: 'Unpaid',
    lastDate: '28-02-2024',
    tags: ['Part Time', 'Pre Placement Opportunity'],
    posted: '24 Days Ago',
    logo: 'https://via.placeholder.com/50x50/4F46E5/FFFFFF?text=TBN',
    isClosed: false,
  },
  {
    id: 2,
    title: 'Hotel - Sales',
    company: 'PRASADS SP ENTERTAINMENT LLP',
    location: 'Vijayawada',
    startDate: '20-11-2023',
    duration: '6 Months',
    stipend: '₹ 11000',
    lastDate: '18-11-2023',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '26 Days Ago',
    logo: 'https://via.placeholder.com/50x50/EF4444/FFFFFF?text=PS',
    isClosed: false,
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'TRK ADVISORS',
    location: 'Work From Home',
    startDate: '30-11-2023',
    duration: '2 Months',
    stipend: 'Unpaid',
    lastDate: '29-12-2023',
    tags: ['Part Time', 'Preferably Male', 'Pre Placement Opportunity'],
    posted: '20 Days Ago',
    logo: 'https://via.placeholder.com/50x50/10B981/FFFFFF?text=TA',
    isClosed: false,
  },
  {
    id: 4,
    title: 'Marketing',
    company: 'ARRIBA LABS',
    location: 'Pune',
    startDate: '01-11-2023',
    duration: '6 Months',
    stipend: '₹ 10000',
    lastDate: '31-10-2023',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '30 Days Ago',
    logo: 'https://via.placeholder.com/50x50/F59E0B/FFFFFF?text=AL',
    isClosed: true,
  },
  {
    id: 5,
    title: 'Sales/Business Development',
    company: 'NoBroker',
    location: 'Bangalore',
    startDate: '15-11-2023',
    duration: '6 Months',
    stipend: '₹ 12000',
    lastDate: '14-11-2023',
    tags: ['Part Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '11 Days Ago',
    logo: 'https://via.placeholder.com/50x50/8B5CF6/FFFFFF?text=NB',
    isClosed: false,
  },
  {
    id: 6,
    title: 'Data Analytics Intern',
    company: 'TechCorp Solutions',
    location: 'Work From Home',
    startDate: '01-12-2023',
    duration: '3 Months',
    stipend: '₹ 8000',
    lastDate: '25-11-2023',
    tags: ['Full Time', 'Pre Placement Opportunity'],
    posted: '15 Days Ago',
    logo: 'https://via.placeholder.com/50x50/06B6D4/FFFFFF?text=TC',
    isClosed: false,
  },
  {
    id: 7,
    title: 'Java Developer Intern',
    company: 'CodeMasters Inc',
    location: 'Chennai',
    startDate: '10-12-2023',
    duration: '4 Months',
    stipend: '₹ 15000',
    lastDate: '05-12-2023',
    tags: ['Full Time', 'Regular (In-office)', 'Pre Placement Opportunity'],
    posted: '8 Days Ago',
    logo: 'https://via.placeholder.com/50x50/DC2626/FFFFFF?text=CM',
    isClosed: false,
  },
  {
    id: 8,
    title: 'Digital Marketing Intern',
    company: 'GrowthHub',
    location: 'Work From Home',
    startDate: 'Immediately',
    duration: '2 Months',
    stipend: '₹ 6000',
    lastDate: '30-11-2023',
    tags: ['Part Time', 'Pre Placement Opportunity'],
    posted: '5 Days Ago',
    logo: 'https://via.placeholder.com/50x50/059669/FFFFFF?text=GH',
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-1 h-6 bg-purple-600 rounded"></div>
                <div className="w-1 h-5 bg-purple-500 rounded"></div>
                <div className="w-1 h-4 bg-purple-400 rounded"></div>
                <div className="w-1 h-3 bg-purple-300 rounded"></div>
                <div className="w-1 h-2 bg-purple-200 rounded"></div>
              </div>
              <h1 className="text-2xl font-bold text-purple-900">INTERNLINK</h1>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-purple-900">
                  Filters
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Clear all
                </button>
              </div>

              {/* Profile Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-purple-900 mb-2 block">
                  Profile
                </Label>
                <Input
                  placeholder="Search Profile"
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              {/* Company Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-purple-900 mb-2 block">
                  Company
                </Label>
                <Input
                  placeholder="Select Company"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              {/* Stipend Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-purple-900 mb-2 block">
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
                <Label className="text-sm font-medium text-purple-900 mb-2 block">
                  Location
                </Label>
                <Input
                  placeholder="Select Location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border-purple-200 focus:border-purple-500"
                />
              </div>

              {/* Internship Type Filter */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-purple-900 mb-2 block">
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
                <Label className="text-sm font-medium text-purple-900 mb-2 block">
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
                <Label className="text-sm font-medium text-purple-900 mb-2 block">
                  Internship Duration
                </Label>
                <Select
                  value={selectedDuration}
                  onValueChange={setSelectedDuration}
                >
                  <SelectTrigger className="border-purple-200">
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
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Apply
              </Button>
            </Card>
          </div>

          {/* Right Content - Search and Results */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Input
                  placeholder="Search by Keywords UI/UX Designer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-20 py-3 border-purple-200 focus:border-purple-500"
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
                  <Button className="bg-purple-600 hover:bg-purple-700 h-8 w-8 p-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to{' '}
                {Math.min(endIndex, filteredInternships.length)} of{' '}
                {filteredInternships.length} Internships
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(parseInt(value))}
                >
                  <SelectTrigger className="w-16 border-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">Internships</span>
              </div>
            </div>

            {/* Internship Cards */}
            <div className="space-y-4">
              {currentInternships.map((internship) => (
                <Card
                  key={internship.id}
                  className="p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <img
                        src={internship.logo}
                        alt={internship.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-purple-900 mb-1">
                          {internship.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="text-sm text-gray-600">
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

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-purple-500" />
                            <span>Start Date</span>
                            <span className="font-medium">
                              {internship.startDate}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-purple-500" />
                            <span>Duration</span>
                            <span className="font-medium">
                              {internship.duration}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-purple-500" />
                            <span>Stipend</span>
                            <span className="font-medium">
                              {internship.stipend}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-purple-500" />
                            <span>Last Date</span>
                            <span className="font-medium">
                              {internship.lastDate}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {internship.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
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
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-2">
                        {internship.posted}
                      </p>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div></div>
                    <div className="flex space-x-2">
                      {internship.isClosed ? (
                        <Badge className="bg-red-100 text-red-800">
                          Internship Closed
                        </Badge>
                      ) : (
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => router.push(`/internships/${internship.id}`)}
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
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-purple-200 text-purple-700"
                >
                  Previous
                </Button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      onClick={() => setCurrentPage(pageNum)}
                      className={
                        currentPage === pageNum
                          ? 'bg-purple-600 text-white'
                          : 'border-purple-200 text-purple-700'
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="border-purple-200 text-purple-700"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  <div className="w-1 h-6 bg-purple-300 rounded"></div>
                  <div className="w-1 h-5 bg-purple-400 rounded"></div>
                  <div className="w-1 h-4 bg-purple-500 rounded"></div>
                  <div className="w-1 h-3 bg-purple-400 rounded"></div>
                  <div className="w-1 h-2 bg-purple-300 rounded"></div>
                </div>
                <h3 className="text-xl font-bold">INTERNLINK</h3>
              </div>
              <p className="text-purple-200 text-sm mb-4">
                Internlink - The premier destination connecting Students and
                corporate from across the globe for meaningful internships
                across all BFSI, GIS, AR/AI, Auditing, Creative fields and
                governments as well.
              </p>
              <Button variant="link" className="text-purple-300 p-0 h-auto">
                Read More
              </Button>
            </div>

            {/* Internships by Location */}
            <div>
              <h4 className="font-semibold mb-4">Internships by Location</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Hyderabad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Vijayawada
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Vizag/Vishakhapatnam
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Pune
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Chennai
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Mumbai
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Delhi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Internship in Kolkata
                  </a>
                </li>
              </ul>
            </div>

            {/* Internships by Profile */}
            <div>
              <h4 className="font-semibold mb-4">Internships by Profile</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Auditing / Accounting Internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Banking Internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Campus Ambassador internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Data Analytics Internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Digital marketing: SEO, SMO Internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Java Developer Internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sales/Business Development Internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Human Resources Internship
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Register Internship
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Registered Companies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Verify Certificate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Payment Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-sm text-purple-200 mb-2">
                Email: crm@internlink.app
              </p>
              <div className="flex space-x-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-300 hover:bg-purple-800"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-300 hover:bg-purple-800"
                >
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-300 text-purple-300 hover:bg-purple-800"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-800 mt-8 pt-8 flex justify-between items-center">
            <p className="text-sm text-purple-200">
              © 2024 All Rights Reserved Internlink | powered by Unwind Learning
              Labs Private Limited
            </p>
            <div className="flex space-x-4">
              <Button
                variant="link"
                className="text-purple-300 p-0 h-auto text-sm"
              >
                Terms
              </Button>
              <Button
                variant="link"
                className="text-purple-300 p-0 h-auto text-sm"
              >
                Privacy
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
