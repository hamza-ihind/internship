'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  MessageSquare,
  Package,
  FileText,
  BarChart3,
  Bot,
  Settings,
  Shield,
  HelpCircle,
  ChevronRight,
  Search,
  Bell,
  Gift,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const isSubItemActive = (subItems: any[]) =>
    subItems.some((item) => pathname === item.path);

  const toggleExpandedSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const generalItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/home',
    },
    {
      id: 'payment',
      label: 'Payment',
      icon: CreditCard,
      path: '/admin/payment',
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      path: '/admin/customers',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      path: '/admin/messages',
      badge: '8',
    },
  ];

  const toolsItems = [
    {
      id: 'product',
      label: 'Product',
      icon: Package,
      path: '/admin/product',
    },
    {
      id: 'invoice',
      label: 'Invoice',
      icon: FileText,
      path: '/admin/invoice',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: Bot,
      path: '/admin/automation',
      badge: 'BETA',
    },
  ];

  const supportItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      path: '/admin/security',
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      path: '/admin/help',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg rounded-r-2xl flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">InternLink</span>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 text-xs"
            >
              Admin
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* General Section */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              General
            </p>
            <nav className="space-y-1">
              {generalItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-100 text-purple-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tools Section */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Tools
            </p>
            <nav className="space-y-1">
              {toolsItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-100 text-purple-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Support Section */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Support
            </p>
            <nav className="space-y-1">
              {supportItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-purple-100 text-purple-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Team Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Team
            </p>
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-purple-600">
                    M
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Marketing
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-3">
            Upgrade Plan
          </Button>
          <p className="text-xs text-gray-500 text-center">
            © 2023 InternLink, Inc.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Application Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search Section */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-10 pr-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-600 text-xs"
                  >
                    ⌘ + F
                  </Badge>
                </div>
              </div>
              <span className="text-sm text-gray-600">internlink.ma</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Utility Icons */}
              <Button variant="ghost" size="sm" className="relative">
                <Gift className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">3</span>
                </span>
              </Button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://via.placeholder.com/32x32/4F46E5/FFFFFF?text=YS" />
                      <AvatarFallback className="bg-purple-600 text-white">
                        YS
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">
                        Young Alaska
                      </p>
                      <p className="text-xs text-gray-500">Business</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleNavigation('/admin/profile')}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigation('/admin/settings')}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleNavigation('/logout')}
                    className="text-red-600"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select defaultValue="oct-nov">
                <SelectTrigger className="w-40 border-gray-200">
                  <SelectValue placeholder="Oct 18 - Nov 18" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oct-nov">Oct 18 - Nov 18</SelectItem>
                  <SelectItem value="sep-oct">Sep 18 - Oct 18</SelectItem>
                  <SelectItem value="aug-sep">Aug 18 - Sep 18</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-24 border-gray-200">
                  <SelectValue placeholder="Monthly" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <span className="text-sm">Filter</span>
              </Button>
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <span className="text-sm">Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}