import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SimulationParameters } from './simulationData';

// Define the type for simulation results to match what we need for the report
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

// Extend the jsPDF type to include the lastAutoTable property added by jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

export const generatePdfReport = (
  parameters: SimulationParameters, 
  results: SimulationResult,
  timestamp: string = new Date().toLocaleString()
) => {
  // Initialize jsPDF
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 153);
  doc.text('5G Network Simulation Report', 105, 15, { align: 'center' });
  
  // Add timestamp
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated: ${timestamp}`, 105, 22, { align: 'center' });
  
  // Add simulation parameters section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Simulation Parameters', 14, 35);
  
  // Add parameters table
  autoTable(doc, {
    startY: 40,
    head: [['Parameter', 'Value']],
    body: [
      ['Frequency (GHz)', parameters.frequency.toString()],
      ['Bandwidth (MHz)', parameters.bandwidth.toString()],
      ['Numerology', parameters.numerology.toString()],
      ['Transmit Power (dBm)', parameters.txPower.toString()],
      ['UE Node Count', parameters.nodeCount.toString()],
      ['Simulation Time (s)', parameters.simulationTime.toString()],
      ['Mobility Pattern', parameters.mobilityPattern],
      ['Propagation Model', parameters.propagationModel],
    ],
    theme: 'striped',
    headStyles: { fillColor: [0, 51, 153] }
  });
  
  // Add simulation results section
  doc.setFontSize(14);
  doc.text('Simulation Results', 14, doc.lastAutoTable.finalY + 15);
  
  // Add results table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Metric', 'Value']],
    body: [
      ['Simulation Duration', `${results.simulationTime} seconds`],
      ['Average Throughput', `${results.avgThroughput.toFixed(2)} Mbps`],
      ['Maximum Throughput', `${results.maxThroughput.toFixed(2)} Mbps`],
      ['Average Latency', `${results.avgLatency.toFixed(2)} ms`],
      ['Minimum Latency', `${results.minLatency.toFixed(2)} ms`],
      ['Average Packet Loss', `${results.avgPacketLoss.toFixed(3)} %`],
      ['Spectral Efficiency', `${results.spectralEfficiency.toFixed(2)} bps/Hz`],
      ['User Equipment Count', results.ueCount.toString()],
      ['Coverage Estimate', `${results.coverageEstimate.toFixed(1)} %`],
      ['Energy Efficiency', `${results.energyEfficiency.toFixed(2)} bits/Joule`]
    ],
    theme: 'striped',
    headStyles: { fillColor: [0, 51, 153] }
  });
  
  // Add footer with page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      '5G Network Simulator - Performance Report',
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10
    );
  }
  
  // Save the PDF with a filename based on timestamp
  const filename = `5G_Simulation_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
  
  return filename;
};

