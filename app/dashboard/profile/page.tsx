'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { toast } from 'react-hot-toast';
import {
  User,
  Briefcase,
  GraduationCap,
  FileText,
  Settings,
  X,
  Plus,
  Trash2,
  Save,
} from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  dateOfBirth: string;
  photoUrl: string;
  university: string;
  faculty: string;
  degree: string;
  level: string;
  graduationYear: number;
  gpa: number;
  transcriptUrl: string;
  skills: string[];
  languages: string[];
  cvUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  websiteUrl: string;
  preferredLocations: string[];
  workMode: string;
  earliestStartDate: string;
  weeklyAvailabilityHours: number;
  profilePublic: boolean;
  marketingConsent: boolean;
  experiences: any[];
  projects: any[];
  certifications: any[];
}

const page = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: 'Morocco',
    dateOfBirth: '',
    photoUrl: '',
    university: '',
    faculty: '',
    degree: '',
    level: '',
    graduationYear: new Date().getFullYear(),
    gpa: 0,
    transcriptUrl: '',
    skills: [],
    languages: [],
    cvUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    websiteUrl: '',
    preferredLocations: [],
    workMode: 'HYBRID',
    earliestStartDate: '',
    weeklyAvailabilityHours: 40,
    profilePublic: false,
    marketingConsent: false,
    experiences: [],
    projects: [],
    certifications: [],
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchProfileData();
    }
  }, [status, router]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.user?.name || '',
          email: data.user?.email || '',
          phone: data.profile?.phone || '',
          city: data.profile?.city || '',
          country: data.profile?.country || 'Morocco',
          dateOfBirth: data.profile?.dateOfBirth
            ? new Date(data.profile.dateOfBirth).toISOString().split('T')[0]
            : '',
          photoUrl: data.profile?.photoUrl || data.user?.image || '',
          university: data.profile?.university || '',
          faculty: data.profile?.faculty || '',
          degree: data.profile?.degree || '',
          level: data.profile?.level || '',
          graduationYear:
            data.profile?.graduationYear || new Date().getFullYear(),
          gpa: data.profile?.gpa || 0,
          transcriptUrl: data.profile?.transcriptUrl || '',
          skills: data.profile?.skills || [],
          languages: data.profile?.languages || [],
          cvUrl: data.profile?.cvUrl || '',
          linkedinUrl: data.profile?.linkedinUrl || '',
          githubUrl: data.profile?.githubUrl || '',
          portfolioUrl: data.profile?.portfolioUrl || '',
          websiteUrl: data.profile?.websiteUrl || '',
          preferredLocations: data.profile?.preferredLocations || [],
          workMode: data.profile?.workMode || 'HYBRID',
          earliestStartDate: data.profile?.earliestStartDate
            ? new Date(data.profile.earliestStartDate)
                .toISOString()
                .split('T')[0]
            : '',
          weeklyAvailabilityHours: data.profile?.weeklyAvailabilityHours || 40,
          profilePublic: data.profile?.profilePublic || false,
          marketingConsent: data.profile?.marketingConsent || false,
          experiences: data.experiences || [],
          projects: data.projects || [],
          certifications: data.certifications || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      await update({
        name: profileData.name,
        image: profileData.photoUrl,
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !profileData.languages.includes(newLanguage.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }));
  };

  const addLocation = () => {
    if (
      newLocation.trim() &&
      !profileData.preferredLocations.includes(newLocation.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, newLocation.trim()],
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (location: string) => {
    setProfileData((prev) => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter((l) => l !== location),
    }));
  };

  if (status === 'loading' || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account details and preferences
          </p>
        </div>
        <Button onClick={handleSaveProfile} disabled={isLoading} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="education">
            <GraduationCap className="h-4 w-4 mr-2" />
            Education
          </TabsTrigger>
          <TabsTrigger value="professional">
            <Briefcase className="h-4 w-4 mr-2" />
            Professional
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Personal Tab - See continuation in next message due to length */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={profileData.photoUrl}
                    alt={profileData.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {profileData.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label>Profile Picture</Label>
                  <div className="mt-2">
                    <UploadButton<OurFileRouter, 'profileImage'>
                      endpoint="profileImage"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                          handleInputChange('photoUrl', res[0].url);
                          toast.success('Profile picture uploaded!');
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`Upload failed: ${error.message}`);
                      }}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange('dateOfBirth', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profileData.country}
                    onChange={(e) =>
                      handleInputChange('country', e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Simplified other tabs for brevity - API handles all data */}
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>University</Label>
                  <Input
                    value={profileData.university}
                    onChange={(e) =>
                      handleInputChange('university', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Faculty</Label>
                  <Input
                    value={profileData.faculty}
                    onChange={(e) =>
                      handleInputChange('faculty', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={profileData.degree}
                    onChange={(e) =>
                      handleInputChange('degree', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Level</Label>
                  <Input
                    value={profileData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Graduation Year</Label>
                  <Input
                    type="number"
                    value={profileData.graduationYear}
                    onChange={(e) =>
                      handleInputChange(
                        'graduationYear',
                        parseInt(e.target.value),
                      )
                    }
                  />
                </div>
                <div>
                  <Label>GPA</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={profileData.gpa || ''}
                    onChange={(e) =>
                      handleInputChange('gpa', parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {profileData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="Add skill"
                />
                <Button onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Label className="mt-4 block">Professional Links</Label>
              <Input
                value={profileData.linkedinUrl}
                onChange={(e) =>
                  handleInputChange('linkedinUrl', e.target.value)
                }
                placeholder="LinkedIn URL"
              />
              <Input
                value={profileData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                placeholder="GitHub URL"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CV/Resume</CardTitle>
            </CardHeader>
            <CardContent>
              {profileData.cvUrl && (
                <div className="mb-3">
                  <a
                    href={profileData.cvUrl}
                    target="_blank"
                    className="text-primary"
                  >
                    View Current CV
                  </a>
                </div>
              )}
              <UploadButton<OurFileRouter, 'cvUploader'>
                endpoint="cvUploader"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    handleInputChange('cvUrl', res[0].url);
                    toast.success('CV uploaded!');
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Upload failed: ${error.message}`);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Preferred Locations</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.preferredLocations.map((loc) => (
                    <Badge key={loc} variant="secondary">
                      {loc}
                      <button
                        onClick={() => removeLocation(loc)}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                    placeholder="Add location"
                  />
                  <Button onClick={addLocation} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Work Mode</Label>
                <select
                  value={profileData.workMode}
                  onChange={(e) =>
                    handleInputChange('workMode', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ON_SITE">On-site</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
