
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
import { Download, FilePdf } from "lucide-react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResultsPDF } from "@/utils/pdfExport";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  
  // Handle PDF download fallback for SSR
  useState(() => {
    setIsClient(true);
  });
  
  const handleExportCSV = () => {
    // Create CSV content
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Simulation Duration', `${results.simulationTime} seconds`],
      ['Average Throughput', `${results.avgThroughput.toFixed(2)} Mbps`],
      ['Maximum Throughput', `${results.maxThroughput.toFixed(2)} Mbps`],
      ['Average Latency', `${results.avgLatency.toFixed(2)} ms`],
      ['Minimum Latency', `${results.minLatency.toFixed(2)} ms`],
      ['Average Packet Loss', `${results.avgPacketLoss.toFixed(3)} %`],
      ['Spectral Efficiency', `${results.spectralEfficiency.toFixed(2)} bps/Hz`],
      ['User Equipment Count', `${results.ueCount}`],
      ['Coverage Estimate', `${results.coverageEstimate.toFixed(1)} %`],
      ['Energy Efficiency', `${results.energyEfficiency.toFixed(2)} bits/Joule`]
    ];
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `5g-simulation-results-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "CSV Export Successful",
      description: "The simulation results have been exported as CSV."
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle>Simulation Results</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-1" /> CSV
          </Button>
          
          {isClient && (
            <PDFDownloadLink 
              document={<ResultsPDF results={results} />}
              fileName={`5g-simulation-results-${new Date().toISOString().split('T')[0]}.pdf`}
              className="inline-flex"
            >
              {({ loading, error }) => (
                <Button 
                  variant="default" 
                  size="sm"
                  disabled={loading}
                  onClick={() => {
                    if (!loading && !error) {
                      toast({
                        title: "PDF Export Successful",
                        description: "The simulation results have been exported as PDF."
                      });
                    }
                  }}
                >
                  <FilePdf className="h-4 w-4 mr-1" /> 
                  {loading ? 'Loading...' : 'PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          )}
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
