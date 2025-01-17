import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface MarketHeaderProps {
  cartItems: any[];
  onCartOpen: () => void;
  onListProduct: () => void;
}

const MarketHeader = ({ cartItems, onCartOpen, onListProduct }: MarketHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="relative"
          onClick={onCartOpen}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MarketHeader;