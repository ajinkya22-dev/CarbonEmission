import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { TrendingUp, Leaf, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LabelList,
} from "recharts";

export default function LiveDemo() {
  const navigate = useNavigate();
  const chartRef = useRef(null);

  // Sector-wise carbon emissions in India (approx. % share)
  const sectorData = [
    { name: "Energy", value: 44 },
    { name: "Industry", value: 23 },
    { name: "Transport", value: 13 },
    { name: "Agriculture", value: 18 },
    { name: "Residential", value: 2 },
  ];

  // State-wise major contributors (MtCO2 approx)
  const stateData = [
    { state: "MH", emissions: 250 },
    { state: "UP", emissions: 220 },
    { state: "GJ", emissions: 200 },
    { state: "TN", emissions: 180 },
    { state: "WB", emissions: 150 },
    { state: "KA", emissions: 140 },
    { state: "RJ", emissions: 120 },
  ];

  // Company emissions data
  const companyData = [
    {
      name: "Reliance Industries",
      emissions: 340,      // MtCO₂
      emissionsSO2: 27.5,  // MtSO₂
      emissionsNO2: 16.4,  // MtNO₂
    },
    {
      name: "Tata Steel",
      emissions: 180,
      emissionsSO2: 13.9,
      emissionsNO2: 10.7,
    },
    {
      name: "Adani Power",
      emissions: 220,
      emissionsSO2: 21.2,
      emissionsNO2: 12.2,
    },
    {
      name: "Indian Oil Corp",
      emissions: 195,
      emissionsSO2: 10.4,
      emissionsNO2: 13.8,
    },
    {
      name: "Coal India",
      emissions: 410,
      emissionsSO2: 36.8,
      emissionsNO2: 28.1,
    },
  ];


  useEffect(() => {
    if (!chartRef.current) return;

    am4core.useTheme(am4themes_animated);

    let chart = am4core.create(chartRef.current, am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    chart.legend = new am4charts.Legend();

    chart.data = sectorData.map((item) => ({
      sector: item.name,
      emissions: item.value,
    }));

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "emissions";
    series.dataFields.category = "sector";
    series.slices.template.tooltipText = "{category}: {value}%";

    // Assign green shades for slices
    const colors = [
      am4core.color("#12b559"),
      am4core.color("#0d8a37"),
      am4core.color("#0a6d32"),
      am4core.color("#2fa345"),
      am4core.color("#87d089"),
    ];
    series.colors.list = colors;

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex flex-col items-center py-12 px-4">
      <div className="max-w-5xl w-full">
        <Card className="bg-white/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Leaf className="text-green-600" />
              Carbon Control Demo Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-100 rounded-lg p-6 text-center transition duration-300 hover:bg-green-300 hover:shadow-lg cursor-pointer">
                <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <div className="font-bold text-2xl text-green-700">-32%</div>
                <div className="text-sm text-gray-700">Emissions Reduced</div>
              </div>
              <div className="bg-blue-100 rounded-lg p-6 text-center transition duration-300 hover:bg-blue-300 hover:shadow-lg cursor-pointer">
                <Users className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <div className="font-bold text-2xl text-blue-700">12</div>
                <div className="text-sm text-gray-700">Active Team Members</div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-6 text-center transition duration-300 hover:bg-yellow-300 hover:shadow-lg cursor-pointer">
                <Leaf className="mx-auto mb-2 h-8 w-8 text-yellow-600" />
                <div className="font-bold text-2xl text-yellow-700">5</div>
                <div className="text-sm text-gray-700">Sustainability Projects</div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-7">
              {/* 3D Pie Chart */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">Sector-wise Carbon Emissions</CardTitle>
                <div ref={chartRef} style={{ width: "100%", height: 400 }}></div>
              </Card>

              {/* Bar Chart */}
              <Card className="p-4">
                <CardTitle className="text-lg mb-4">State-wise Major Contributors</CardTitle>
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={stateData} margin={{ top: 20, right: 20, left: 10, bottom: 40 }}>
                    <defs>
                      <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#12b559" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#0a6d32" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="state"
                      angle={-40}
                      textAnchor="end"
                      interval={0}
                      tick={{ fill: "#555", fontWeight: "bold" }}
                      height={60}
                    />
                    <YAxis domain={[0, "dataMax + 50"]} tick={{ fill: "#555", fontWeight: "bold" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="emissions" fill="url(#emissionsGradient)" radius={[8, 8, 0, 0]} animationDuration={1500}>
                      <LabelList dataKey="emissions" position="top" fill="#333" fontWeight="bold" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <br />
            {/* Company Emissions Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden my-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Company Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Emissions (MtCO₂)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Emissions (MtSO₂)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Emissions (MtNO₂)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {companyData.map((item) => (
                      <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700 dark:text-green-400">
                          {item.emissions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700 dark:text-blue-400">
                          {item.emissionsSO2}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-700 dark:text-yellow-400">
                          {item.emissionsNO2}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
            <br />
            {/* CTA */}
            <div className="text-center mb-4">
              <p className="text-lg text-gray-700">
                Explore how your dashboard could look! Track emissions, manage projects, and collaborate with your team.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate("/signup")} className="bg-green-600 hover:bg-green-700">
                Try for Free
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
