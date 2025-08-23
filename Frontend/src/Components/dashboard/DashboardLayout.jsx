import { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { 
  BarChart3, 
  Factory, 
  Truck, 
  Zap, 
  Hammer, 
  Wheat, 
  Monitor, 
  Heart, 
  ShoppingCart, 
  Coffee,
  Settings,
  LogOut,
  Home,
  TrendingDown,
  AlertCircle,
  Target
} from "lucide-react";

const industryIcons = {
  "Manufacturing": <Factory className="h-4 w-4" />,
  "Transportation": <Truck className="h-4 w-4" />,
  "Energy & Utilities": <Zap className="h-4 w-4" />,
  "Construction": <Hammer className="h-4 w-4" />,
  "Agriculture": <Wheat className="h-4 w-4" />,
  "Technology": <Monitor className="h-4 w-4" />,
  "Healthcare": <Heart className="h-4 w-4" />,
  "Retail": <ShoppingCart className="h-4 w-4" />,
  "Food & Beverage": <Coffee className="h-4 w-4" />,
  "Other": <BarChart3 className="h-4 w-4" />
};

export function DashboardLayout({ user, onLogout, activeSection, onSectionChange, children }) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: <Home className="h-4 w-4" /> },
    { id: "emissions", label: "Emissions Tracking", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "industry", label: `${user.industry} Metrics`, icon: industryIcons[user.industry] || <BarChart3 className="h-4 w-4" /> },
    { id: "reduction", label: "Reduction Goals", icon: <Target className="h-4 w-4" /> },
    { id: "trends", label: "Trends & Analytics", icon: <TrendingDown className="h-4 w-4" /> },
    { id: "alerts", label: "Alerts", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-green-50 to-blue-50">
        <Sidebar className="border-r border-green-100 bg-white shadow-md">
          <SidebarHeader className="border-b border-green-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white">🌱</span>
              </div>
              <div>
                <h2 className="font-semibold text-green-800">Carbon Control</h2>
                <p className="text-xs text-green-600">{user.industry}</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={activeSection === item.id}
                    className={`w-full justify-start ${activeSection === item.id ? 'bg-green-100 text-green-800' : 'hover:bg-green-50'}`}
                  >
                    <span className={`${activeSection === item.id ? 'text-green-600' : ''}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <div className="mt-auto border-t border-green-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-8 w-8 bg-gradient-to-r from-green-600 to-green-500 text-white border-none">
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-green-800">{user.name}</p>
                <p className="text-xs text-green-600 truncate">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </Sidebar>

        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-green-800 mb-1">
                {activeSection === "overview" ? "Dashboard Overview" :
                 activeSection === "industry" ? `${user.industry} Metrics` :
                 activeSection === "emissions" ? "Emissions Tracking" :
                 activeSection === "reduction" ? "Reduction Goals" :
                 activeSection === "trends" ? "Trends & Analytics" :
                 activeSection === "alerts" ? "Alerts" :
                 activeSection === "settings" ? "Settings" : "Dashboard"}
              </h1>
              <p className="text-green-600">
                Welcome back, {user.name}. Here's the latest information about your carbon emissions.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
