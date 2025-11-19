'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from '@/lib/session-provider';
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

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useSession();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'Invalid credentials') {
        toast.error('Incorrect email or password. Please try again.');
      } else if (error.message === 'Email not found') {
        toast.error('Email not found. Please check your email or sign up.');
      } else if (error.message === 'Account blocked') {
        toast.error('Account blocked or disabled. Please contact support.');
      } else if (error.message === 'Account not verified') {
        toast.error('Account not verified. Please check your email for verification.');
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex login-container">
      {/* Mobile Illustration - Only visible on small screens */}
      <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary to-accent rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Left Column - Login Form */}
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
            <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">
              Hey, welcome back to your special place
            </p>
          </div>

          {/* Login Form */}
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
                              placeholder="stanley@gmail.com"
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••••"
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
                </div>

                {/* Options Row */}
                <div className="flex items-center justify-between animate-fade-in-up animate-delay-300">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe((e.target as HTMLInputElement).checked)
                      }
                    />
                    <Label
                      htmlFor="remember-me"
                      className="text-sm text-gray-700 flex"
                    >
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-primary hover:text-secondary transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 animate-fade-in-up animate-delay-400"
                >
                  {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center animate-fade-in-up animate-delay-400">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link
                    href="/register"
                    className="font-medium text-primary hover:text-secondary transition-colors"
                  >
                    Sign Up
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
              {/* Phone Illustration */}
              <div className="relative mx-auto w-48 h-80 bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-4 border border-white border-opacity-20 animate-float">
                <div className="h-full bg-white bg-opacity-20 rounded-2xl p-4">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-6 h-6 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="w-6 h-6 bg-white bg-opacity-30 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                  </div>

                  {/* Fingerprint Area */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover-lift">
                      <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-40 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-white text-opacity-80 text-xs text-center">
                      Please tap your finger to your phone
                    </p>
                  </div>

                  {/* Success Indicator */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center animate-bounce">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 animate-fade-in-up animate-delay-200">
                <h2 className="text-2xl font-bold text-white">Secure & Fast</h2>
                <p className="text-purple-100 text-sm">
                  Experience seamless authentication with our advanced security
                  features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
