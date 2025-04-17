
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimulationParameters } from "@/utils/simulationData";
import { Play, Pause, RotateCcw, Save, FileText } from "lucide-react";

interface SimulationControlsProps {
  parameters: SimulationParameters;
  onParametersChange: (parameters: SimulationParameters) => void;
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
}

const SimulationControls = ({
  parameters,
  onParametersChange,
  isRunning,
  onStartStop,
  onReset
}: SimulationControlsProps) => {
  const handleChange = (field: keyof SimulationParameters, value: any) => {
    onParametersChange({
      ...parameters,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>Simulation Parameters</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency (GHz)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="frequency"
                  value={[parameters.frequency]}
                  min={0.7}
                  max={39}
                  step={0.1}
                  onValueChange={(vals) => handleChange('frequency', vals[0])}
                />
                <span className="w-12 text-center text-sm">{parameters.frequency.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bandwidth">Bandwidth (MHz)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="bandwidth"
                  value={[parameters.bandwidth]}
                  min={10}
                  max={400}
                  step={5}
                  onValueChange={(vals) => handleChange('bandwidth', vals[0])}
                />
                <span className="w-12 text-center text-sm">{parameters.bandwidth}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numerology">Numerology</Label>
              <Select 
                value={parameters.numerology.toString()} 
                onValueChange={(val) => handleChange('numerology', parseInt(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Numerology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0: 15 kHz SCS</SelectItem>
                  <SelectItem value="1">1: 30 kHz SCS</SelectItem>
                  <SelectItem value="2">2: 60 kHz SCS</SelectItem>
                  <SelectItem value="3">3: 120 kHz SCS</SelectItem>
                  <SelectItem value="4">4: 240 kHz SCS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="txPower">Transmit Power (dBm)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="txPower"
                  value={[parameters.txPower]}
                  min={10}
                  max={46}
                  step={1}
                  onValueChange={(vals) => handleChange('txPower', vals[0])}
                />
                <span className="w-12 text-center text-sm">{parameters.txPower}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nodeCount">UE Node Count</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="nodeCount"
                  value={[parameters.nodeCount]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(vals) => handleChange('nodeCount', vals[0])}
                />
                <span className="w-12 text-center text-sm">{parameters.nodeCount}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="simulationTime">Simulation Time (s)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="simulationTime"
                  value={[parameters.simulationTime]}
                  min={10}
                  max={300}
                  step={10}
                  onValueChange={(vals) => handleChange('simulationTime', vals[0])}
                />
                <span className="w-12 text-center text-sm">{parameters.simulationTime}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobilityPattern">Mobility Pattern</Label>
              <Select 
                value={parameters.mobilityPattern} 
                onValueChange={(val) => handleChange('mobilityPattern', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Mobility Pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Random Walk">Random Walk</SelectItem>
                  <SelectItem value="Random Waypoint">Random Waypoint</SelectItem>
                  <SelectItem value="Gauss-Markov">Gauss-Markov</SelectItem>
                  <SelectItem value="Static">Static</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propagationModel">Propagation Model</Label>
              <Select 
                value={parameters.propagationModel} 
                onValueChange={(val) => handleChange('propagationModel', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Propagation Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free Space">Free Space</SelectItem>
                  <SelectItem value="COST-231">COST-231</SelectItem>
                  <SelectItem value="3GPP TR 38.901">3GPP TR 38.901</SelectItem>
                  <SelectItem value="Ray Tracing">Ray Tracing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-1" /> Save Config
          </Button>
        </div>
        <Button 
          onClick={onStartStop} 
          variant={isRunning ? "destructive" : "success"}
        >
          {isRunning ? (
            <><Pause className="h-4 w-4 mr-1" /> Stop Simulation</>
          ) : (
            <><Play className="h-4 w-4 mr-1" /> Run Simulation</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimulationControls;
