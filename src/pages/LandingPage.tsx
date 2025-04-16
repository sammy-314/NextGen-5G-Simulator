
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  BarChart3, 
  Cpu, 
  Zap, 
  ArrowRight,
  Globe,
  Activity,
  WifiIcon,
  Shield,
  Users
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Next-Gen Networking Technology
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Advanced 5G Network <br />
              <span className="text-gradient">Simulation Platform</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl">
              Model, simulate, and analyze 5G network performance with our powerful,
              interactive visualization platform designed for researchers and engineers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link to="/dashboard">
                  Launch Simulator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <a href="#features">
                  Explore Features
                </a>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 p-6 shadow-xl overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className="relative flex flex-col items-center justify-center h-full gap-8">
                  <Network className="w-16 h-16 text-accent animate-float" />
                  <div className="text-white text-lg font-medium">Network Topology</div>
                  <div className="grid grid-cols-3 gap-3 w-full">
                    <div className="h-2 bg-accent/50 rounded animate-pulse"></div>
                    <div className="h-2 bg-accent/30 rounded animate-pulse"></div>
                    <div className="h-2 bg-accent/70 rounded animate-pulse"></div>
                    <div className="h-2 bg-accent/40 rounded animate-pulse"></div>
                    <div className="h-2 bg-accent/60 rounded animate-pulse"></div>
                    <div className="h-2 bg-accent/20 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Simulation Features</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Advanced tools for 5G network modeling, analysis, and performance optimization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Network className="h-8 w-8 text-accent" />,
              title: "Network Topology",
              description: "Interactive visualization of complex network structures with real-time updates and status monitoring"
            },
            {
              icon: <BarChart3 className="h-8 w-8 text-accent" />,
              title: "Performance Metrics",
              description: "Comprehensive analysis of throughput, latency, packet loss, SNR, SINR, and other critical metrics"
            },
            {
              icon: <Cpu className="h-8 w-8 text-accent" />,
              title: "Simulation Controls",
              description: "Fine-tune parameters like frequency, bandwidth, numerology, and transmit power for precise modeling"
            },
            {
              icon: <Globe className="h-8 w-8 text-accent" />,
              title: "Coverage Analysis",
              description: "Visualize and optimize signal coverage across different environments and deployment scenarios"
            },
            {
              icon: <Activity className="h-8 w-8 text-accent" />,
              title: "Real-Time Updates",
              description: "Dynamic simulation with continuous feedback and adjustable time scales"
            },
            {
              icon: <Shield className="h-8 w-8 text-accent" />,
              title: "Research-Grade Tools",
              description: "Publication-quality data and analysis for academic and industry research applications"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
              <div className="rounded-lg bg-accent/10 p-3 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Applications & Use Cases</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">Explore how our platform empowers telecommunications research and development</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-1 bg-gradient-to-br from-accent/20 to-accent/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <WifiIcon className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Network Planning</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-accent/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>
                <span>Optimize base station placement</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-accent/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>
                <span>Coverage vs capacity analysis</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-accent/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>
                <span>Frequency allocation strategies</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 lg:col-span-1 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Academic Research</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <span>Novel algorithm development</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <span>Performance benchmarking</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>
                <span>Publication-quality results</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 lg:col-span-1 bg-gradient-to-br from-graph-cyan/20 to-graph-cyan/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <Zap className="h-12 w-12 text-graph-cyan mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Industry Applications</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-graph-cyan/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-graph-cyan rounded-full"></div>
                </div>
                <span>Equipment testing & validation</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-graph-cyan/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-graph-cyan rounded-full"></div>
                </div>
                <span>Deployment scenario modeling</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-graph-cyan/20 rounded-full p-1">
                  <div className="w-1.5 h-1.5 bg-graph-cyan rounded-full"></div>
                </div>
                <span>Cost optimization strategies</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Simulating?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Launch our powerful 5G network simulator and gain valuable insights into your network design and performance.
            </p>
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
              <Link to="/dashboard">
                Launch Simulator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <WifiIcon className="h-6 w-6 text-accent mr-2" />
            <span className="font-bold text-lg text-white">
              5G Network <span className="text-accent">Simulator</span>
            </span>
          </div>
          
          <div className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Advanced Telecommunications Research • All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
