
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsDataPoint, SimulationParameters } from "@/utils/simulationData";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface NetworkEfficiencyProps {
  metricsData: MetricsDataPoint[];
  parameters: SimulationParameters;
}

const NetworkEfficiency = ({ metricsData, parameters }: NetworkEfficiencyProps) => {
  // Prepare data for spectral efficiency chart
  const spectralEfficiencyData = metricsData.map((point, index) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    efficiency: (point.throughput / parameters.bandwidth).toFixed(2),
  }));

  // Calculate average metrics for the pie chart
  const calculateAverage = (data: number[]) => data.reduce((sum, val) => sum + val, 0) / data.length;
  
  const avgThroughput = calculateAverage(metricsData.map(d => d.throughput));
  const avgLatency = calculateAverage(metricsData.map(d => d.latency));
  const avgPacketLoss = calculateAverage(metricsData.map(d => d.packetLoss));
  
  const performanceScore = Math.min(100, Math.max(0, 
    (avgThroughput / 1000) * 40 +  // Higher throughput is better
    (100 - avgLatency) * 0.4 +      // Lower latency is better
    (100 - avgPacketLoss * 10) * 0.2 // Lower packet loss is better
  ));

  // Prepare resource utilization data
  const resourceUtilization = [
    { name: 'CPU', value: 65 + Math.random() * 15 },
    { name: 'Memory', value: 45 + Math.random() * 20 },
    { name: 'Network', value: 75 + Math.random() * 15 },
    { name: 'Storage', value: 30 + Math.random() * 10 },
  ];

  // Prepare comparison data
  const comparisonData = [
    { name: 'Current', throughput: avgThroughput, latency: avgLatency },
    { name: 'Best Case', throughput: avgThroughput * 1.3, latency: avgLatency * 0.7 },
    { name: 'Worst Case', throughput: avgThroughput * 0.7, latency: avgLatency * 1.5 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-white">Network Efficiency Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-3">Spectral Efficiency Over Time</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={spectralEfficiencyData.slice(-15)}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="efficiency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fill: '#aaa' }} />
                  <YAxis tick={{ fill: '#aaa' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#8884d8' }}
                  />
                  <Area type="monotone" dataKey="efficiency" stroke="#8884d8" fillOpacity={1} fill="url(#efficiency)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-3">Resource Utilization</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourceUtilization}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                  >
                    {resourceUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Utilization']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-3">Performance Comparison</h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: '#aaa' }} />
                  <YAxis yAxisId="throughput" orientation="left" tick={{ fill: '#aaa' }} />
                  <YAxis yAxisId="latency" orientation="right" tick={{ fill: '#aaa' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar yAxisId="throughput" dataKey="throughput" name="Throughput (Mbps)" fill="#82ca9d" />
                  <Bar yAxisId="latency" dataKey="latency" name="Latency (ms)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-sm font-medium text-white/70 mb-4">Overall Performance Score</h3>
            <div className="relative h-48 w-48 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#333"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#8884d8"
                  strokeWidth="10"
                  strokeDasharray={`${performanceScore * 2.83} ${283 - performanceScore * 2.83}`}
                  strokeDashoffset="70.75"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{performanceScore.toFixed(0)}</span>
                <span className="text-sm text-white/70">out of 100</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-white/80">
                {performanceScore >= 80 ? 'Excellent' : performanceScore >= 60 ? 'Good' : performanceScore >= 40 ? 'Average' : 'Needs improvement'}
              </p>
              <p className="text-xs text-white/60 mt-1">
                Based on throughput, latency and packet loss
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkEfficiency;
