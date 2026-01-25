'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CheckCircle2,
  User,
  Briefcase,
  Target,
  ArrowRight,
  ArrowLeft,
  Camera,
  Calendar as CalendarIcon,
  Info,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Globe,
  MapPin,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Countries and Cities data
const COUNTRIES_CITIES: Record<string, string[]> = {
  Morocco: [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Fes',
    'Tangier',
    'Agadir',
    'Meknes',
    'Oujda',
    'Kenitra',
    'Tetouan',
    'Safi',
    'El Jadida',
    'Nador',
    'Beni Mellal',
    'Khouribga',
  ],
  France: [
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Nantes',
    'Strasbourg',
    'Montpellier',
    'Bordeaux',
    'Lille',
  ],
  'United States': [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
    'San Francisco',
    'Seattle',
    'Boston',
    'Miami',
  ],
  'United Kingdom': [
    'London',
    'Birmingham',
    'Manchester',
    'Glasgow',
    'Liverpool',
    'Leeds',
    'Sheffield',
    'Edinburgh',
    'Bristol',
    'Cardiff',
  ],
  Germany: [
    'Berlin',
    'Hamburg',
    'Munich',
    'Cologne',
    'Frankfurt',
    'Stuttgart',
    'Düsseldorf',
    'Leipzig',
    'Dortmund',
    'Essen',
  ],
  Spain: [
    'Madrid',
    'Barcelona',
    'Valencia',
    'Seville',
    'Zaragoza',
    'Málaga',
    'Murcia',
    'Palma',
    'Las Palmas',
    'Bilbao',
  ],
  Italy: [
    'Rome',
    'Milan',
    'Naples',
    'Turin',
    'Palermo',
    'Genoa',
    'Bologna',
    'Florence',
    'Bari',
    'Catania',
  ],
  Canada: [
    'Toronto',
    'Montreal',
    'Vancouver',
    'Calgary',
    'Edmonton',
    'Ottawa',
    'Winnipeg',
    'Quebec City',
    'Hamilton',
    'Halifax',
  ],
  Netherlands: [
    'Amsterdam',
    'Rotterdam',
    'The Hague',
    'Utrecht',
    'Eindhoven',
    'Groningen',
    'Tilburg',
    'Almere',
    'Breda',
    'Nijmegen',
  ],
  Belgium: [
    'Brussels',
    'Antwerp',
    'Ghent',
    'Charleroi',
    'Liège',
    'Bruges',
    'Namur',
    'Leuven',
    'Mons',
    'Mechelen',
  ],
  Switzerland: [
    'Zurich',
    'Geneva',
    'Basel',
    'Bern',
    'Lausanne',
    'Winterthur',
    'Lucerne',
    'St. Gallen',
    'Lugano',
    'Biel',
  ],
  'United Arab Emirates': [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain',
    'Al Ain',
  ],
  'Saudi Arabia': [
    'Riyadh',
    'Jeddah',
    'Mecca',
    'Medina',
    'Dammam',
    'Khobar',
    'Tabuk',
    'Abha',
  ],
  Qatar: ['Doha', 'Al Wakrah', 'Al Khor', 'Dukhan', 'Mesaieed'],
  Egypt: [
    'Cairo',
    'Alexandria',
    'Giza',
    'Sharm El Sheikh',
    'Luxor',
    'Aswan',
    'Hurghada',
    'Port Said',
  ],
  Tunisia: [
    'Tunis',
    'Sfax',
    'Sousse',
    'Kairouan',
    'Bizerte',
    'Gabès',
    'Ariana',
    'Gafsa',
  ],
  Algeria: [
    'Algiers',
    'Oran',
    'Constantine',
    'Annaba',
    'Blida',
    'Batna',
    'Sétif',
    'Djelfa',
  ],
  Turkey: [
    'Istanbul',
    'Ankara',
    'Izmir',
    'Bursa',
    'Antalya',
    'Adana',
    'Konya',
    'Gaziantep',
  ],
  Portugal: [
    'Lisbon',
    'Porto',
    'Amadora',
    'Braga',
    'Coimbra',
    'Funchal',
    'Setúbal',
    'Almada',
  ],
  Poland: [
    'Warsaw',
    'Krakow',
    'Lodz',
    'Wroclaw',
    'Poznan',
    'Gdansk',
    'Szczecin',
    'Bydgoszcz',
  ],
  Sweden: [
    'Stockholm',
    'Gothenburg',
    'Malmö',
    'Uppsala',
    'Västerås',
    'Örebro',
    'Linköping',
    'Helsingborg',
  ],
  Austria: [
    'Vienna',
    'Graz',
    'Linz',
    'Salzburg',
    'Innsbruck',
    'Klagenfurt',
    'Villach',
    'Wels',
  ],
  Ireland: [
    'Dublin',
    'Cork',
    'Limerick',
    'Galway',
    'Waterford',
    'Drogheda',
    'Dundalk',
    'Sligo',
  ],
  Denmark: [
    'Copenhagen',
    'Aarhus',
    'Odense',
    'Aalborg',
    'Esbjerg',
    'Randers',
    'Kolding',
    'Horsens',
  ],
  Norway: [
    'Oslo',
    'Bergen',
    'Trondheim',
    'Stavanger',
    'Drammen',
    'Fredrikstad',
    'Kristiansand',
    'Tromsø',
  ],
  Finland: [
    'Helsinki',
    'Espoo',
    'Tampere',
    'Vantaa',
    'Oulu',
    'Turku',
    'Jyväskylä',
    'Lahti',
  ],
  Singapore: ['Singapore'],
  Japan: [
    'Tokyo',
    'Osaka',
    'Kyoto',
    'Yokohama',
    'Nagoya',
    'Sapporo',
    'Fukuoka',
    'Kobe',
  ],
  'South Korea': [
    'Seoul',
    'Busan',
    'Incheon',
    'Daegu',
    'Daejeon',
    'Gwangju',
    'Suwon',
    'Ulsan',
  ],
  Australia: [
    'Sydney',
    'Melbourne',
    'Brisbane',
    'Perth',
    'Adelaide',
    'Gold Coast',
    'Canberra',
    'Newcastle',
  ],
  India: [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
  ],
  Brazil: [
    'São Paulo',
    'Rio de Janeiro',
    'Brasília',
    'Salvador',
    'Fortaleza',
    'Belo Horizonte',
    'Manaus',
    'Curitiba',
  ],
  Mexico: [
    'Mexico City',
    'Guadalajara',
    'Monterrey',
    'Puebla',
    'Tijuana',
    'León',
    'Juárez',
    'Zapopan',
  ],
};

const COUNTRIES = Object.keys(COUNTRIES_CITIES).sort();

const STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Profile Photo', icon: Camera },
  { id: 3, title: 'Education', icon: Briefcase },
  { id: 4, title: 'Preferences', icon: Target },
];

export default function OnboardingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [profileImage, setProfileImage] = useState<string>(
    session?.user?.image || '',
  );
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    // Step 2: Personal Info
    phone: '',
    city: '',
    country: '',

    // Step 3: Education
    university: '',
    faculty: '',
    degree: '',
    level: '',
    graduationYear: new Date().getFullYear() + 1,

    // Step 4: Preferences
    skills: '',
    preferredLocations: '',
    workMode: 'HYBRID',
    linkedinUrl: '',
    githubUrl: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (session?.user?.image) {
      setProfileImage(session.user.image);
    }
  }, [status, router, session]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate Step 1: Personal Info
    if (
      currentStep === 1 &&
      (!formData.phone || !formData.city || !formData.country || !dateOfBirth)
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Step 2 is profile photo - optional, can skip

    // Validate Step 3: Education
    if (
      currentStep === 3 &&
      (!formData.university ||
        !formData.faculty ||
        !formData.degree ||
        !formData.level)
    ) {
      toast.error('Please fill in all required education fields');
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    // Validate Step 4: Preferences
    if (!formData.skills) {
      toast.error('Please add at least one skill');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: profileImage,
          dateOfBirth: dateOfBirth?.toISOString(),
          skills: formData.skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          preferredLocations: formData.preferredLocations
            .split(',')
            .map((l) => l.trim())
            .filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      // Update session to reflect onboarding completion
      await update();

      toast.success('Onboarding completed! Welcome to InternLink!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('Failed to complete onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-medium text-primary">
              Profile Setup
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Welcome to InternLink!</h1>
          <p className="text-muted-foreground">
            Complete your profile to unlock all features and find the perfect
            internship
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    isCurrent
                      ? 'text-primary'
                      : isCompleted
                        ? 'text-green-500'
                        : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground scale-110'
                        : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-muted'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {STEPS[currentStep - 1].title}
              <span className="text-sm font-normal text-muted-foreground">
                (Step {currentStep}/{STEPS.length})
              </span>
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Tell us about yourself'}
              {currentStep === 2 && 'Upload a professional profile photo'}
              {currentStep === 3 && 'Share your educational background'}
              {currentStep === 4 && 'What are you looking for?'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+212 612345678"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !dateOfBirth && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth
                            ? format(dateOfBirth, 'PPP')
                            : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={setDateOfBirth}
                          captionLayout="dropdown"
                          fromYear={1950}
                          toYear={new Date().getFullYear()}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1950-01-01')
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">
                      <Globe className="inline h-4 w-4 mr-1" />
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => {
                        handleInputChange('country', value);
                        handleInputChange('city', ''); // Reset city when country changes
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) =>
                        handleInputChange('city', value)
                      }
                      disabled={!formData.country}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            formData.country
                              ? 'Select a city'
                              : 'Select a country first'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.country &&
                          COUNTRIES_CITIES[formData.country]?.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Profile Photo */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Left Side - Avatar Preview */}
                  <div className="flex-1 flex flex-col items-center">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                      <Avatar className="relative h-40 w-40 border-4 border-background shadow-xl">
                        <AvatarImage
                          src={profileImage}
                          alt="Profile"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-5xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                          {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      {profileImage && (
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    <div className="mt-6 text-center">
                      <h3 className="text-lg font-semibold">
                        {session?.user?.name || 'Your Name'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Upload Section */}
                  <div className="flex-1 space-y-6">
                    <div className="p-6 border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all">
                      <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            Upload Your Photo
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Drag and drop or click to browse
                          </p>
                        </div>

                        <UploadButton<OurFileRouter, 'profileImage'>
                          endpoint="profileImage"
                          onClientUploadComplete={(res) => {
                            if (res?.[0]?.url) {
                              setProfileImage(res[0].url);
                              toast.dismiss();
                              toast.success(
                                'Profile photo uploaded successfully!',
                              );
                              setUploadingImage(false);
                            }
                          }}
                          onUploadError={(error: Error) => {
                            toast.dismiss();
                            toast.error(`Upload failed: ${error.message}`);
                            setUploadingImage(false);
                          }}
                          onUploadBegin={() => {
                            setUploadingImage(true);
                            toast.loading('Uploading your photo...');
                          }}
                          appearance={{
                            button:
                              'bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2.5 rounded-lg transition-colors ut-uploading:bg-primary/70',
                            allowedContent:
                              'text-xs text-muted-foreground mt-2',
                          }}
                        />
                      </div>
                    </div>

                    {/* Tips Card */}
                    <div className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg shrink-0">
                          <Sparkles className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                            Tips for a great photo
                          </h4>
                          <ul className="space-y-1.5 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              Use a clear, recent photo
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              Face the camera directly
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              Use good, natural lighting
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                              Professional attire recommended
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    {profileImage ? (
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Photo uploaded successfully!
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          No photo uploaded yet (optional)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="university">
                    University <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="university"
                    placeholder="Mohammed V University"
                    value={formData.university}
                    onChange={(e) =>
                      handleInputChange('university', e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="faculty">
                    Faculty/School <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="faculty"
                    placeholder="Faculty of Sciences"
                    value={formData.faculty}
                    onChange={(e) =>
                      handleInputChange('faculty', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree">
                      Degree <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="degree"
                      placeholder="Bachelor's, Master's"
                      value={formData.degree}
                      onChange={(e) =>
                        handleInputChange('degree', e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="level">
                      Current Level <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="level"
                      placeholder="3rd Year, 1st Year Master"
                      value={formData.level}
                      onChange={(e) =>
                        handleInputChange('level', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="graduationYear">
                    Expected Graduation Year
                  </Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 10}
                    value={formData.graduationYear}
                    onChange={(e) =>
                      handleInputChange(
                        'graduationYear',
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills">
                    Skills (comma-separated){' '}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="skills"
                    placeholder="JavaScript, React, Node.js, Python, Data Analysis"
                    value={formData.skills}
                    onChange={(e) =>
                      handleInputChange('skills', e.target.value)
                    }
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your skills separated by commas
                  </p>
                </div>
                <div>
                  <Label htmlFor="preferredLocations">
                    Preferred Locations (comma-separated)
                  </Label>
                  <Input
                    id="preferredLocations"
                    placeholder="Casablanca, Rabat, Remote"
                    value={formData.preferredLocations}
                    onChange={(e) =>
                      handleInputChange('preferredLocations', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="workMode">Work Mode Preference</Label>
                  <select
                    id="workMode"
                    value={formData.workMode}
                    onChange={(e) =>
                      handleInputChange('workMode', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="ON_SITE">On-site</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedinUrl}
                      onChange={(e) =>
                        handleInputChange('linkedinUrl', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      placeholder="https://github.com/yourusername"
                      value={formData.githubUrl}
                      onChange={(e) =>
                        handleInputChange('githubUrl', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              {currentStep < STEPS.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Completing...
                    </>
                  ) : (
                    <>
                      Complete Onboarding
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-muted-foreground hover:text-primary underline"
          >
            Skip for now (you can complete this later in settings)
          </button>
        </div>
      </div>
    </div>
  );
}
