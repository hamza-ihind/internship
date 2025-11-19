'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Search,
  MoreHorizontal,
  Briefcase,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  userType: 'admin' | 'user';
}

export default function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string>('');

  const adminMenuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: LayoutDashboard,
      path: '/dashboard/admin',
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      path: '/dashboard/admin/users',
      badge: '12',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      path: '/dashboard/admin/messages',
      badge: '5',
    },
    {
      id: 'employee',
      label: 'Employee',
      icon: User,
      subItems: [
        {
          id: 'employees',
          label: 'Employees',
          path: '/dashboard/admin/employees',
        },
        { id: 'payroll', label: 'Payroll', path: '/dashboard/admin/payroll' },
        {
          id: 'attendance',
          label: 'Attendance',
          path: '/dashboard/admin/attendance',
        },
        { id: 'leaves', label: 'Leaves', path: '/dashboard/admin/leaves' },
        {
          id: 'statistics',
          label: 'Statistics',
          path: '/dashboard/admin/statistics',
        },
      ],
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: Calendar,
      path: '/dashboard/admin/schedule',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/dashboard/admin/profile',
    },
  ];

  const userMenuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: LayoutDashboard,
      path: '/dashboard/user',
    },
    {
      id: 'internships',
      label: 'Internships',
      icon: Briefcase,
      path: '/dashboard/user/internships',
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: FileText,
      path: '/dashboard/user/applications',
      badge: '3',
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      path: '/dashboard/user/messages',
      badge: '2',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/dashboard/user/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/dashboard/user/settings',
    },
  ];

  const menuItems = userType === 'admin' ? adminMenuItems : userMenuItems;

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const toggleExpandedSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  const isActive = (path: string) => pathname === path;
  const isSubItemActive = (subItems: any[]) =>
    subItems.some((item) => pathname === item.path);

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex space-x-1">
            <div className="w-1 h-6 bg-purple-600 rounded"></div>
            <div className="w-1 h-5 bg-purple-500 rounded"></div>
            <div className="w-1 h-4 bg-purple-400 rounded"></div>
            <div className="w-1 h-3 bg-purple-300 rounded"></div>
            <div className="w-1 h-2 bg-purple-200 rounded"></div>
          </div>
          <h1 className="text-xl font-bold text-gray-900">InternLink</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search here..."
            className="pl-10 pr-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
            Menu
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleExpandedSection(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isSubItemActive(item.subItems) ||
                        expandedSection === item.id
                          ? 'bg-purple-100 text-purple-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedSection === item.id ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {expandedSection === item.id && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavigation(subItem.path)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive(subItem.path)
                                ? 'bg-purple-100 text-purple-900 border-l-2 border-purple-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
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
                        className="bg-red-100 text-red-800 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <button
          onClick={() => handleNavigation('/dashboard/help')}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Help Center</span>
        </button>
        <button
          onClick={() => handleNavigation('/dashboard/settings')}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
        <button
          onClick={() => handleNavigation('/logout')}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export { Sidebar };