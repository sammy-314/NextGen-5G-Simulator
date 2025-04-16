
import { Menu, WifiIcon, Zap, Activity, Settings, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full bg-sidebar p-2 md:p-3 flex items-center gap-4 shadow-md">
      <div className="flex items-center gap-2 flex-1">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <WifiIcon className="h-6 w-6 text-accent" />
          <h1 className="font-bold text-lg text-white hidden md:block">
            5G Network <span className="text-accent">Simulator</span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1 text-white bg-sidebar-accent px-3 py-1 rounded-full text-xs">
          <Zap className="h-3 w-3 text-accent" />
          <span>Simulation Active</span>
        </div>
        
        <Button variant="ghost" className="text-white" size="icon">
          <Activity className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" className="text-white" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button variant="outline" className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent/90 text-white border-none">
          <Share2 className="h-4 w-4" />
          <span>Share Results</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
