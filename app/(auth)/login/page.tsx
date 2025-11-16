'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/auth';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import './login.css';

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: FormData) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
    });
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
            <span className="text-xl font-semibold text-gray-900">InternLink</span>
          </div>

          {/* Welcome Message */}
          <div className="space-y-2 animate-fade-in-up animate-delay-100">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-600">Hey, welcome back to your special place</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in-up animate-delay-200">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative hover-lift">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="stanley@gmail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative hover-lift">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-purple-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between animate-fade-in-up animate-delay-300">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-primary hover:text-secondary transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover-lift animate-fade-in-up animate-delay-400"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center animate-fade-in-up animate-delay-400">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/register" className="font-medium text-primary hover:text-secondary transition-colors">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden lg:flex lg:flex-1 lg:relative animate-slide-in-right">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 right-32 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          
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
                <h2 className="text-2xl font-bold text-white">
                  Secure & Fast
                </h2>
                <p className="text-purple-100 text-sm">
                  Experience seamless authentication with our advanced security features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}