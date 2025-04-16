import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricData } from "@/utils/simulationData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Wifi, Gauge, RadioTower, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COLORS = ['#8B5CF6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#3b82f6'];

interface PerformanceMetricsProps {
  metricsData: MetricData[];
}

const PerformanceMetrics = ({ metricsData }: PerformanceMetricsProps) => {
  // Format timestamp for display
  const formatData = metricsData.map(d => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })
  }));
  
  // Calculate current values for the metrics cards
  const currentThroughput = metricsData.length > 0 ? metricsData[metricsData.length - 1].throughput : 0;
  const currentLatency = metricsData.length > 0 ? metricsData[metricsData.length - 1].latency : 0;
  const currentPacketLoss = metricsData.length > 0 ? metricsData[metricsData.length - 1].packetLoss : 0;
  const currentSinr = metricsData.length > 0 ? metricsData[metricsData.length - 1].sinr : 0;
  
  // Calculate statistical data for dashboard
  const avgThroughput = metricsData.reduce((sum, m) => sum + m.throughput, 0) / metricsData.length;
  const maxThroughput = Math.max(...metricsData.map(m => m.throughput));
  const minLatency = Math.min(...metricsData.map(m => m.latency));
  
  // Prepare data for radar chart
  const radarData = [
    {
      subject: 'Throughput',
      value: currentThroughput / maxThroughput * 100,
      fullMark: 100,
    },
    {
      subject: 'Latency',
      value: (20 - currentLatency) / 20 * 100, // Lower is better for latency
      fullMark: 100,
    },
    {
      subject: 'Packet Loss',
      value: (5 - currentPacketLoss) / 5 * 100, // Lower is better for packet loss
      fullMark: 100,
    },
    {
      subject: 'SNR',
      value: metricsData[metricsData.length - 1].snr / 30 * 100,
      fullMark: 100,
    },
    {
      subject: 'SINR',
      value: currentSinr / 20 * 100,
      fullMark: 100,
    },
    {
      subject: 'RSRP',
      value: (metricsData[metricsData.length - 1].rsrp + 100) / 30 * 100,
      fullMark: 100,
    },
  ];
  
  // Prepare data for pie chart
  const pieData = [
    { name: 'Throughput', value: currentThroughput },
    { name: 'Bandwidth', value: 400 - currentThroughput },
  ];
  
  // Calculate packet distribution for bar chart
  const packetDistribution = [
    { name: 'Data', value: 65 },
    { name: 'Control', value: 20 },
    { name: 'Management', value: 10 },
    { name: 'QoS', value: 5 },
  ];
  
  // Status indicators
  const getStatusIndicator = (value: number, threshold: number, isHigherBetter = true) => {
    if (isHigherBetter) {
      return value > threshold ? 'success' : 'warning';
    }
    return value < threshold ? 'success' : 'warning';
  };
  
  const throughputStatus = getStatusIndicator(currentThroughput, 100);
  const latencyStatus = getStatusIndicator(currentLatency, 10, false);
  const packetLossStatus = getStatusIndicator(currentPacketLoss, 1, false);
  const sinrStatus = getStatusIndicator(currentSinr, 10);
  
  return (
    <div className="space-y-6">
      {/* Enhanced metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="overflow-hidden border-t-4" style={{ borderTopColor: throughputStatus === 'success' ? '#10b981' : '#f59e0b' }}>
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-sm text-muted-foreground font-medium">Throughput</CardTitle>
              <CardDescription className="text-xs">
                <span className={throughputStatus === 'success' ? "text-green-500" : "text-amber-500"}>
                  {throughputStatus === 'success' ? 'Optimal' : 'Suboptimal'}
                </span>
              </CardDescription>
            </div>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{currentThroughput.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">Mbps</span></div>
            <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${throughputStatus === 'success' ? 'bg-green-500' : 'bg-amber-500'}`} 
                style={{ width: `${(currentThroughput / 200) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-t-4" style={{ borderTopColor: latencyStatus === 'success' ? '#10b981' : '#f59e0b' }}>
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-sm text-muted-foreground font-medium">Latency</CardTitle>
              <CardDescription className="text-xs">
                <span className={latencyStatus === 'success' ? "text-green-500" : "text-amber-500"}>
                  {latencyStatus === 'success' ? 'Low' : 'Moderate'}
                </span>
              </CardDescription>
            </div>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{currentLatency.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">ms</span></div>
            <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${latencyStatus === 'success' ? 'bg-green-500' : 'bg-amber-500'}`} 
                style={{ width: `${(currentLatency / 20) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-t-4" style={{ borderTopColor: packetLossStatus === 'success' ? '#10b981' : '#f59e0b' }}>
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-sm text-muted-foreground font-medium">Packet Loss</CardTitle>
              <CardDescription className="text-xs">
                <span className={packetLossStatus === 'success' ? "text-green-500" : "text-amber-500"}>
                  {packetLossStatus === 'success' ? 'Minimal' : 'Moderate'}
                </span>
              </CardDescription>
            </div>
            <RadioTower className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{currentPacketLoss.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">%</span></div>
            <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${packetLossStatus === 'success' ? 'bg-green-500' : 'bg-amber-500'}`} 
                style={{ width: `${(currentPacketLoss / 5) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-t-4" style={{ borderTopColor: sinrStatus === 'success' ? '#10b981' : '#f59e0b' }}>
          <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-sm text-muted-foreground font-medium">SINR</CardTitle>
              <CardDescription className="text-xs">
                <span className={sinrStatus === 'success' ? "text-green-500" : "text-amber-500"}>
                  {sinrStatus === 'success' ? 'Strong' : 'Moderate'}
                </span>
              </CardDescription>
            </div>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-2xl font-bold">{currentSinr.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">dB</span></div>
            <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${sinrStatus === 'success' ? 'bg-green-500' : 'bg-amber-500'}`} 
                style={{ width: `${(currentSinr / 20) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Advanced metric charts */}
      <Card className="col-span-2 row-span-1">
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle>Performance Metrics</CardTitle>
            <Badge variant="outline" className="text-xs">Live Data</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="throughput">
            <TabsList className="mb-4">
              <TabsTrigger value="throughput">Throughput</TabsTrigger>
              <TabsTrigger value="latency">Latency</TabsTrigger>
              <TabsTrigger value="radio">Radio Metrics</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="throughput" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formatData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'Mbps', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: 'hsl(var(--muted-foreground))' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                    labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                  />
                  <ReferenceLine y={avgThroughput} stroke="#f97316" strokeDasharray="3 3" label="Avg" />
                  <Area 
                    type="monotone" 
                    dataKey="throughput" 
                    name="Throughput (Mbps)"
                    stroke="hsl(var(--accent))" 
                    fillOpacity={1}
                    fill="url(#colorThroughput)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="latency" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'ms / %', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: 'hsl(var(--muted-foreground))' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                    labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                  />
                  <Legend />
                  <ReferenceLine y={minLatency} stroke="#10b981" strokeDasharray="3 3" label="Min" />
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    name="Latency (ms)"
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 1, fill: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="packetLoss" 
                    name="Packet Loss (%)"
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 1, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="radio" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'dB', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: 'hsl(var(--muted-foreground))' }
                    }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--muted-foreground))" 
                    tick={{ fontSize: 12 }}
                    label={{ 
                      value: 'dBm', 
                      angle: 90, 
                      position: 'insideRight',
                      style: { fill: 'hsl(var(--muted-foreground))' }
                    }}
                    domain={[-120, -40]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                    labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="snr" 
                    yAxisId="left"
                    name="SNR (dB)"
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: 'hsl(var(--accent))', strokeWidth: 1, fill: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sinr" 
                    yAxisId="left"
                    name="SINR (dB)"
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 1, fill: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rsrp" 
                    yAxisId="right"
                    name="RSRP (dBm)"
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 1, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="advanced" className="h-[400px]">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <Radar
                        name="Current Performance"
                        dataKey="value"
                        stroke="hsl(var(--accent))"
                        fill="hsl(var(--accent))"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-full grid grid-rows-2 gap-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))' 
                        }}
                        formatter={(value, name) => [`${value} Mbps`, name]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={packetDistribution}
                      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))' 
                        }}
                        formatter={(value) => [`${value}%`, 'Packet Distribution']}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {packetDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
