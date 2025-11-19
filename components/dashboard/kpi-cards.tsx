import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Building2,
  Briefcase,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

function KPICard({
  title,
  value,
  trend,
  subtitle,
  icon,
  iconColor = 'text-purple-600',
}: KPICardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          {icon || <div className={`${iconColor}`}>⋮</div>}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {trend && (
          <div className="flex items-center space-x-1 mt-1">
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.value}
            </span>
          </div>
        )}
        {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

interface DashboardKPICardsProps {
  userType: 'admin' | 'user';
}

export default function KPICards({
  userType,
}: DashboardKPICardsProps) {
  if (userType === 'admin') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Employee"
          value="1,356"
          trend={{ value: '2.4%', isPositive: true }}
          subtitle="Update: September 01, 2025"
          icon={<Users className="h-5 w-5 text-purple-600" />}
        />
        <KPICard
          title="Total Payroll"
          value="$143,494.09"
          trend={{ value: '1.02%', isPositive: true }}
          subtitle="Update: September 01, 2025"
          icon={<DollarSign className="h-5 w-5 text-purple-600" />}
        />
        <KPICard
          title="Net Pay"
          value="$143,218.09"
          trend={{ value: '2.0%', isPositive: true }}
          subtitle="Update: September 01, 2025"
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
        />
        <KPICard
          title="Taxes and Deduction"
          value="$276.00"
          trend={{ value: '1.6%', isPositive: false }}
          subtitle="Update: September 01, 2025"
          icon={<Building2 className="h-5 w-5 text-red-600" />}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KPICard
        title="Applied Internships"
        value="12"
        trend={{ value: '15%', isPositive: true }}
        subtitle="This month"
        icon={<Briefcase className="h-5 w-5 text-purple-600" />}
      />
      <KPICard
        title="Interviews Scheduled"
        value="5"
        trend={{ value: '25%', isPositive: true }}
        subtitle="Upcoming this week"
        icon={<Calendar className="h-5 w-5 text-blue-600" />}
      />
      <KPICard
        title="Total Stipend"
        value="$8,500"
        trend={{ value: '8%', isPositive: true }}
        subtitle="Earned this month"
        icon={<DollarSign className="h-5 w-5 text-green-600" />}
      />
      <KPICard
        title="Hours Completed"
        value="156"
        trend={{ value: '12%', isPositive: true }}
        subtitle="This month"
        icon={<Clock className="h-5 w-5 text-orange-600" />}
      />
    </div>
  );
}

export { KPICards };