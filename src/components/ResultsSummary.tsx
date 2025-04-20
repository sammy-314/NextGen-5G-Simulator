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
import { FileText } from "lucide-react";
import { generatePdfReport } from "@/utils/reportGenerator";
import { useToast } from "@/hooks/use-toast";
import { SimulationParameters } from "@/utils/simulationData";

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
  parameters?: SimulationParameters;
}

const ResultsSummary = ({ results, parameters }: ResultsSummaryProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    try {
      if (!parameters) {
        toast({
          title: "Export Failed",
          description: "Missing simulation parameters for report generation.",
          variant: "destructive",
        });
        return;
      }

      const filename = generatePdfReport(parameters, results);
      
      toast({
        title: "Report Generated",
        description: `Successfully generated ${filename}`,
        variant: "default",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF report.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle>Simulation Results</CardTitle>
        <div className="flex space-x-2">
          <Button variant="success" size="sm" onClick={handleExport}>
            <FileText className="h-4 w-4 mr-1" /> Generate PDF
          </Button>
        </div>
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
