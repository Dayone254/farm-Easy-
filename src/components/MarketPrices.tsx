import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "../utils/currency";

const MarketPrices = () => {
  const prices = [
    { crop: "Wheat", price: 320, trend: "up" },
    { crop: "Rice", price: 450, trend: "down" },
    { crop: "Corn", price: 280, trend: "up" },
    { crop: "Soybeans", price: 520, trend: "up" },
  ];

  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <h3 className="text-xl font-semibold mb-6">Market Prices</h3>
      <div className="space-y-4">
        {prices.map((item) => (
          <div key={item.crop} className="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-md">
            <span className="font-medium">{item.crop}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{formatCurrency(item.price)}</span>
              {item.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-error" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPrices;