import { useEffect, useState } from "react";
import { 
  generateNetworkTopology, 
  generateMetricsData, 
  simulateNetworkUpdate,
  generateSimulationResults,
  SimulationParameters,
  defaultSimulationParameters
} from "@/utils/simulationData";
import { generatePdfReport } from "@/utils/reportGenerator";
import NetworkTopology from "@/components/NetworkTopology";
import SimulationControls from "@/components/SimulationControls";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import ResultsSummary from "@/components/ResultsSummary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import NetworkEfficiency from "@/components/NetworkEfficiency";

const Index = () => {
  const { toast } = useToast();
  const [network, setNetwork] = useState(generateNetworkTopology());
  const [metricsData, setMetricsData] = useState(generateMetricsData(60, 5));
  const [parameters, setParameters] = useState<SimulationParameters>(defaultSimulationParameters);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("topology");
  const [simulationCount, setSimulationCount] = useState(0);
  
  // Modified handleStartStop to reduce latency in the simulation
  const handleStartStop = () => {
    if (isRunning) {
      if (simulationInterval) {
        clearInterval(simulationInterval);
        setSimulationInterval(null);
      }
      setIsRunning(false);
      toast({
        title: "Simulation stopped",
        description: "The simulation has been stopped successfully."
      });
    } else {
      setIsLoading(true);
      
      setTimeout(() => {
        const newNetwork = generateNetworkTopology();
        setNetwork(newNetwork);
        setMetricsData(generateMetricsData(60, 5));
        setSimulationCount(prevCount => prevCount + 1);
        
        const interval = setInterval(() => {
          setNetwork(prevNetwork => simulateNetworkUpdate(prevNetwork, parameters));
          setMetricsData(prevData => {
            const lastTimestamp = prevData[prevData.length - 1].timestamp;
            const newDataPoint = {
              timestamp: lastTimestamp + 5000,
              // Reduce initial latency by using a lower base value (0.7x previous)
              throughput: prevData[prevData.length - 1].throughput * (0.95 + Math.random() * 0.1),
              latency: prevData[prevData.length - 1].latency * (0.7 + Math.random() * 0.1),
              packetLoss: Math.max(0, prevData[prevData.length - 1].packetLoss * (0.95 + Math.random() * 0.1)),
              snr: prevData[prevData.length - 1].snr * (0.98 + Math.random() * 0.04),
              sinr: prevData[prevData.length - 1].sinr * (0.98 + Math.random() * 0.04),
              rsrp: prevData[prevData.length - 1].rsrp * (0.99 + Math.random() * 0.02),
            };
            const newData = [...prevData.slice(1), newDataPoint];
            return newData;
          });
        }, 2000);
        
        setSimulationInterval(interval as unknown as number);
        setIsRunning(true);
        setIsLoading(false);
        
        toast({
          title: "Simulation started",
          description: "The 5G network simulation is now running with optimized latency."
        });
      }, 1000);
    }
  };
  
  const handleReset = () => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
    setIsRunning(false);
    
    setParameters(defaultSimulationParameters);
    setNetwork(generateNetworkTopology());
    setMetricsData(generateMetricsData(60, 5));
    
    toast({
      title: "Simulation reset",
      description: "All parameters have been reset to default values."
    });
  };
  
  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);
  
  const simulationResults = generateSimulationResults(parameters, metricsData);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">NextGen 5G Simulator Dashboard</h1>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
          </div>
        </div>
        
        <DashboardStats simulationCount={simulationCount} isRunning={isRunning} parameters={parameters} />
        
        <div className="block md:hidden mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="topology" className="flex-1">Network</TabsTrigger>
              <TabsTrigger value="controls" className="flex-1">Controls</TabsTrigger>
              <TabsTrigger value="performance" className="flex-1">Metrics</TabsTrigger>
              <TabsTrigger value="results" className="flex-1">Results</TabsTrigger>
              <TabsTrigger value="efficiency" className="flex-1">Efficiency</TabsTrigger>
            </TabsList>
            
            <TabsContent value="topology" className="mt-6">
              <div className="space-y-6">
                <NetworkTopology 
                  networkData={network}
                  isLoading={isLoading}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="controls" className="mt-6">
              <div className="space-y-6">
                <SimulationControls
                  parameters={parameters}
                  onParametersChange={setParameters}
                  isRunning={isRunning}
                  onStartStop={handleStartStop}
                  onReset={handleReset}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-6">
              <div className="space-y-6">
                <PerformanceMetrics metricsData={metricsData} />
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="mt-6">
              <div className="space-y-6">
                <ResultsSummary results={simulationResults} parameters={parameters} />
              </div>
            </TabsContent>
            
            <TabsContent value="efficiency" className="mt-6">
              <div className="space-y-6">
                <NetworkEfficiency metricsData={metricsData} parameters={parameters} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NetworkTopology 
              networkData={network}
              isLoading={isLoading}
              className="col-span-2 row-span-2"
            />
            <div className="col-span-1 space-y-6">
              <SimulationControls
                parameters={parameters}
                onParametersChange={setParameters}
                isRunning={isRunning}
                onStartStop={handleStartStop}
                onReset={handleReset}
              />
              <ResultsSummary results={simulationResults} parameters={parameters} />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceMetrics metricsData={metricsData} />
            <NetworkEfficiency metricsData={metricsData} parameters={parameters} />
          </div>
          
          <div className="mt-10 text-center text-sm text-white/60">
            <p>NextGen 5G Simulation Platform • Advanced Telecommunications Research</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
