'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 400) {
          if (result.error === 'Email invalid') {
            toast.error('Email invalid. Please enter a valid email address.');
          } else if (result.error === 'Weak password') {
            toast.error(
              'Weak password. Password must contain uppercase, lowercase, number, and special character.'
            );
          } else if (result.error === 'Missing fields') {
            toast.error('Missing fields. Please fill in all required fields.');
          } else if (result.details) {
            // Zod validation errors will be shown in the form
            toast.error('Please fix the validation errors in the form');
          }
        } else if (response.status === 409) {
          toast.error(
            'Email already exists. Please sign in or use a different email.'
          );
        } else {
          toast.error('Registration failed. Please try again.');
        }
        return;
      }

      // Success
      toast.success('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex login-container">
      {/* Mobile Illustration - Only visible on small screens */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Left Column - Registration Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8 form-card rounded-2xl p-8 lg:p-0 lg:bg-transparent">
          {/* Brand */}
          <div className="flex items-center space-x-2 animate-fade-in-up">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xl font-semibold text-gray-900">
              InternLink
            </span>
          </div>

          {/* Welcome Message */}
          <div className="space-y-2 animate-fade-in-up animate-delay-100">
            <h1 className="text-4xl font-bold text-gray-900">
              Join InternLink
            </h1>
            <p className="text-gray-600">
              Start your internship journey with us
            </p>
          </div>

          {/* Registration Form */}
          <div className="animate-fade-in-up animate-delay-200">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Full Name"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Email Address"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Create Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create Password"
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center hover:text-purple-600 transition-colors"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                              ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm Password"
                              className="pl-10 pr-10"
                            />
                            <Button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center hover:text-purple-600 transition-colors"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                              ) : (
                                <Eye className="h-5 w-5 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center animate-fade-in-up animate-delay-300">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={agreeToTerms}
                      onCheckedChange={(checked) =>
                        setAgreeToTerms(checked === true)
                      }
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="terms" className="text-gray-700">
                      I agree to the{' '}
                      <Link
                        href="/terms"
                        className="text-primary hover:text-secondary underline"
                      >
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/privacy"
                        className="text-primary hover:text-secondary underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting || !agreeToTerms}
                  className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 animate-fade-in-up animate-delay-400"
                >
                  {form.formState.isSubmitting
                    ? 'Creating Account...'
                    : 'Create Account'}
                </Button>

                {/* Login Link */}
                <div className="text-center animate-fade-in-up animate-delay-400">
                  <span className="text-gray-600">
                    Already have an account?{' '}
                  </span>
                  <Link
                    href="/login"
                    className="font-medium text-primary hover:text-secondary transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden lg:flex lg:flex-1 lg:relative animate-slide-in-right">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse-slow"></div>
          <div
            className="absolute bottom-32 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-40 right-32 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          ></div>

          {/* Main Illustration Area */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center space-y-8">
              {/* Success Illustration */}
              <div className="relative mx-auto w-48 h-80 bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-4 border border-white border-opacity-20 animate-float">
                <div className="h-full bg-white bg-opacity-20 rounded-2xl p-4 flex flex-col items-center justify-center">
                  {/* Success Icon */}
                  <div className="w-24 h-24 bg-green-500 bg-opacity-80 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex space-x-2 mb-4">
                    <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                    <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  <p className="text-white text-opacity-80 text-xs text-center">
                    Complete your profile to unlock opportunities
                  </p>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 animate-fade-in-up animate-delay-200">
                <h2 className="text-2xl font-bold text-white">
                  Join Thousands
                </h2>
                <p className="text-purple-100 text-sm">
                  Connect with top companies and start your career journey today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
