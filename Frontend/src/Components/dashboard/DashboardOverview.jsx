import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { 
  TrendingDown, 
  TrendingUp, 
  Zap, 
  Factory, 
  Target,
  AlertTriangle 
} from "lucide-react";
import { SafeResponsiveContainer, SafeAreaChart, SafePieChart } from "../ui/safe-charts";
import { XAxis, YAxis, CartesianGrid, Tooltip, Line, Area, Cell, Pie } from "recharts";

const monthlyEmissions = [
  { month: "Jan", emissions: 85, target: 80 },
  { month: "Feb", emissions: 82, target: 78 },
  { month: "Mar", emissions: 78, target: 76 },
  { month: "Apr", emissions: 75, target: 74 },
  { month: "May", emissions: 73, target: 72 },
  { month: "Jun", emissions: 70, target: 70 },
];

const emissionSources = [
  { name: "Energy", value: 45, color: "#ef4444" },
  { name: "Transportation", value: 25, color: "#f97316" },
  { name: "Manufacturing", value: 20, color: "#eab308" },
  { name: "Waste", value: 10, color: "#22c55e" },
];

const industryBenchmarks = {
  "Manufacturing": { average: 120, leader: 85 },
  "Transportation": { average: 95, leader: 65 },
  "Energy & Utilities": { average: 200, leader: 140 },
  "Construction": { average: 110, leader: 80 },
  "Agriculture": { average: 75, leader: 50 },
  "Technology": { average: 45, leader: 30 },
  "Healthcare": { average: 65, leader: 45 },
  "Retail": { average: 55, leader: 35 },
  "Food & Beverage": { average: 85, leader: 60 },
  "Other": { average: 80, leader: 55 }
};

export function DashboardOverview({ user }) {
  const currentEmissions = 70; // tons CO2e
  const lastMonthEmissions = 73;
  const reduction = ((lastMonthEmissions - currentEmissions) / lastMonthEmissions * 100);
  
  const benchmark = industryBenchmarks[user.industry] || industryBenchmarks["Other"];
  const targetProgress = ((benchmark.average - currentEmissions) / (benchmark.average - benchmark.leader)) * 100;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Current Emissions</CardTitle>
            <Factory className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{currentEmissions}</div>
            <p className="text-xs text-green-600">tons CO2e this month</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">{reduction.toFixed(1)}% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Reduction Target</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{benchmark.leader}</div>
            <p className="text-xs text-green-600">tons CO2e target</p>
            <div className="mt-2 relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-green-100">
                <div
                  style={{ width: `${targetProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                ></div>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-1">{targetProgress.toFixed(0)}% to industry leader</p>
          </CardContent>
        </Card>

        <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Energy Efficiency</CardTitle>
            <Zap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">87%</div>
            <p className="text-xs text-green-600">efficiency score</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">+3% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">3</div>
            <p className="text-xs text-green-600">require attention</p>
            <Badge className="mt-2 text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-none">
              High Priority
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-green-100 hover:border-green-200 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-800 text-lg">Emissions Trend</CardTitle>
            <CardDescription className="text-green-600">Monthly CO2 emissions vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <SafeResponsiveContainer width="100%" height={300}>
              <SafeAreaChart data={monthlyEmissions} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#10b981',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="emissions"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorEmissions)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#ef4444', r: 3 }}
                />
              </SafeAreaChart>
            </SafeResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-800 text-lg">Emission Sources</CardTitle>
            <CardDescription className="text-green-600">Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <SafeResponsiveContainer width="100%" height={250}>
              <SafePieChart>
                <Pie
                  data={emissionSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {emissionSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} tons CO2e`, 'Emissions']}
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#10b981',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </SafePieChart>
            </SafeResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Industry Comparison */}
      <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800 text-lg">Industry Comparison</CardTitle>
          <CardDescription className="text-green-600">
            How your emissions compare to industry benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-green-800">Your Current Emissions</span>
                <span className="text-sm font-medium text-green-800">{currentEmissions} tons</span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full" style={{ width: `${(currentEmissions / benchmark.average) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-green-800">Industry Average</span>
                <span className="text-sm font-medium text-green-800">{benchmark.average} tons</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-green-800">Industry Leader</span>
                <span className="text-sm font-medium text-green-800">{benchmark.leader} tons</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full" style={{ width: `${(benchmark.leader / benchmark.average) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
