'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
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
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Loader2,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function TwoFactorSetupPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  const generateQRCode = async () => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/qrcode');
      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qrCode);
        setSecret(data.secret);
        setStep(2);
      } else {
        setError(data.error || 'Failed to generate QR code');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsGenerating(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    toast.success('Secret copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const verifyAndEnable = async () => {
    if (otpValue.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
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

      if (data.verified) {
        setStep(3);
        toast.success('2FA enabled successfully!');
      } else {
        setError('Invalid verification code. Please try again.');
        setOtpValue('');
      }
    } catch (err) {
      setError('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="w-full max-w-lg">
          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-3 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                {step === 1 && 'Enable Two-Factor Authentication'}
                {step === 2 && 'Scan QR Code'}
                {step === 3 && '2FA Enabled Successfully!'}
              </CardTitle>
              <CardDescription>
                {step === 1 &&
                  'Add an extra layer of security to your account using Google Authenticator'}
                {step === 2 && 'Scan this QR code with your authenticator app'}
                {step === 3 &&
                  'Your account is now protected with two-factor authentication'}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Introduction */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <Smartphone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">
                          1. Download Authenticator App
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Download Google Authenticator or any TOTP-compatible
                          app from your app store
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <Shield className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">2. Scan QR Code</h4>
                        <p className="text-sm text-muted-foreground">
                          Use the app to scan the QR code we'll show you
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">3. Enter Code</h4>
                        <p className="text-sm text-muted-foreground">
                          Enter the 6-digit code from your app to verify
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={generateQRCode}
                    disabled={isGenerating}
                    className="w-full h-12"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Step 2: QR Code & Verification */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* QR Code */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-white rounded-xl shadow-inner">
                      {qrCode && (
                        <img
                          src={qrCode}
                          alt="2FA QR Code"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Can't scan? Enter this code manually:
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <code className="px-3 py-2 bg-muted rounded-md text-sm font-mono">
                          {secret}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copySecret}
                          className="h-8 w-8 p-0"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* OTP Input */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm font-medium mb-4">
                        Enter the 6-digit code from your app
                      </p>
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
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      onClick={verifyAndEnable}
                      disabled={isLoading || otpValue.length !== 6}
                      className="w-full h-12"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Enable 2FA
                          <Shield className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                      <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Two-factor authentication has been enabled for your
                      account. You'll need to enter a code from your
                      authenticator app each time you sign in.
                    </p>
                  </div>

                  <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800 dark:text-amber-200">
                      <strong>Important:</strong> Keep your authenticator app
                      safe. If you lose access to it, you may not be able to
                      sign in to your account.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={() => router.push('/dashboard')}
                    className="w-full h-12"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
