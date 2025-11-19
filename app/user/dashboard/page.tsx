'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { KPICards } from '@/components/dashboard/kpi-cards';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        userType="user"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title={activeTab === 'home' ? 'My Dashboard' : 'My Internships'}
          subtitle={
            activeTab === 'home'
              ? 'Welcome back, Intern!'
              : 'Track your internship applications'
          }
          showSearch={activeTab === 'internships'}
          showFilter={activeTab === 'internships'}
          showExport={activeTab === 'internships'}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'home' ? (
            <div className="space-y-6">
              {/* KPI Cards */}
              <KPICards userType="user" />

              {/* Additional Home Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Interviews */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upcoming Interviews
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">
                          SD
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Software Development Intern
                        </p>
                        <p className="text-xs text-gray-500">
                          TechCorp - Tomorrow, 2:00 PM
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">
                          UX
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          UX Design Intern
                        </p>
                        <p className="text-xs text-gray-500">
                          DesignHub - Friday, 10:00 AM
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Confirmed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Applications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Marketing Intern
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied 2 days ago
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Under Review
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Data Analyst Intern
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied 5 days ago
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Accepted
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Frontend Developer
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied 1 week ago
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        Rejected
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Internship Progress
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#8b5cf6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 36 * 0.75} ${
                            2 * Math.PI * 36
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-sm font-semibold text-purple-600">
                        75%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Current Internship
                    </p>
                    <p className="text-xs text-gray-500">12 weeks completed</p>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#10b981"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 36 * 0.9} ${
                            2 * Math.PI * 36
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-sm font-semibold text-green-600">
                        90%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Learning Goals
                    </p>
                    <p className="text-xs text-gray-500">
                      9 out of 10 completed
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 36 * 0.6} ${
                            2 * Math.PI * 36
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-sm font-semibold text-amber-600">
                        60%
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Project Tasks
                    </p>
                    <p className="text-xs text-gray-500">
                      6 out of 10 completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* My Internships Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Internships
                  </h2>
                  <p className="text-gray-600">
                    Track and manage your internship applications
                  </p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Browse Internships
                </button>
              </div>

              {/* Internships List */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Active Applications
                    </h3>
                    <span className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                      4 Active
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    {
                      title: 'Software Development Intern',
                      company: 'TechCorp Solutions',
                      location: 'Casablanca',
                      stipend: '3000 MAD/month',
                      status: 'Interview Scheduled',
                      statusColor: 'yellow',
                      appliedDate: '2 days ago',
                    },
                    {
                      title: 'UX Design Intern',
                      company: 'DesignHub Studio',
                      location: 'Rabat',
                      stipend: '2500 MAD/month',
                      status: 'Accepted',
                      statusColor: 'green',
                      appliedDate: '1 week ago',
                    },
                    {
                      title: 'Data Analyst Intern',
                      company: 'DataInsights Pro',
                      location: 'Remote',
                      stipend: '2800 MAD/month',
                      status: 'Under Review',
                      statusColor: 'blue',
                      appliedDate: '3 days ago',
                    },
                    {
                      title: 'Marketing Intern',
                      company: 'BrandBoost Agency',
                      location: 'Tangier',
                      stipend: '2200 MAD/month',
                      status: 'Rejected',
                      statusColor: 'red',
                      appliedDate: '5 days ago',
                    },
                  ].map((internship, index) => (
                    <div
                      key={index}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-sm">
                              {internship.company.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {internship.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {internship.company} • {internship.location}
                            </p>
                            <p className="text-sm text-purple-600 font-medium">
                              {internship.stipend}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span
                              className={`px-3 py-1 text-sm rounded-full ${
                                internship.statusColor === 'yellow'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : internship.statusColor === 'green'
                                  ? 'bg-green-100 text-green-800'
                                  : internship.statusColor === 'blue'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {internship.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {internship.appliedDate}
                            </p>
                          </div>
                          <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
