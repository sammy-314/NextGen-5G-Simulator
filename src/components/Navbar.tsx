
import { Menu, WifiIcon, Zap, Activity, Settings, Share2, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Navbar = () => {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <nav className="w-full bg-sidebar p-2 md:px-4 md:py-3 flex items-center gap-4 shadow-md">
      <div className="flex items-center gap-2 flex-1">
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="relative">
            <WifiIcon className="h-6 w-6 text-accent animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-400"></span>
          </div>
          <h1 className="font-bold text-lg text-white hidden md:block">
            5G Network <span className="text-accent font-extrabold">Simulator</span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-white bg-sidebar-accent px-3 py-1 rounded-full text-xs">
          <Zap className="h-3 w-3 text-accent" />
          <span>Simulation Active</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white relative" size="icon">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-sm">Simulation Complete</span>
                <span className="text-xs text-muted-foreground">Your simulation results are ready to view.</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-sm">Network Alert</span>
                <span className="text-xs text-muted-foreground">High interference detected in Node 3.</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-sm">New Update Available</span>
                <span className="text-xs text-muted-foreground">Version 2.1 with new models is available.</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback className="bg-accent/30 text-white">TK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Saved Simulations</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
