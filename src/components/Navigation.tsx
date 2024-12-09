import { useState } from "react";
import { Link } from "react-router-dom";
import { CloudSun, Sprout, DollarSign, Package, LayoutDashboard, Menu, Calculator, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: CloudSun, label: "Weather", path: "/weather" },
    { icon: Sprout, label: "Crops", path: "/crops" },
    { icon: DollarSign, label: "Market", path: "/market" },
    { icon: Package, label: "Orders", path: "/orders" },
    { icon: Calculator, label: "Financing", path: "/financing" },
    { icon: UserCheck, label: "Profile", path: "/profile" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 bg-[#2F5233] text-cream transition-all duration-300 z-50",
        isExpanded ? "h-auto" : "h-16"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">FarmEasy</Link>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-cream hover:bg-[#1F371F] rounded-full md:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 p-2 text-cream hover:bg-[#1F371F] rounded-lg transition-colors"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isExpanded && (
          <div className="md:hidden py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 p-3 text-cream hover:bg-[#1F371F] rounded-lg transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;