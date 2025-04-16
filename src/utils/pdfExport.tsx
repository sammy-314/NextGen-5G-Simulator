
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    minHeight: 30,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#F8F9FA',
    fontWeight: 'bold',
  },
  tableHeaderCell: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    width: '50%',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    width: '50%',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
  timestamp: {
    fontSize: 10, 
    color: '#666666',
    marginBottom: 15,
    textAlign: 'right',
  },
});

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

// PDF Document component
const ResultsPDF = ({ results }: { results: SimulationResult }) => {
  const currentDate = new Date().toLocaleString();
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>5G Network Simulation Results</Text>
        <Text style={styles.timestamp}>Generated: {currentDate}</Text>
        
        <Text style={styles.subtitle}>Performance Metrics</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderCell}>Metric</Text>
            <Text style={styles.tableHeaderCell}>Value</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Simulation Duration</Text>
            <Text style={styles.tableCell}>{results.simulationTime} seconds</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Average Throughput</Text>
            <Text style={styles.tableCell}>{results.avgThroughput.toFixed(2)} Mbps</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Maximum Throughput</Text>
            <Text style={styles.tableCell}>{results.maxThroughput.toFixed(2)} Mbps</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Average Latency</Text>
            <Text style={styles.tableCell}>{results.avgLatency.toFixed(2)} ms</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Minimum Latency</Text>
            <Text style={styles.tableCell}>{results.minLatency.toFixed(2)} ms</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Average Packet Loss</Text>
            <Text style={styles.tableCell}>{results.avgPacketLoss.toFixed(3)} %</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Spectral Efficiency</Text>
            <Text style={styles.tableCell}>{results.spectralEfficiency.toFixed(2)} bps/Hz</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>User Equipment Count</Text>
            <Text style={styles.tableCell}>{results.ueCount}</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Coverage Estimate</Text>
            <Text style={styles.tableCell}>{results.coverageEstimate.toFixed(1)} %</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Energy Efficiency</Text>
            <Text style={styles.tableCell}>{results.energyEfficiency.toFixed(2)} bits/Joule</Text>
          </View>
        </View>
        
        <Text style={styles.footer}>
          5G Network Simulation Platform • Advanced Telecommunications Research
        </Text>
      </Page>
    </Document>
  );
};

export { ResultsPDF };
