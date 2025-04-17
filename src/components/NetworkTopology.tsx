
import { useEffect, useRef, useState } from "react";
import { NetworkData, Node, Link } from "@/utils/simulationData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

interface NetworkTopologyProps {
  networkData: NetworkData;
  isLoading?: boolean;
  className?: string; // Add className prop
}

const NetworkTopology = ({ 
  networkData,
  isLoading = false,
  className = "" // Add default value for className
}: NetworkTopologyProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [transform, setTransform] = useState({ scale: 1, translateX: 0, translateY: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  const width = 800;
  const height = 500;
  
  const handleZoomIn = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 3),
    }));
  };
  
  const handleZoomOut = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.5),
    }));
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setDragging(true);
      setDragStart({
        x: e.clientX - transform.translateX,
        y: e.clientY - transform.translateY,
      });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setTransform(prev => ({
        ...prev,
        translateX: e.clientX - dragStart.x,
        translateY: e.clientY - dragStart.y,
      }));
    }
  };
  
  const handleMouseUp = () => {
    setDragging(false);
  };
  
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };
  
  const nodeSize = (type: string) => {
    switch (type) {
      case 'Core': return 30;
      case 'gNodeB': return 20;
      case 'UE': return 10;
      default: return 15;
    }
  };
  
  const nodeColor = (status: string) => {
    switch (status) {
      case 'active': return 'hsl(var(--accent))';
      case 'inactive': return '#888';
      case 'warning': return '#f59e0b';
      default: return '#888';
    }
  };
  
  const linkColor = (status: string) => {
    switch (status) {
      case 'active': return 'hsl(var(--accent) / 0.6)';
      case 'congested': return '#f59e0b';
      case 'down': return '#ef4444';
      default: return '#888';
    }
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle>Network Topology</CardTitle>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        <div 
          className="w-full h-[500px] overflow-hidden cursor-move bg-slate-50 dark:bg-slate-900"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg 
            ref={svgRef} 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform={`translate(${transform.translateX},${transform.translateY}) scale(${transform.scale})`}>
              {/* Draw links first so they appear behind nodes */}
              {networkData.links.map((link, index) => {
                const source = networkData.nodes.find(n => n.id === link.source);
                const target = networkData.nodes.find(n => n.id === link.target);
                
                if (!source || !target) return null;
                
                const isActive = 
                  selectedNode === null || 
                  selectedNode.id === source.id || 
                  selectedNode.id === target.id;
                
                return (
                  <g key={`link-${index}`} opacity={isActive ? 1 : 0.2}>
                    <line 
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={linkColor(link.status)}
                      strokeWidth={2}
                      className="network-link"
                    />
                    {/* Show bandwidth on hover */}
                    <title>{`${link.bandwidth.toFixed(0)} Mbps, ${link.latency.toFixed(2)} ms`}</title>
                  </g>
                );
              })}
              
              {/* Draw nodes */}
              {networkData.nodes.map((node, index) => {
                const size = nodeSize(node.type);
                const isActive = selectedNode === null || selectedNode.id === node.id;
                
                return (
                  <g 
                    key={`node-${index}`} 
                    transform={`translate(${node.x},${node.y})`}
                    onClick={() => handleNodeClick(node)}
                    className="network-node"
                    opacity={isActive ? 1 : 0.4}
                    cursor="pointer"
                  >
                    {node.type === 'gNodeB' && (
                      <circle 
                        r={size * 2} 
                        fill={nodeColor(node.status)} 
                        opacity={0.1} 
                      />
                    )}
                    <circle 
                      r={size} 
                      fill={nodeColor(node.status)}
                    />
                    <text 
                      textAnchor="middle" 
                      y={size + 12} 
                      fontSize={10} 
                      fill="currentColor"
                    >
                      {node.id}
                    </text>
                    <title>{`${node.id} (${node.type}): ${node.status}`}</title>
                  </g>
                );
              })}
            </g>
          </svg>
          
          {selectedNode && (
            <div className="absolute bottom-4 left-4 bg-card p-3 rounded-md shadow-lg border max-w-[250px]">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{selectedNode.id}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={() => setSelectedNode(null)}
                >
                  ×
                </Button>
              </div>
              <div className="text-sm">
                <p>Type: {selectedNode.type}</p>
                <p>Status: <span className={
                  selectedNode.status === 'active' ? 'text-green-500' : 
                  selectedNode.status === 'warning' ? 'text-amber-500' : 
                  'text-gray-500'
                }>{selectedNode.status}</span></p>
                <p>Connections: {selectedNode.connections.length}</p>
              </div>
            </div>
          )}
          
          <div className="absolute top-4 right-4 bg-card bg-opacity-80 p-2 rounded text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-3 h-3 bg-accent rounded-full"></span>
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-3 h-3 bg-amber-500 rounded-full"></span>
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-gray-400 rounded-full"></span>
              <span>Inactive</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTopology;
