'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .max(100, { message: 'Email must be less than 100 characters' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please enter a valid email format',
    }),
});

type FormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          toast.error('Invalid email format. Please check your email address.');
        } else {
          toast.error('An error occurred. Please try again later.');
        }
        return;
      }

      // Success - show confirmation message
      setIsSubmitted(true);
      toast.success(
        'If an account with that email exists, a password reset link has been sent.'
      );
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex login-container">
        {/* Mobile Illustration - Only visible on small screens */}
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Left Column - Success Message */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md w-full space-y-8 form-card rounded-2xl p-8 lg:p-0 lg:bg-transparent text-center">
            {/* Brand */}
            <div className="flex items-center space-x-2 animate-fade-in-up justify-center">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xl font-semibold text-gray-900">
                InternLink
              </span>
            </div>

            {/* Success Icon */}
            <div className="animate-fade-in-up animate-delay-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Check Your Email
              </h1>
              <p className="text-gray-600 mb-6">
                If an account with that email exists, we've sent a password
                reset link to <strong>{form.getValues('email')}</strong>.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                The link will expire in 1 hour for security reasons.
              </p>
            </div>

            {/* Back to Login */}
            <div className="animate-fade-in-up animate-delay-200">
              <Link
                href="/login"
                className="text-primary hover:text-secondary font-medium"
              >
                Back to Sign In
              </Link>
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
                {/* Email Illustration */}
                <div className="relative mx-auto w-48 h-80 bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-4 border border-white border-opacity-20 animate-float">
                  <div className="h-full bg-white bg-opacity-20 rounded-2xl p-4 flex flex-col items-center justify-center">
                    {/* Email Icon */}
                    <div className="w-24 h-24 bg-green-500 bg-opacity-80 rounded-full flex items-center justify-center mb-6">
                      <Mail className="w-12 h-12 text-white" />
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex space-x-2 mb-4">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                      <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                    </div>

                    <p className="text-white text-opacity-80 text-xs text-center">
                      Check your email for the reset link
                    </p>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2 animate-fade-in-up animate-delay-200">
                  <h2 className="text-2xl font-bold text-white">Email Sent</h2>
                  <p className="text-purple-100 text-sm">
                    Follow the instructions in your email to reset your password
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex login-container">
      {/* Mobile Illustration - Only visible on small screens */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Left Column - Forgot Password Form */}
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
              Forgot Password?
            </h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="animate-fade-in-up animate-delay-200">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
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
                              placeholder="Enter your email address"
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Send Reset Link Button */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 animate-fade-in-up animate-delay-300"
                >
                  {form.formState.isSubmitting
                    ? 'Sending...'
                    : 'Send Reset Link'}
                </Button>

                {/* Back to Login Link */}
                <div className="text-center animate-fade-in-up animate-delay-400">
                  <span className="text-gray-600">
                    Remember your password?{' '}
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
              {/* Password Recovery Illustration */}
              <div className="relative mx-auto w-48 h-80 bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-4 border border-white border-opacity-20 animate-float">
                <div className="h-full bg-white bg-opacity-20 rounded-2xl p-4 flex flex-col items-center justify-center">
                  {/* Recovery Icon */}
                  <div className="w-24 h-24 bg-blue-500 bg-opacity-80 rounded-full flex items-center justify-center mb-6">
                    <Mail className="w-12 h-12 text-white" />
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex space-x-2 mb-4">
                    <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
                  </div>

                  <p className="text-white text-opacity-80 text-xs text-center">
                    Password recovery in progress
                  </p>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 animate-fade-in-up animate-delay-200">
                <h2 className="text-2xl font-bold text-white">
                  Password Recovery
                </h2>
                <p className="text-purple-100 text-sm">
                  We'll help you recover your account securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
