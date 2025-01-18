import WeatherCard from "../components/WeatherCard";
import SoilAnalysis from "../components/SoilAnalysis";
import MarketPrices from "../components/MarketPrices";
import CommunityForum from "../components/CommunityForum";
import OrdersTable from "../components/OrdersTable";
import Marketplace from "../components/Marketplace";
import { useState } from "react";

const Index = () => {
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

  const soilData = {
    moisture: 70,
    temperature: 24,
    ph: 6.8,
    cropType: "Wheat",
    growthStage: "Flowering",
    lastUpdated: new Date().toISOString()
  };

  const handleStatusChange = (orderId: string, newStatus: "Pending" | "In Transit" | "Delivered" | "Cancelled" | "Payment Held" | "Payment Released") => {
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  const handleAddToCart = (product: any) => {
    console.log("Add to cart functionality is only available in the Market page");
  };

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
          <CommunityForum />
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