import MarketPrices from "../components/MarketPrices";
import Marketplace from "../components/Marketplace";

const Market = () => {
  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-6">Market & Marketplace</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketPrices />
        <div className="glass-card rounded-lg p-6 hover-scale">
          <h3 className="text-xl font-semibold mb-6">Nearby Marketplaces</h3>
          <div className="space-y-4">
            {[
              { name: "Green Valley Market", distance: "2.5 km", type: "Wholesale" },
              { name: "Farmers Central", distance: "5.1 km", type: "Retail" },
              { name: "Agri Hub", distance: "7.3 km", type: "Mixed" }
            ].map((market) => (
              <div key={market.name} className="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-md">
                <div>
                  <h4 className="font-medium">{market.name}</h4>
                  <p className="text-sm text-gray-600">{market.type}</p>
                </div>
                <span className="text-sm text-gray-600">{market.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Marketplace />
    </div>
  );
};

export default Market;