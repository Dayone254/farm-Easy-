import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-cream p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Your Cart
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="h-[calc(100vh-200px)] overflow-auto">
          {/* Cart items will go here */}
          <div className="text-center text-gray-500 mt-10">
            Your cart is empty
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-cream border-t">
          <Button className="w-full">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;