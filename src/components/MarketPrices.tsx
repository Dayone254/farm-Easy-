import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { formatCurrency } from "../utils/currency";
import { useMarketPrices } from "../utils/marketApi";
import { useToast } from "@/hooks/use-toast";

const MarketPrices = () => {
  const { data: prices, isLoading, error } = useMarketPrices();
  const { toast } = useToast();

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch market prices. Please try again later.",
    });
  }

  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Market Prices</h3>
        <span className="text-xs text-muted-foreground">
          Updates every 5 minutes
        </span>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {prices?.map((item) => (
            <div 
              key={item.crop} 
              className="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-md"
            >
              <div className="space-y-1">
                <span className="font-medium">{item.crop}</span>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(item.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
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
      )}
    </div>
  );
};

export default MarketPrices;