import { MessageSquare, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductBuyerActionsProps {
  onMessage: () => void;
  onAddToCart: () => void;
}

const ProductBuyerActions = ({ onMessage, onAddToCart }: ProductBuyerActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline"
        className="flex-1"
        onClick={onMessage}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Message
      </Button>
      <Button
        className="flex-1"
        onClick={onAddToCart}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductBuyerActions;