import { useState } from "react";
import MarketPrices from "../components/MarketPrices";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Package } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Market = () => {
  const [cart, setCart] = useState<any[]>([]);
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleSellProduct = () => {
    toast({
      title: "List your product",
      description: "Your product listing form will open shortly.",
    });
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2F5233]">Market & Prices</h1>
        <div className="flex gap-4">
          <Button onClick={handleSellProduct} className="bg-[#2F5233]">
            <Plus className="mr-2 h-4 w-4" /> Sell Product
          </Button>
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketPrices />
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Nearby Marketplaces</h2>
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
    </div>
  );
};

export default Market;
