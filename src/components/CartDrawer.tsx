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
import { useUser } from "@/contexts/UserContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  seller: {
    id: string;
    name: string;
  };
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onOrderCreated: (orderDetails: any) => void;
}

const CartDrawer = ({ open, onClose, items, onRemoveItem, onOrderCreated }: CartDrawerProps) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { userProfile } = useUser();

  if (!open) return null;

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!phoneNumber || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment request to M-Pesa
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Payment Request Sent",
        description: "Please check your phone for the M-Pesa payment prompt",
      });

      // Simulate payment confirmation
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create order objects for each item
      const orders = items.map(item => ({
        id: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
        buyer: userProfile?.name || "Unknown Buyer",
        seller: item.seller.name,
        items: item.name,
        status: "Pending",
        location: userProfile?.location || "Unknown Location",
        price: item.price,
        paymentStatus: "In Escrow",
      }));

      // Call the onOrderCreated callback with the new orders
      onOrderCreated(orders);

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
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-xl z-50">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Seller: {item.seller.name}
                    </p>
                    <p className="text-sm font-medium">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-bold">KSh {total.toLocaleString()}</span>
          </div>
          <div>
            <Button
              className="w-full"
              disabled={items.length === 0}
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceed to Mobile Payment
            </Button>
          </div>
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
          
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                id="phone"
                placeholder="e.g., 0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="payment" className="block text-sm font-medium mb-2">
                Payment Method
              </label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                </SelectContent>
              </Select>
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