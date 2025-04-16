
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Download } from "lucide-react";

interface SimulationResult {
  simulationTime: number;
  avgThroughput: number;
  avgLatency: number;
  avgPacketLoss: number;
  spectralEfficiency: number;
  ueCount: number;
  coverageEstimate: number;
  energyEfficiency: number;
  maxThroughput: number;
  minLatency: number;
}

interface ResultsSummaryProps {
  results: SimulationResult;
}

const ResultsSummary = ({ results }: ResultsSummaryProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle>Simulation Results</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" /> Export
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Simulation Duration</TableCell>
              <TableCell>{results.simulationTime} seconds</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Throughput</TableCell>
              <TableCell>{results.avgThroughput.toFixed(2)} Mbps</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Maximum Throughput</TableCell>
              <TableCell>{results.maxThroughput.toFixed(2)} Mbps</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Latency</TableCell>
              <TableCell>{results.avgLatency.toFixed(2)} ms</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Minimum Latency</TableCell>
              <TableCell>{results.minLatency.toFixed(2)} ms</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Average Packet Loss</TableCell>
              <TableCell>{results.avgPacketLoss.toFixed(3)} %</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Spectral Efficiency</TableCell>
              <TableCell>{results.spectralEfficiency.toFixed(2)} bps/Hz</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>User Equipment Count</TableCell>
              <TableCell>{results.ueCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coverage Estimate</TableCell>
              <TableCell>{results.coverageEstimate.toFixed(1)} %</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Energy Efficiency</TableCell>
              <TableCell>{results.energyEfficiency.toFixed(2)} bits/Joule</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ResultsSummary;
