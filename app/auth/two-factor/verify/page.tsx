'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
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
import { Shield, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function TwoFactorVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const email = searchParams.get('email');
  const secret = searchParams.get('secret');
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  useEffect(() => {
    if (!email || !secret) {
      router.push('/auth/login');
    }
  }, [email, secret, router]);

  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Verify the 2FA code
      const verifyResponse = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret,
          token: otpValue,
          action: 'verify',
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.verified) {
        setError('Invalid verification code. Please try again.');
        setOtpValue('');
        setIsLoading(false);
        return;
      }

      // 2FA verified, now complete the sign in
      // We need to pass a special flag to bypass 2FA check
      const password = sessionStorage.getItem('temp_password');

      if (!password) {
        setError('Session expired. Please login again.');
        router.push('/auth/login');
        return;
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      // Clear the temporary password
      sessionStorage.removeItem('temp_password');

      if (result?.error) {
        setError('Failed to complete sign in');
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit when 6 digits are entered
  useEffect(() => {
    if (otpValue.length === 6) {
      handleVerify();
    }
  }, [otpValue]);

  if (!email || !secret) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-3 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Enter the 6-digit code from your authenticator app to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  Signing in as <strong>{email}</strong>
                </p>

                <div className="flex justify-center mb-6">
                  <InputOTP
                    value={otpValue}
                    onChange={setOtpValue}
                    maxLength={6}
                    disabled={isLoading}
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

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleVerify}
                  disabled={isLoading || otpValue.length !== 6}
                  className="w-full h-12"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Sign In'
                  )}
                </Button>
              </div>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <p>
                  Open your authenticator app (Google Authenticator, Authy,
                  etc.) to view your verification code.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TwoFactorVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <TwoFactorVerifyContent />
    </Suspense>
  );
}
