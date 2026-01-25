'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
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
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  ShieldCheck,
  ShieldOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  Smartphone,
  QrCode,
} from 'lucide-react';
import Image from 'next/image';
import DashboardLayout from '@/components/layout/dashboard-layout';

export default function SecurityPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      checkTwoFactorStatus();
    }
  }, [status, router]);

  const checkTwoFactorStatus = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setIs2FAEnabled(data.user?.isTwoFactorEnabled || false);
      }
    } catch (error) {
      console.error('Failed to check 2FA status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetup2FA = async () => {
    setError('');
    setShowSetup(true);

    try {
      const response = await fetch('/api/auth/2fa/qrcode', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setSecret(data.secret);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      setShowSetup(false);
    }
  };

  const handleVerifyAndEnable = async () => {
    if (otpValue.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret,
          token: otpValue,
          action: 'enable',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIs2FAEnabled(true);
        setShowSetup(false);
        setSuccess('Two-factor authentication has been enabled successfully!');
        setQrCode('');
        setSecret('');
        setOtpValue('');
        await update(); // Update session
      } else {
        setError(data.error || 'Invalid verification code');
        setOtpValue('');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisable2FA = async () => {
    setIsDisabling(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
      });

      if (response.ok) {
        setIs2FAEnabled(false);
        setSuccess('Two-factor authentication has been disabled.');
        await update(); // Update session
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to disable 2FA');
      }
    } catch (err) {
      setError('Failed to disable 2FA. Please try again.');
    } finally {
      setIsDisabling(false);
    }
  };

  if (status === 'loading' || isLoading) {
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Security Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account security settings
          </p>
        </div>

        {success && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && !showSetup && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Two-Factor Authentication Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${is2FAEnabled ? 'bg-green-500/10' : 'bg-orange-500/10'}`}
                >
                  {is2FAEnabled ? (
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  ) : (
                    <Shield className="h-6 w-6 text-orange-600" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </div>
              </div>
              <Badge variant={is2FAEnabled ? 'default' : 'secondary'}>
                {is2FAEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!showSetup ? (
              <>
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Smartphone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app like Google Authenticator, Authy,
                      or 1Password to generate verification codes.
                    </p>
                  </div>
                </div>

                {is2FAEnabled ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-green-600">
                        2FA is active
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Your account is protected with two-factor authentication
                      </p>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isDisabling}
                        >
                          {isDisabling ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ShieldOff className="h-4 w-4 mr-2" />
                          )}
                          Disable 2FA
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Disable Two-Factor Authentication?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove the extra security layer from your
                            account. You can re-enable it at any time.
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
                  </div>
                ) : (
                  <Button onClick={handleSetup2FA} className="w-full sm:w-auto">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Enable Two-Factor Authentication
                  </Button>
                )}
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Set Up Authenticator App
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your authenticator app
                  </p>
                </div>

                {qrCode ? (
                  <div className="flex flex-col items-center gap-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm border">
                      <Image
                        src={qrCode}
                        alt="2FA QR Code"
                        width={200}
                        height={200}
                        className="w-48 h-48"
                      />
                    </div>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Or enter this code manually:
                      </p>
                      <code className="px-3 py-1.5 bg-muted rounded-md text-sm font-mono">
                        {secret}
                      </code>
                    </div>

                    <div className="w-full max-w-sm space-y-4">
                      <div className="text-center">
                        <p className="text-sm font-medium mb-3">
                          Enter the 6-digit code from your app:
                        </p>
                        <div className="flex justify-center">
                          <InputOTP
                            value={otpValue}
                            onChange={setOtpValue}
                            maxLength={6}
                            disabled={isVerifying}
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
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setShowSetup(false);
                            setQrCode('');
                            setSecret('');
                            setOtpValue('');
                            setError('');
                          }}
                          disabled={isVerifying}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={handleVerifyAndEnable}
                          disabled={isVerifying || otpValue.length !== 6}
                        >
                          {isVerifying ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            'Verify & Enable'
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Security Info */}
        <Card>
          <CardHeader>
            <CardTitle>Why Enable 2FA?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  Protects your account even if your password is compromised
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  Uses time-based one-time passwords (TOTP) for secure
                  verification
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  Compatible with popular authenticator apps like Google
                  Authenticator and Authy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <span>
                  Industry-standard security used by major companies worldwide
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
