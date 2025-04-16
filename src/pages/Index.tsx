
import { useEffect, useState } from "react";
import { 
  generateNetworkTopology, 
  generateMetricsData, 
  simulateNetworkUpdate,
  generateSimulationResults,
  SimulationParameters,
  defaultSimulationParameters
} from "@/utils/simulationData";
import Navbar from "@/components/Navbar";
import NetworkTopology from "@/components/NetworkTopology";
import SimulationControls from "@/components/SimulationControls";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import ResultsSummary from "@/components/ResultsSummary";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [network, setNetwork] = useState(generateNetworkTopology());
  const [metricsData, setMetricsData] = useState(generateMetricsData(60, 5));
  const [parameters, setParameters] = useState<SimulationParameters>(defaultSimulationParameters);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("topology");
  
  // Handle simulation start/stop
  const handleStartStop = () => {
    if (isRunning) {
      // Stop simulation
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
      // Start simulation
      setIsLoading(true);
      
      // Generate initial data based on current parameters
      setTimeout(() => {
        const newNetwork = generateNetworkTopology();
        setNetwork(newNetwork);
        setMetricsData(generateMetricsData(60, 5));
        
        // Set up interval for continuous updates
        const interval = setInterval(() => {
          setNetwork(prevNetwork => simulateNetworkUpdate(prevNetwork, parameters));
          setMetricsData(prevData => {
            const lastTimestamp = prevData[prevData.length - 1].timestamp;
            const newDataPoint = {
              timestamp: lastTimestamp + 5000, // 5 seconds after
              throughput: prevData[prevData.length - 1].throughput * (0.95 + Math.random() * 0.1),
              latency: prevData[prevData.length - 1].latency * (0.95 + Math.random() * 0.1),
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
          description: "The 5G network simulation is now running."
        });
      }, 1000);
    }
  };
  
  // Handle simulation reset
  const handleReset = () => {
    // Stop any running simulation
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
    setIsRunning(false);
    
    // Reset parameters to defaults
    setParameters(defaultSimulationParameters);
    
    // Generate new initial data
    setNetwork(generateNetworkTopology());
    setMetricsData(generateMetricsData(60, 5));
    
    toast({
      title: "Simulation reset",
      description: "All parameters have been reset to default values."
    });
  };
  
  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);
  
  // Calculate simulation results
  const simulationResults = generateSimulationResults(parameters, metricsData);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">5G Network Simulation Dashboard</h1>
        
        {/* Mobile tabs for responsive layout */}
        <div className="block md:hidden mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="topology" className="flex-1">Network</TabsTrigger>
              <TabsTrigger value="controls" className="flex-1">Controls</TabsTrigger>
              <TabsTrigger value="performance" className="flex-1">Metrics</TabsTrigger>
              <TabsTrigger value="results" className="flex-1">Results</TabsTrigger>
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
                <ResultsSummary results={simulationResults} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Desktop layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            <NetworkTopology 
              networkData={network}
              isLoading={isLoading}
            />
            <div className="col-span-1 space-y-6">
              <SimulationControls
                parameters={parameters}
                onParametersChange={setParameters}
                isRunning={isRunning}
                onStartStop={handleStartStop}
                onReset={handleReset}
              />
              <ResultsSummary results={simulationResults} />
            </div>
          </div>
          
          <div className="mt-6">
            <PerformanceMetrics metricsData={metricsData} />
          </div>
        </div>
        
        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>5G Network Simulation Platform • Advanced Telecommunications Research</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
