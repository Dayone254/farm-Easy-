import WeatherCard from "../components/WeatherCard";
import SoilAnalysis from "../components/SoilAnalysis";
import MarketPrices from "../components/MarketPrices";
import CommunityForum from "../components/CommunityForum";
import OrdersTable from "../components/OrdersTable";
import Marketplace from "../components/Marketplace";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 fade-up">FarmEasy Dashboard</h1>
          <p className="text-gray-600 fade-up">Your complete farming management solution</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
          <WeatherCard />
          <SoilAnalysis />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
          <MarketPrices />
          <CommunityForum />
        </div>

        <div className="fade-in">
          <OrdersTable />
        </div>

        <div className="fade-in">
          <Marketplace />
        </div>
      </div>
    </div>
  );
};

export default Index;