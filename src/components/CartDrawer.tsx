import { ShoppingCart, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  name: string;
  price: number;
  location: string;
  image: string;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
}

const CartDrawer = ({ open, onClose, items, onRemoveItem }: CartDrawerProps) => {
  if (!open) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

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
            Your Cart ({items.length})
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="h-[calc(100vh-280px)] overflow-auto">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.location}</p>
                      <p className="font-semibold">KSh {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-cream border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">KSh {total.toLocaleString()}</span>
          </div>
          <Button className="w-full" disabled={items.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;