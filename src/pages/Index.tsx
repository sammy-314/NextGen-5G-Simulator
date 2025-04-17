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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Save, Share, RefreshCw, Rocket } from "lucide-react";
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

  const handleSaveScenario = () => {
    toast({
      title: "Scenario saved",
      description: "Your simulation scenario has been saved successfully.",
      variant: "default"
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
      <Navbar />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">NextGen 5G Simulator Dashboard</h1>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Share className="mr-2 h-4 w-4" /> Share
            </Button>
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
                <ResultsSummary results={simulationResults} />
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
              <ResultsSummary results={simulationResults} />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceMetrics metricsData={metricsData} />
            <NetworkEfficiency metricsData={metricsData} parameters={parameters} />
          </div>
          
          <div className="mt-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <RefreshCw className="mr-2 h-4 w-4" /> Reset All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-20 flex flex-col" onClick={handleSaveScenario}>
                    <Save className="h-6 w-6 mb-2" />
                    <span>Save Scenario</span>
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-20 flex flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Export Results</span>
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-20 flex flex-col">
                    <Share className="h-6 w-6 mb-2" />
                    <span>Share Analysis</span>
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-20 flex flex-col">
                    <Rocket className="h-6 w-6 mb-2" />
                    <span>Generate Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-10 text-center text-sm text-white/60">
          <p>NextGen 5G Simulation Platform • Advanced Telecommunications Research</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
