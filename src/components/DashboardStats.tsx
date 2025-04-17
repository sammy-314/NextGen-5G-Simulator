
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SimulationParameters } from "@/utils/simulationData";
import { Activity, Cpu, Signal, Waves } from "lucide-react";

interface DashboardStatsProps {
  simulationCount: number;
  isRunning: boolean;
  parameters: SimulationParameters;
}

const DashboardStats = ({ simulationCount, isRunning, parameters }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-white/60">Simulation Status</p>
            <h4 className="text-2xl font-bold text-white mt-1">
              {isRunning ? "Active" : "Idle"}
            </h4>
            <p className="text-sm mt-1 text-white/80">
              Run Count: {simulationCount}
            </p>
          </div>
          <div className={`p-4 rounded-full bg-accent/10 ${isRunning ? 'animate-pulse' : ''}`}>
            <Activity className="h-6 w-6 text-accent" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-white/60">Frequency Band</p>
            <h4 className="text-2xl font-bold text-white mt-1">
              {parameters.frequency} GHz
            </h4>
            <p className="text-sm mt-1 text-white/80">
              {parameters.frequency < 3 ? "Low Band" : parameters.frequency < 6 ? "Mid Band" : "mmWave"}
            </p>
          </div>
          <div className="p-4 rounded-full bg-primary/10">
            <Waves className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-white/60">Bandwidth</p>
            <h4 className="text-2xl font-bold text-white mt-1">
              {parameters.bandwidth} MHz
            </h4>
            <p className="text-sm mt-1 text-white/80">
              {parameters.numerology === 0 ? "15kHz SCS" : parameters.numerology === 1 ? "30kHz SCS" : "60kHz SCS"}
            </p>
          </div>
          <div className="p-4 rounded-full bg-graph-cyan/10">
            <Signal className="h-6 w-6 text-graph-cyan" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-white/60">Power Setting</p>
            <h4 className="text-2xl font-bold text-white mt-1">
              {parameters.txPower} dBm
            </h4>
            <p className="text-sm mt-1 text-white/80">
              {parameters.txPower < 20 ? "Low Power" : parameters.txPower < 30 ? "Medium Power" : "High Power"}
            </p>
          </div>
          <div className="p-4 rounded-full bg-orange-500/10">
            <Cpu className="h-6 w-6 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
