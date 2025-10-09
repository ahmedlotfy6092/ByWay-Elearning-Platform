import { Users, BookOpen, Layers } from "lucide-react";
import { Card } from "./ui/card";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

const walletData = [
  { month: "SEP", deposits: 2400, withdrawals: 1800 },
  { month: "OCT", deposits: 3200, withdrawals: 2400 },
  { month: "NOV", deposits: 2800, withdrawals: 2200 },
  { month: "DEC", deposits: 3600, withdrawals: 2800 },
  { month: "JAN", deposits: 3400, withdrawals: 2600 },
];

// placeholder colors for the pie chart; values will be derived from API data below
const PIE_COLORS = ["#4318FF", "#6AD2FF", "#01B574"];

import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/services";

interface DashboardStats {
  totalCourses?: number;
  totalCategories?: number;
  totalInstructors?: number;
  monthlySubscriptions?: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  // loading state intentionally not used in UI for now
  const [, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (e) {
        // keep original mock display if backend not reachable
        console.error("Failed to load dashboard stats", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Map backend response fields to UI values. Keep previous mock defaults when backend is unreachable.
  const instructorsCount = stats?.totalInstructors ?? 50;
  const categoriesCount = stats?.totalCategories ?? 10;
  const coursesCount = stats?.totalCourses ?? 36;
  const monthlySubscriptions = stats?.monthlySubscriptions ?? 0;

  // Build pie chart data from the returned stats
  const pieData = [
    { name: "Instructors", value: instructorsCount, color: PIE_COLORS[0] },
    { name: "Categories", value: categoriesCount, color: PIE_COLORS[1] },
    { name: "Courses", value: coursesCount, color: PIE_COLORS[2] },
  ];

  return (
    <div>
      <h1 className="mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-white border border-border rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[32px] font-medium mb-1">
                {instructorsCount}
              </div>
              <div className="text-muted-foreground">Instructors</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-border rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[32px] font-medium mb-1">
                {categoriesCount}
              </div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-border rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[32px] font-medium mb-1">{coursesCount}</div>
              <div className="text-muted-foreground">Courses</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-border rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[32px] font-medium mb-1">
                {monthlySubscriptions}
              </div>
              <div className="text-muted-foreground">Monthly Subscriptions</div>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row (unchanged) */}
      <div className="grid grid-cols-[1.5fr,1fr] gap-6">
        {/* Wallet Card */}
        <Card className="p-6 bg-white border border-border rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3>Wallet</h3>
            <button className="px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-lg hover:bg-accent">
              This month
            </button>
          </div>

          <div className="mb-6">
            <div className="text-[32px] font-medium mb-1">$37.5K</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Wallet Balance
              </span>
              <span className="text-sm text-green-600">+2.45%</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">On your account</span>
            </div>
          </div>

          <div className="h-[180px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={walletData}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="deposits"
                  stroke="#4318FF"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="withdrawals"
                  stroke="#6AD2FF"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4318FF] rounded-full"></div>
              <span className="text-sm text-muted-foreground">Deposits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#6AD2FF] rounded-full"></div>
              <span className="text-sm text-muted-foreground">Withdrawals</span>
            </div>
          </div>
        </Card>

        {/* Statistics Card */}
        <Card className="p-6 bg-white border border-border rounded-xl">
          <h3 className="mb-6">Statistics</h3>

          <div className="flex items-center justify-center mb-6">
            <div className="w-[200px] h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#4318FF] rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  Instructors
                </span>
              </div>
              <span className="font-medium">60%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#6AD2FF] rounded-full"></div>
                <span className="text-sm text-muted-foreground">
                  Categories
                </span>
              </div>
              <span className="font-medium">20%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#01B574] rounded-full"></div>
                <span className="text-sm text-muted-foreground">Courses</span>
              </div>
              <span className="font-medium">20%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
