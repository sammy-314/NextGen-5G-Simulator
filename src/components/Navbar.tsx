
import React, { useState } from "react";
import { 
  Menu, 
  WifiIcon, 
  Zap, 
  Activity, 
  Settings, 
  Share2, 
  Bell, 
  BarChart3, 
  Cpu, 
  Network,
  Layers,
  HelpCircle,
  Search,
  Home,
  ChevronDown,
  LogOut
} from "lucide-react";

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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  
  const clearNotifications = () => {
    setNotifications(0);
  };
  
  return (
    <nav 
      className={cn(
        "w-full p-2 md:px-6 md:py-4 flex items-center gap-4 sticky top-0 z-50 transition-all duration-300",
        isLandingPage 
          ? "bg-transparent backdrop-blur-md border-b border-white/10" 
          : "bg-sidebar shadow-md"
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <WifiIcon className={cn(
              "h-6 w-6 animate-pulse",
              isLandingPage ? "text-accent" : "text-accent"
            )} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-400"></span>
          </div>
          <h1 className={cn(
            "font-bold text-lg hidden md:block",
            isLandingPage ? "text-white" : "text-white"
          )}>
            5G Network <span className="text-accent font-extrabold">Simulator</span>
          </h1>
        </Link>
        
        {!isLandingPage && (
          <Button variant="ghost" size="icon" className="text-white md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Navigation Menu - Visible on medium screens and up */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-white/10",
                isLandingPage ? "text-white" : "text-white"
              )}>
                Home
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                "bg-transparent hover:bg-white/10",
                isLandingPage ? "text-white" : "text-white"
              )}>
                Dashboard
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500 to-accent p-6 no-underline outline-none focus:shadow-md"
                        to="/dashboard"
                      >
                        <Network className="h-6 w-6 text-white" />
                        <div className="mt-4 mb-2 text-lg font-medium text-white">
                          Network Simulator
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Advanced 5G network simulation platform with real-time metrics and visualization
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/metrics"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" /> Performance Metrics
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Detailed charts and analytics for network performance
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/controls"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none flex items-center gap-2">
                          <Cpu className="h-4 w-4" /> Simulation Controls
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Configure and manage network simulation parameters
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/topology"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none flex items-center gap-2">
                          <Layers className="h-4 w-4" /> Network Topology
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Interactive visualization of network architecture
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                "bg-transparent hover:bg-white/10",
                isLandingPage ? "text-white" : "text-white"
              )}>
                Documentation
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    {
                      title: "Introduction",
                      href: "/docs/introduction",
                      description:
                        "A comprehensive introduction to 5G network simulation"
                    },
                    {
                      title: "API Reference",
                      href: "/docs/api",
                      description:
                        "Detailed API documentation for simulation parameters"
                    },
                    {
                      title: "Examples",
                      href: "/docs/examples",
                      description:
                        "Learn from practical simulation examples and use cases"
                    },
                    {
                      title: "Advanced Usage",
                      href: "/docs/advanced",
                      description:
                        "Advanced techniques for complex network modeling"
                    }
                  ].map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/resources" className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-white/10",
                isLandingPage ? "text-white" : "text-white"
              )}>
                Resources
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center gap-3">
        {!isLandingPage && (
          <div className="hidden md:flex items-center gap-1.5 text-white bg-sidebar-accent px-3 py-1 rounded-full text-xs">
            <Zap className="h-3 w-3 text-accent" />
            <span>Simulation Active</span>
          </div>
        )}
        
        {!isLandingPage && (
          <>
            <Button variant="ghost" className="text-white relative" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
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
                <DropdownMenuLabel className="flex justify-between items-center">
                  Notifications
                  {notifications > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearNotifications} className="h-7 text-xs">
                      Clear all
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications > 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="py-4 text-center text-muted-foreground text-sm">
                    No new notifications
                  </div>
                )}
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
          </>
        )}
        
        {isLandingPage ? (
          <Button asChild className="bg-accent hover:bg-accent/90 text-white">
            <Link to="/dashboard">Launch Simulator</Link>
          </Button>
        ) : (
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
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Saved Simulations</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
