'use client';

import {
  TrendingUp,
  TrendingDown,
  Eye,
  DollarSign,
  Activity,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/admin-layout';

interface MetricCardProps {
  title: string;
  value: string;
  trend: { value: string; isPositive: boolean };
  icon: React.ReactNode;
}

function MetricCard({ title, value, trend, icon }: MetricCardProps) {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-sm font-medium text-gray-600">{title}</span>
          </div>
          <Badge
            variant="secondary"
            className={`text-xs font-medium ${
              trend.isPositive
                ? 'bg-green-100 text-green-800'
                : 'bg-pink-100 text-pink-800'
            }`}
          >
            {trend.value} {trend.isPositive ? '↗' : '↘'}
          </Badge>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}

function SalesOverviewChart() {
  const data = [
    { month: 'Oct', value: 2888.2, label: '$2,888.20' },
    { month: 'Nov', value: 1765.09, label: '$1,765.09' },
    { month: 'Dec', value: 4005.65, label: '$4,005.65' },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Sales Overview
            </h3>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">$9,257.51</div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 text-xs"
            >
              15.8% ↗
            </Badge>
            <span className="text-sm text-gray-600">+ $143.50 increased</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 text-gray-700"
          >
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 text-gray-700"
          >
            Sort
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-48 mb-4">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 px-2">
              <div className="text-xs text-gray-600 mb-2">{item.label}</div>
              <div
                className="w-full bg-gradient-to-t from-purple-600 to-blue-600 rounded-t"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
              <div className="text-xs text-gray-600 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            <span>China</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            <span>EU</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            <span>USA</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            <span>Canada</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            <span>Other</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TotalSubscriberChart() {
  const weekData = [
    { day: 'Sun', value: 2500 },
    { day: 'Mon', value: 3200 },
    { day: 'Tue', value: 3874 },
    { day: 'Wed', value: 3400 },
    { day: 'Thu', value: 2900 },
    { day: 'Fri', value: 3100 },
    { day: 'Sat', value: 2800 },
  ];

  const maxValue = Math.max(...weekData.map((d) => d.value));

  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Total Subscriber
          </h3>
        </div>
        <select className="text-sm border border-gray-200 rounded-md px-2 py-1 text-gray-700">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Daily</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-2">24,473</div>
        <div className="flex items-center space-x-2 mb-6">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 text-xs"
          >
            8.3% ↗
          </Badge>
          <span className="text-sm text-gray-600">+ 749 Increased</span>
        </div>
        <div className="flex items-end justify-between h-32">
          {weekData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1 px-1">
              <div
                className="w-full bg-gradient-to-t from-purple-600 to-blue-600 rounded-t"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
              <div className="text-xs text-gray-600 mt-2">{item.day}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SalesDistribution() {
  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Sales Distribution
        </h3>
        <select className="text-sm border border-gray-200 rounded-md px-2 py-1 text-gray-700">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Website</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">$374.82</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Mobile App</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">$241.60</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-700">Other</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">$213.42</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IntegrationList() {
  const integrations = [
    { name: 'Stripe', type: 'Finance', rate: '40%', profit: '$650.00' },
    { name: 'Zapier', type: 'CRM', rate: '80%', profit: '$720.50' },
    { name: 'Shopify', type: 'Marketplace', rate: '20%', profit: '$432.25' },
  ];

  return (
    <Card className="bg-white shadow-sm border-0 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          List of Integration
        </h3>
        <Button
          variant="link"
          className="text-purple-600 hover:text-purple-700 text-sm"
        >
          See All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                  APPLICATION
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                  TYPE
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                  RATE
                </th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                  PROFIT
                </th>
              </tr>
            </thead>
            <tbody>
              {integrations.map((integration, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {integration.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-700">
                    {integration.type}
                  </td>
                  <td className="py-3 px-2 text-sm text-gray-700">
                    {integration.rate}
                  </td>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-900">
                    {integration.profit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminHome() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Page Views"
            value="12,450"
            trend={{ value: '15.8%', isPositive: true }}
            icon={<Eye className="h-5 w-5 text-gray-600" />}
          />
          <MetricCard
            title="Total Revenue"
            value="$363.95"
            trend={{ value: '34.0%', isPositive: false }}
            icon={<DollarSign className="h-5 w-5 text-gray-600" />}
          />
          <MetricCard
            title="Bounce Rate"
            value="86.5%"
            trend={{ value: '24.2%', isPositive: true }}
            icon={<Activity className="h-5 w-5 text-gray-600" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesOverviewChart />
          <TotalSubscriberChart />
        </div>

        {/* Lower Row Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesDistribution />
          <IntegrationList />
        </div>
      </div>
    </AdminLayout>
  );
}
