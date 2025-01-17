import { useState } from "react";
import { Link } from "react-router-dom";
import { CloudSun, Sprout, DollarSign, Package, LayoutDashboard, Menu, Calculator, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userProfile } = useUser();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/", showFor: ["farmer", "vendor"] },
    { icon: CloudSun, label: "Weather", path: "/weather", showFor: ["farmer"] },
    { icon: Sprout, label: "Crops", path: "/crops", showFor: ["farmer"] },
    { icon: DollarSign, label: "Market", path: "/market", showFor: ["farmer", "vendor"] },
    { icon: Package, label: "Orders", path: "/orders", showFor: ["farmer", "vendor"] },
    { icon: Calculator, label: "Financing", path: "/financing", showFor: ["farmer", "vendor"] },
    { icon: UserCheck, label: "Profile", path: "/profile", showFor: ["farmer", "vendor"] },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.showFor.includes(userProfile?.userType || "farmer")
  );

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
            {filteredNavItems.map((item) => (
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
            {filteredNavItems.map((item) => (
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