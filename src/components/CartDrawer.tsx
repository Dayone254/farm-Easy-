import { useState } from "react";
import { ShoppingCart, X, Trash2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const { toast } = useToast();

  if (!open) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!phoneNumber || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your payment processing backend
    toast({
      title: "Payment Initiated",
      description: `A payment request has been sent to ${phoneNumber} via ${paymentMethod}. Please check your phone to complete the transaction.`,
    });
    
    setIsCheckoutOpen(false);
    // You would typically wait for a webhook callback to confirm payment
  };

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
          <Button 
            className="w-full" 
            disabled={items.length === 0}
            onClick={() => setIsCheckoutOpen(true)}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Choose your payment method and enter your phone number to proceed
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="flex gap-2">
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button 
                className="w-full" 
                onClick={handleCheckout}
              >
                Pay KSh {total.toLocaleString()}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartDrawer;