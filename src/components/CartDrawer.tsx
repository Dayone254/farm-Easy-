import { useState } from "react";
import { ShoppingCart, X, Trash2, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  if (!open) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!phoneNumber || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment request to M-Pesa
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show payment prompt notification
      toast({
        title: "Payment Request Sent",
        description: "Please check your phone for the M-Pesa payment prompt",
      });

      // Simulate payment confirmation
      await new Promise(resolve => setTimeout(resolve, 3000));

      toast({
        title: "Payment Successful",
        description: "Your payment is now held securely in escrow until you receive your items.",
        duration: 5000,
      });
      
      setIsCheckoutOpen(false);
      onClose();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Payment will be held securely until you receive your items</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">KSh {total.toLocaleString()}</span>
          </div>
          <Button 
            className="w-full" 
            disabled={items.length === 0}
            onClick={() => setIsCheckoutOpen(true)}
          >
            Proceed to Mobile Payment
          </Button>
        </div>
      </div>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mobile Payment & Escrow</DialogTitle>
            <DialogDescription>
              Enter your phone number to receive a payment prompt. Your payment will be held in escrow until you confirm receipt of items.
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

            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-sm text-green-700">
              <Phone className="h-4 w-4" />
              <span>You will receive a payment prompt on your phone</span>
            </div>
          </div>

          <DialogFooter>
            <Button 
              className="w-full" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              <Shield className="w-4 h-4 mr-2" />
              {isProcessing ? "Processing..." : `Pay KSh ${total.toLocaleString()} via Mobile Money`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartDrawer;