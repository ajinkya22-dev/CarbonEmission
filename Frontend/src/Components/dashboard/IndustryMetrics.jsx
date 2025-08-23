import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { 
  Factory, 
  Truck, 
  Zap, 
  Hammer, 
  Wheat, 
  Monitor, 
  Heart, 
  ShoppingCart, 
  Coffee,
  TrendingDown,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const industryMetrics = {
  "Manufacturing": {
    icon: <Factory className="h-5 w-5" />,
    primaryMetrics: [
      { name: "Production Emissions", value: 45, unit: "kg CO2/unit", trend: -2.3 },
      { name: "Energy per Unit", value: 12.5, unit: "kWh/unit", trend: -1.8 },
      { name: "Waste Generation", value: 3.2, unit: "kg/unit", trend: -5.1 },
      { name: "Process Efficiency", value: 87, unit: "%", trend: 2.1 }
    ],
    chartData: [
      { month: "Jan", production: 1200, emissions: 54 },
      { month: "Feb", production: 1350, emissions: 52 },
      { month: "Mar", production: 1400, emissions: 49 },
      { month: "Apr", production: 1500, emissions: 47 },
      { month: "May", production: 1450, emissions: 46 },
      { month: "Jun", production: 1600, emissions: 45 }
    ]
  },
  "Transportation": {
    icon: <Truck className="h-5 w-5" />,
    primaryMetrics: [
      { name: "Fleet Efficiency", value: 8.2, unit: "km/L", trend: 3.1 },
      { name: "Route Optimization", value: 92, unit: "%", trend: 5.2 },
      { name: "Electric Vehicle %", value: 15, unit: "%", trend: 12.5 },
      { name: "Fuel Consumption", value: 2450, unit: "L/month", trend: -8.3 }
    ],
    chartData: [
      { month: "Jan", distance: 45000, fuelUsed: 2800 },
      { month: "Feb", distance: 47000, fuelUsed: 2720 },
      { month: "Mar", distance: 48500, fuelUsed: 2650 },
      { month: "Apr", distance: 50000, fuelUsed: 2580 },
      { month: "May", distance: 51200, fuelUsed: 2500 },
      { month: "Jun", distance: 52000, fuelUsed: 2450 }
    ]
  },
  "Energy & Utilities": {
    icon: <Zap className="h-5 w-5" />,
    primaryMetrics: [
      { name: "Renewable Mix", value: 65, unit: "%", trend: 8.2 },
      { name: "Grid Efficiency", value: 94.5, unit: "%", trend: 1.1 },
      { name: "Peak Load Management", value: 78, unit: "%", trend: 4.3 },
      { name: "Transmission Losses", value: 3.2, unit: "%", trend: -2.1 }
    ],
    chartData: [
      { month: "Jan", renewable: 58, conventional: 42 },
      { month: "Feb", renewable: 60, conventional: 40 },
      { month: "Mar", renewable: 62, conventional: 38 },
      { month: "Apr", renewable: 63, conventional: 37 },
      { month: "May", renewable: 64, conventional: 36 },
      { month: "Jun", renewable: 65, conventional: 35 }
    ]
  },
  "Technology": {
    icon: <Monitor className="h-5 w-5" />,
    primaryMetrics: [
      { name: "Server Efficiency", value: 91, unit: "%", trend: 2.8 },
      { name: "Cloud Migration", value: 78, unit: "%", trend: 15.2 },
      { name: "Remote Work Impact", value: -25, unit: "% emissions", trend: 5.1 },
      { name: "Green Hosting", value: 82, unit: "%", trend: 12.3 }
    ],
    chartData: [
      { month: "Jan", servers: 150, cloudUsage: 65 },
      { month: "Feb", servers: 148, cloudUsage: 68 },
      { month: "Mar", servers: 145, cloudUsage: 71 },
      { month: "Apr", servers: 142, cloudUsage: 74 },
      { month: "May", servers: 140, cloudUsage: 76 },
      { month: "Jun", servers: 138, cloudUsage: 78 }
    ]
  }
};

export function IndustryMetrics({ user }) {
  const metrics = industryMetrics[user.industry] || industryMetrics["Technology"];

  return (
    <div className="space-y-6">
      {/* Industry Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-green-100">
        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center text-white">
          {metrics.icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-green-800">{user.industry} Metrics</h2>
          <p className="text-sm text-green-600">
            Industry-specific carbon emission tracking and optimization
          </p>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.primaryMetrics.map((metric, index) => (
          <Card key={index} className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">
                {metric.value}
                <span className="text-sm font-normal text-green-600 ml-1">
                  {metric.unit}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {metric.trend > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-green-600" />
                )}
                <span className="text-xs text-green-600 font-medium">
                  {Math.abs(metric.trend)}% {metric.trend < 0 ? "reduction" : "improvement"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Industry Specific Chart */}
      <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800 text-lg">Performance Trends</CardTitle>
          <CardDescription className="text-green-600">
            Monthly tracking of key {user.industry.toLowerCase()} metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            {user.industry === "Manufacturing" && (
              <BarChart data={metrics.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis yAxisId="left" orientation="left" stroke="#059669" />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#10b981',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar yAxisId="left" dataKey="production" name="Production Units" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="emissions" name="Emissions (kg CO2)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}

            {user.industry === "Transportation" && (
              <LineChart data={metrics.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis yAxisId="left" orientation="left" stroke="#059669" />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#10b981',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="distance" name="Distance (km)" stroke="#10b981" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="fuelUsed" name="Fuel Used (L)" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            )}

            {user.industry === "Energy & Utilities" && (
              <BarChart data={metrics.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                <Bar dataKey="renewable" name="Renewable %" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conventional" name="Conventional %" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}

            {user.industry === "Technology" && (
              <LineChart data={metrics.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis yAxisId="left" orientation="left" stroke="#059669" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#10b981',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="servers" name="Physical Servers" stroke="#ef4444" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="cloudUsage" name="Cloud Usage %" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Emission Reduction Opportunities */}
      <Card className="border-green-100 hover:border-green-200 hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800 text-lg">Emission Reduction Opportunities</CardTitle>
          <CardDescription className="text-green-600">
            Recommended actions specific to the {user.industry.toLowerCase()} industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.industry === "Manufacturing" && (
              <>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="mt-0.5 bg-green-100 p-1.5 rounded-full text-green-600">
                    <Factory className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Process Optimization</h3>
                    <p className="text-xs text-green-700 mt-1">Reduce manufacturing waste by 15% through improved material flow and lean production techniques.</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200 border-none">
                    High Impact
                  </Badge>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full text-blue-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Energy Efficiency</h3>
                    <p className="text-xs text-blue-700 mt-1">Upgrade to high-efficiency motors and implement smart factory monitoring to reduce energy consumption.</p>
                  </div>
                  <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                    Medium Impact
                  </Badge>
                </div>
              </>
            )}

            {user.industry === "Transportation" && (
              <>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="mt-0.5 bg-green-100 p-1.5 rounded-full text-green-600">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Fleet Electrification</h3>
                    <p className="text-xs text-green-700 mt-1">Transition 25% of your fleet to electric vehicles within the next 12 months.</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200 border-none">
                    High Impact
                  </Badge>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full text-blue-600">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Route Optimization</h3>
                    <p className="text-xs text-blue-700 mt-1">Implement AI-driven route planning to reduce mileage and fuel consumption by up to 12%.</p>
                  </div>
                  <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                    Medium Impact
                  </Badge>
                </div>
              </>
            )}

            {user.industry === "Energy & Utilities" && (
              <>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="mt-0.5 bg-green-100 p-1.5 rounded-full text-green-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Renewable Expansion</h3>
                    <p className="text-xs text-green-700 mt-1">Increase renewable energy mix by 15% through strategic investments in solar and wind projects.</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200 border-none">
                    High Impact
                  </Badge>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full text-blue-600">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Grid Modernization</h3>
                    <p className="text-xs text-blue-700 mt-1">Upgrade transmission infrastructure to reduce losses and improve reliability across the network.</p>
                  </div>
                  <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                    Medium Impact
                  </Badge>
                </div>
              </>
            )}

            {user.industry === "Technology" && (
              <>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="mt-0.5 bg-green-100 p-1.5 rounded-full text-green-600">
                    <Monitor className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Cloud Migration</h3>
                    <p className="text-xs text-green-700 mt-1">Accelerate transition to cloud services to reduce on-premises data center footprint by 30%.</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200 border-none">
                    High Impact
                  </Badge>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full text-blue-600">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">E-waste Reduction</h3>
                    <p className="text-xs text-blue-700 mt-1">Implement circular economy practices for hardware lifecycle management and recycling.</p>
                  </div>
                  <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                    Medium Impact
                  </Badge>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
