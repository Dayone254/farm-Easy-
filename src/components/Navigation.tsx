import { useState } from "react";
import { Link } from "react-router-dom";
import { CloudSun, Sprout, DollarSign, Package, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { icon: CloudSun, label: "Weather", path: "/weather" },
    { icon: Sprout, label: "Crops", path: "/crops" },
    { icon: DollarSign, label: "Market", path: "/market" },
    { icon: Package, label: "Orders", path: "/orders" },
  ];

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#2F5233] text-cream transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-2 top-2 p-2 text-cream hover:bg-[#1F371F] rounded-full lg:hidden"
      >
        <Menu size={24} />
      </button>
      
      <div className="flex flex-col gap-2 p-4 pt-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-4 p-3 text-cream hover:bg-[#1F371F] rounded-lg transition-colors"
          >
            <item.icon size={24} />
            {isExpanded && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;