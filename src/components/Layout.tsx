
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  UserCog, 
  Microscope, 
  Home, 
  Menu, 
  X,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };
  
  React.useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  
  React.useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform lg:translate-x-0 lg:relative",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col px-3 py-4">
          <div className="mb-6 flex items-center px-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-medical-blue to-medical-green flex items-center justify-center">
                <span className="text-white font-bold">EI</span>
              </div>
              <h1 className="text-xl font-bold">
                Eye<span className="text-medical-blue">Vision</span>
              </h1>
            </div>
          </div>
          
          <nav className="space-y-1 flex-1">
            <Link to="/" className={cn("nav-item", location.pathname === "/" && "active")}>
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/patients" className={cn("nav-item", location.pathname.includes("/patients") && "active")}>
              <Users size={18} />
              <span>Patients</span>
            </Link>
            <Link to="/doctors" className={cn("nav-item", location.pathname.includes("/doctors") && "active")}>
              <UserCog size={18} />
              <span>Doctors</span>
            </Link>
            <Link to="/researchers" className={cn("nav-item", location.pathname.includes("/researchers") && "active")}>
              <Microscope size={18} />
              <span>Researchers</span>
            </Link>
          </nav>
          
          <div className="border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-card px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <div className="text-lg font-medium ml-auto">Eye Vision Insights Platform</div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
