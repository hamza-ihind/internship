'use client';

import { useState } from 'react';
import {
  Bell,
  Settings,
  HelpCircle,
  Search,
  Filter,
  Download,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showFilter?: boolean;
  showExport?: boolean;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;
}

export default function DashboardHeader({
  title,
  subtitle,
  showSearch = true,
  showFilter = true,
  showExport = true,
  showAddButton = false,
  addButtonText = 'Add New',
  onAddClick,
}: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}

          {/* Search and Filter Controls */}
          <div className="flex items-center space-x-4 mt-4">
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            )}

            {showFilter && (
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advance Filter
              </Button>
            )}

            {showExport && (
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Right Section - User Info and Actions */}
        <div className="flex items-center space-x-4">
          {/* Time Period Selector */}
          <Select defaultValue="this-month">
            <SelectTrigger className="w-32 border-gray-200">
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          {showAddButton && (
            <Button
              onClick={onAddClick}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {addButtonText}
            </Button>
          )}

          {/* Notification Bell */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3 cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=BS" />
                  <AvatarFallback className="bg-purple-600 text-white">
                    BS
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    Brooklyn Simmons
                  </p>
                  <p className="text-xs text-gray-500">
                    brooklyn.simmons@gmail.com
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => (window.location.href = '/dashboard/profile')}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => (window.location.href = '/dashboard/settings')}
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => (window.location.href = '/logout')}
                className="text-red-600"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export { DashboardHeader };