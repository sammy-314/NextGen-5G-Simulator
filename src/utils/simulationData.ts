
export interface Node {
  id: string;
  type: 'gNodeB' | 'UE' | 'Core' | 'Router';
  x: number;
  y: number;
  status: 'active' | 'inactive' | 'warning';
  connections: string[];
}

export interface Link {
  source: string;
  target: string;
  status: 'active' | 'congested' | 'down';
  bandwidth: number;
  latency: number;
}

export interface NetworkData {
  nodes: Node[];
  links: Link[];
}

export interface MetricData {
  timestamp: number;
  throughput: number;
  latency: number;
  packetLoss: number;
  snr: number;
  sinr: number;
  rsrp: number;
}

export interface SimulationParameters {
  frequency: number;
  bandwidth: number;
  numerology: number;
  transmitPower: number;
  nodeCount: number;
  mobilityPattern: string;
  interferenceModel: string;
  propagationModel: string;
  simulationTime: number;
  trafficPattern: string;
}

// Initial simulation parameters
export const defaultSimulationParameters: SimulationParameters = {
  frequency: 3.5, // GHz
  bandwidth: 100, // MHz
  numerology: 1, // 0-4
  transmitPower: 30, // dBm
  nodeCount: 10,
  mobilityPattern: 'Random Walk',
  interferenceModel: 'SINR Based',
  propagationModel: 'Free Space',
  simulationTime: 60, // seconds
  trafficPattern: 'Constant Bit Rate',
};

// Generate random network topology
export const generateNetworkTopology = (): NetworkData => {
  const nodes: Node[] = [];
  const links: Link[] = [];
  
  // Create Core Network
  nodes.push({
    id: 'core1',
    type: 'Core',
    x: 400,
    y: 100,
    status: 'active',
    connections: [],
  });
  
  // Create gNodeBs (5G Base Stations)
  for (let i = 0; i < 3; i++) {
    const nodeId = `gnb${i+1}`;
    nodes.push({
      id: nodeId,
      type: 'gNodeB',
      x: 150 + i * 200,
      y: 250,
      status: Math.random() > 0.8 ? 'warning' : 'active',
      connections: [],
    });
    
    // Connect to core
    links.push({
      source: 'core1',
      target: nodeId,
      status: Math.random() > 0.9 ? 'congested' : 'active',
      bandwidth: 10000,
      latency: 1 + Math.random() * 2,
    });
    
    nodes[0].connections.push(nodeId);
    nodes[nodes.length - 1].connections.push('core1');
  }
  
  // Create UEs (User Equipment)
  for (let i = 0; i < 12; i++) {
    const nodeId = `ue${i+1}`;
    // Determine which gNodeB this UE connects to
    const gNodeBIndex = Math.floor(i / 4) + 1;
    const gNodeBId = `gnb${gNodeBIndex}`;
    
    // Calculate position relative to the gNodeB
    const angle = (i % 4) * (Math.PI / 2) + Math.random() * 0.5;
    const distance = 70 + Math.random() * 30;
    const gNodeB = nodes.find(n => n.id === gNodeBId)!;
    
    nodes.push({
      id: nodeId,
      type: 'UE',
      x: gNodeB.x + Math.cos(angle) * distance,
      y: gNodeB.y + Math.sin(angle) * distance,
      status: Math.random() > 0.9 ? 'inactive' : 'active',
      connections: [],
    });
    
    // Connect to gNodeB
    links.push({
      source: gNodeBId,
      target: nodeId,
      status: Math.random() > 0.9 ? 'congested' : 'active',
      bandwidth: 100 + Math.random() * 900,
      latency: 5 + Math.random() * 10,
    });
    
    const gNodeBNode = nodes.find(n => n.id === gNodeBId)!;
    gNodeBNode.connections.push(nodeId);
    nodes[nodes.length - 1].connections.push(gNodeBId);
  }
  
  return { nodes, links };
};

// Generate time-series metrics data
export const generateMetricsData = (duration: number = 60, interval: number = 5): MetricData[] => {
  const data: MetricData[] = [];
  const now = Date.now();
  
  for (let i = 0; i <= duration; i += interval) {
    data.push({
      timestamp: now - (duration - i) * 1000,
      throughput: 100 + Math.sin(i * 0.1) * 20 + Math.random() * 10,
      latency: 10 + Math.cos(i * 0.1) * 5 + Math.random() * 2,
      packetLoss: Math.max(0, Math.sin(i * 0.05) * 2 + Math.random() * 0.5),
      snr: 20 + Math.sin(i * 0.08) * 5 + Math.random() * 2,
      sinr: 12 + Math.cos(i * 0.1) * 3 + Math.random() * 1.5,
      rsrp: -80 - Math.sin(i * 0.05) * 10 - Math.random() * 5,
    });
  }
  
  return data;
};

// Simulate network status change based on parameters
export const simulateNetworkUpdate = (
  network: NetworkData, 
  parameters: SimulationParameters
): NetworkData => {
  // Deep clone to avoid mutating the original
  const updatedNetwork = JSON.parse(JSON.stringify(network)) as NetworkData;
  
  // Apply simple simulation logic based on parameters
  updatedNetwork.nodes.forEach(node => {
    // Higher node count increases chance of inactive nodes
    if (parameters.nodeCount > 15 && Math.random() < 0.1) {
      node.status = Math.random() < 0.3 ? 'inactive' : 'warning';
    } else {
      node.status = Math.random() < 0.85 ? 'active' : 'warning';
    }
  });
  
  updatedNetwork.links.forEach(link => {
    // Higher bandwidth reduces congestion chance
    const congestionChance = 0.05 + (100 - parameters.bandwidth) / 200;
    link.status = Math.random() < congestionChance ? 'congested' : 'active';
    
    // Update link properties based on parameters
    link.latency = 5 + (Math.random() * 10) * (1 + (parameters.nodeCount - 10) / 20);
    link.bandwidth = parameters.bandwidth * 10 * (0.9 + Math.random() * 0.2);
  });
  
  return updatedNetwork;
};

// Generate summary results
export const generateSimulationResults = (
  parameters: SimulationParameters,
  metricsData: MetricData[]
) => {
  const lastMetric = metricsData[metricsData.length - 1];
  const avgThroughput = metricsData.reduce((sum, m) => sum + m.throughput, 0) / metricsData.length;
  const avgLatency = metricsData.reduce((sum, m) => sum + m.latency, 0) / metricsData.length;
  const avgPacketLoss = metricsData.reduce((sum, m) => sum + m.packetLoss, 0) / metricsData.length;
  const spectralEfficiency = avgThroughput / parameters.bandwidth;
  
  return {
    simulationTime: parameters.simulationTime,
    avgThroughput,
    avgLatency,
    avgPacketLoss,
    spectralEfficiency,
    ueCount: parameters.nodeCount,
    coverageEstimate: 85 + Math.random() * 10,
    energyEfficiency: 20 + Math.random() * 10,
    maxThroughput: Math.max(...metricsData.map(m => m.throughput)),
    minLatency: Math.min(...metricsData.map(m => m.latency)),
  };
};
