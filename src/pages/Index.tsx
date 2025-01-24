import WeatherCard from "../components/WeatherCard";
import SoilAnalysis from "../components/SoilAnalysis";
import MarketPrices from "../components/MarketPrices";
import CommunityForum from "../components/CommunityForum";
import OrdersTable from "../components/OrdersTable";
import Marketplace from "../components/Marketplace";
import MarketUpdates from "../components/MarketUpdates";
import { useState, useEffect } from "react";
import { useFarmStore } from "@/stores/farmStore";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const farmDetails = useFarmStore((state) => state.farmDetails);
  const { toast } = useToast();
  const [soilData, setSoilData] = useState({
    moisture: 0,
    temperature: 24,
    ph: 0,
    cropType: "Not specified",
    growthStage: "Not specified",
    lastUpdated: new Date().toISOString()
  });

  const [orders] = useState([
    {
      id: "ORD001",
      buyer: "John Smith",
      seller: "Farm Fresh Co.",
      items: "Wheat (50kg)",
      status: "Pending" as const,
      location: "Farm A",
      price: 2500,
      paymentStatus: "In Escrow" as const,
    },
  ]);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Only update soil data if farmDetails exists and has valid soil information
    if (farmDetails?.soil) {
      setSoilData(prevData => ({
        ...prevData,
        moisture: farmDetails.soil.type ? 70 : 0,
        ph: farmDetails.soil.type ? 6.8 : 0,
        cropType: farmDetails.crops?.[0]?.name || "Not specified",
      }));
    }
  }, [farmDetails]);

  const handleStatusChange = (orderId: string, newStatus: "Pending" | "In Transit" | "Delivered" | "Cancelled" | "Payment Held" | "Payment Released") => {
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  const handleAddToCart = (product: any) => {
    console.log("Add to cart functionality is only available in the Market page");
  };

  // Early return if farm details are not loaded yet
  if (!farmDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-white p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 fade-up">Loading Farm Details...</h1>
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 fade-up">FarmEasy Dashboard</h1>
          <p className="text-gray-600 fade-up">Your complete farming management solution</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
          <WeatherCard />
          <SoilAnalysis data={soilData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
          <MarketPrices />
          <MarketUpdates />
        </div>

        <div className="fade-in">
          <OrdersTable 
            orders={orders}
            viewType="buying"
            onStatusChange={handleStatusChange}
          />
        </div>

        <div className="fade-in">
          <Marketplace 
            products={products} 
            setProducts={setProducts} 
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;