
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricData } from "@/utils/simulationData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
  
  return (
    <>
      {/* Small metric cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Throughput</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{currentThroughput.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">Mbps</span></div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Latency</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{currentLatency.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">ms</span></div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-muted-foreground">Packet Loss</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{currentPacketLoss.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">%</span></div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm text-muted-foreground">SINR</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{currentSinr.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">dB</span></div>
          </CardContent>
        </Card>
      </div>
      
      {/* Metric charts */}
      <Card className="col-span-2 row-span-1">
        <CardHeader className="p-4 pb-0">
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="throughput">
            <TabsList className="mb-4">
              <TabsTrigger value="throughput">Throughput</TabsTrigger>
              <TabsTrigger value="latency">Latency</TabsTrigger>
              <TabsTrigger value="radio">Radio Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="throughput" className="h-[300px]">
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
                  <Line 
                    type="monotone" 
                    dataKey="throughput" 
                    name="Throughput (Mbps)"
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
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
                      value: 'ms', 
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
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    name="Latency (ms)"
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="packetLoss" 
                    name="Packet Loss (%)"
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={false}
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
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sinr" 
                    yAxisId="left"
                    name="SINR (dB)"
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rsrp" 
                    yAxisId="right"
                    name="RSRP (dBm)"
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default PerformanceMetrics;
