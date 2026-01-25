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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { toast } from 'react-hot-toast';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import {
  User,
  Lock,
  Bell,
  Shield,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Key,
  Globe,
  Loader2,
  ShieldCheck,
  ShieldOff,
  Save,
  MapPin,
  Settings,
} from 'lucide-react';
import Image from 'next/image';

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
    'San Francisco',
    'Seattle',
    'Boston',
    'Miami',
    'Austin',
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
  'United Arab Emirates': [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Al Ain',
  ],
  Netherlands: [
    'Amsterdam',
    'Rotterdam',
    'The Hague',
    'Utrecht',
    'Eindhoven',
    'Groningen',
    'Tilburg',
  ],
  Belgium: [
    'Brussels',
    'Antwerp',
    'Ghent',
    'Charleroi',
    'Liège',
    'Bruges',
    'Namur',
  ],
  Switzerland: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne'],
};
const COUNTRIES = Object.keys(COUNTRIES_CITIES).sort();

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    photoUrl: '',
    profilePublic: false,
    marketingConsent: false,
    emailNotifications: true,
    applicationUpdates: true,
    weeklyDigest: false,
    newInternships: true,
  });

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // 2FA state
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [twoFactorSecret, setTwoFactorSecret] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [isDisabling2FA, setIsDisabling2FA] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.user?.name || '',
          email: data.user?.email || '',
          phone: data.profile?.phone || '',
          city: data.profile?.city || '',
          country: data.profile?.country || '',
          photoUrl: data.profile?.photoUrl || data.user?.image || '',
          profilePublic: data.profile?.profilePublic || false,
          marketingConsent: data.profile?.marketingConsent || false,
          emailNotifications: data.profile?.emailNotifications ?? true,
          applicationUpdates: data.profile?.applicationUpdates ?? true,
          weeklyDigest: data.profile?.weeklyDigest ?? false,
          newInternships: data.profile?.newInternships ?? true,
        });
        setIs2FAEnabled(data.user?.isTwoFactorEnabled || false);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) throw new Error('Failed to save');

      await update({ name: profileData.name, image: profileData.photoUrl });
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordError('');

    if (!currentPassword) {
      setPasswordError('Current password is required');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to change password');
      }

      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setPasswordError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetup2FA = async () => {
    try {
      const response = await fetch('/api/auth/2fa/qrcode', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to generate QR code');

      const data = await response.json();
      setQrCode(data.qrCode);
      setTwoFactorSecret(data.secret);
      setShow2FASetup(true);
    } catch (error) {
      toast.error('Failed to setup 2FA');
    }
  };

  const handleVerify2FA = async () => {
    if (otpValue.length !== 6) return;

    setIsVerifying2FA(true);
    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: twoFactorSecret,
          token: otpValue,
          action: 'enable',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIs2FAEnabled(true);
        setShow2FASetup(false);
        setQrCode('');
        setTwoFactorSecret('');
        setOtpValue('');
        toast.success('Two-factor authentication enabled!');
        await update();
      } else {
        toast.error(data.error || 'Invalid code');
        setOtpValue('');
      }
    } catch (error) {
      toast.error('Verification failed');
    } finally {
      setIsVerifying2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    setIsDisabling2FA(true);
    try {
      const response = await fetch('/api/auth/2fa/disable', { method: 'POST' });
      if (response.ok) {
        setIs2FAEnabled(false);
        toast.success('Two-factor authentication disabled');
        await update();
      } else {
        toast.error('Failed to disable 2FA');
      }
    } catch (error) {
      toast.error('Failed to disable 2FA');
    } finally {
      setIsDisabling2FA(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user', { method: 'DELETE' });
      if (response.ok) {
        toast.success('Account deleted');
        router.push('/');
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isFetching) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Header with Save Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account preferences and security
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSaveProfile}
            disabled={isLoading}
            size="lg"
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save All Changes
          </Button>
        </div>

        {/* Profile Section */}
        <section id="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details and profile picture
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarImage
                    src={profileData.photoUrl}
                    alt={profileData.name}
                  />
                  <AvatarFallback className="text-2xl bg-primary/10">
                    {profileData.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Profile Picture
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Upload a new photo (max 4MB)
                  </p>
                  <UploadButton<OurFileRouter, 'profileImage'>
                    endpoint="profileImage"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.url) {
                        setProfileData((prev) => ({
                          ...prev,
                          photoUrl: res[0].url,
                        }));
                        toast.success('Photo uploaded!');
                      }
                    }}
                    onUploadError={(error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    appearance={{
                      button:
                        'bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2 rounded-md',
                      allowedContent: 'text-xs text-muted-foreground',
                    }}
                  />
                </div>
              </div>

              <Separator />

              {/* Name & Email */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Country & City */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Country
                  </Label>
                  <Select
                    value={profileData.country}
                    onValueChange={(value) =>
                      setProfileData((prev) => ({
                        ...prev,
                        country: value,
                        city: '',
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
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
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    City
                  </Label>
                  <Select
                    value={profileData.city}
                    onValueChange={(value) =>
                      setProfileData((prev) => ({ ...prev, city: value }))
                    }
                    disabled={!profileData.country}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          profileData.country
                            ? 'Select your city'
                            : 'Select country first'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {profileData.country &&
                        COUNTRIES_CITIES[profileData.country]?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Security Section */}
        <section id="security">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Shield className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your password and two-factor authentication
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Password Change */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Change Password</h3>
                </div>

                {passwordError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Minimum 8 characters"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                    variant="outline"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Two-Factor Authentication */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      Two-Factor Authentication
                    </h3>
                  </div>
                  <Badge
                    variant={is2FAEnabled ? 'default' : 'secondary'}
                    className={
                      is2FAEnabled
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : ''
                    }
                  >
                    {is2FAEnabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>

                {!show2FASetup ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full ${is2FAEnabled ? 'bg-green-500/10' : 'bg-muted'}`}
                      >
                        {is2FAEnabled ? (
                          <ShieldCheck className="h-6 w-6 text-green-500" />
                        ) : (
                          <ShieldOff className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {is2FAEnabled
                            ? 'Your account is protected with 2FA'
                            : 'Add an extra layer of security'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Use Google Authenticator or similar app
                        </p>
                      </div>
                    </div>
                    {is2FAEnabled ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isDisabling2FA}
                          >
                            {isDisabling2FA ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              'Disable 2FA'
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Disable Two-Factor Authentication?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove the extra security layer from
                              your account. You can always enable it again
                              later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDisable2FA}>
                              Disable 2FA
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <Button onClick={handleSetup2FA}>
                        <Shield className="h-4 w-4 mr-2" />
                        Enable 2FA
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="p-6 border rounded-lg bg-muted/30 space-y-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Scan this QR code with your authenticator app
                      </p>
                      {qrCode && (
                        <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                          <Image
                            src={qrCode}
                            alt="2FA QR Code"
                            width={180}
                            height={180}
                          />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-4">
                        Or enter this code manually:{' '}
                        <code className="bg-muted px-2 py-1 rounded font-mono">
                          {twoFactorSecret}
                        </code>
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label className="text-center block">
                        Enter the 6-digit verification code
                      </Label>
                      <div className="flex justify-center">
                        <InputOTP
                          value={otpValue}
                          onChange={setOtpValue}
                          maxLength={6}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className="flex justify-center gap-3">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShow2FASetup(false);
                            setOtpValue('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleVerify2FA}
                          disabled={isVerifying2FA || otpValue.length !== 6}
                        >
                          {isVerifying2FA ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                          )}
                          Verify & Enable
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notifications Section */}
        <section id="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Bell className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Choose what emails you want to receive
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between py-4">
                <div>
                  <Label className="text-base font-medium">
                    Application Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your application status changes
                  </p>
                </div>
                <Switch
                  checked={profileData.applicationUpdates}
                  onCheckedChange={(checked) =>
                    setProfileData((prev) => ({
                      ...prev,
                      applicationUpdates: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-4">
                <div>
                  <Label className="text-base font-medium">
                    New Internship Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for new opportunities matching your profile
                  </p>
                </div>
                <Switch
                  checked={profileData.newInternships}
                  onCheckedChange={(checked) =>
                    setProfileData((prev) => ({
                      ...prev,
                      newInternships: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-4">
                <div>
                  <Label className="text-base font-medium">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    A weekly summary of new opportunities and updates
                  </p>
                </div>
                <Switch
                  checked={profileData.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setProfileData((prev) => ({
                      ...prev,
                      weeklyDigest: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-4">
                <div>
                  <Label className="text-base font-medium">
                    Marketing & Promotions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Special offers, tips, and product updates
                  </p>
                </div>
                <Switch
                  checked={profileData.marketingConsent}
                  onCheckedChange={(checked) =>
                    setProfileData((prev) => ({
                      ...prev,
                      marketingConsent: checked,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Privacy Section */}
        <section id="privacy">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Eye className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control your profile visibility and data
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg">
                <div>
                  <Label className="text-base font-medium">
                    Public Profile
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow recruiters and companies to find your profile
                  </p>
                </div>
                <Switch
                  checked={profileData.profilePublic}
                  onCheckedChange={(checked) =>
                    setProfileData((prev) => ({
                      ...prev,
                      profilePublic: checked,
                    }))
                  }
                />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-3">
                  What's visible when your profile is public:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Your name and profile picture</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Education background and skills</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Work experience and projects</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <EyeOff className="h-4 w-4 flex-shrink-0" />
                    <span>Email and phone number (always private)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Danger Zone */}
        <section id="danger-zone">
          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-destructive">
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Irreversible actions for your account
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex-shrink-0">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your account and all of
                        your data, including your profile, applications, and
                        settings. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Yes, delete my account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
