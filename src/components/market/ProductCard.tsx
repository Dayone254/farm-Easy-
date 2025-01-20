import { MessageSquare, ShoppingCart, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/currency";

interface ProductCardProps {
  product: any;
  onRemove: (id: string | number) => void;
  onMarkAsSold: (id: string | number) => void;
  onSellerClick: (seller: any) => void;
  onAddToCart: (product: any) => void;
}

const ProductCard = ({ 
  product, 
  onRemove, 
  onMarkAsSold, 
  onSellerClick, 
  onAddToCart 
}: ProductCardProps) => {
  const { userProfile } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Strict ownership check
  const isOwner = Boolean(
    userProfile?.id && 
    product.seller?.id && 
    userProfile.id === product.seller.id
  );

  const handleContactSeller = () => {
    if (!userProfile) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to message sellers.",
      });
      return;
    }

    // Prevent messaging yourself
    if (isOwner) {
      toast({
        variant: "destructive",
        description: "You cannot message yourself about your own product.",
      });
      return;
    }

    navigate("/messages", { 
      state: { 
        selectedContact: {
          id: product.seller.id,
          name: product.seller.name,
          userType: product.seller.userType || "seller",
          profileImage: product.seller.profileImage,
          phoneNumber: product.seller.phoneNumber || "",
          status: "Active now"
        },
        productInfo: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        }
      }
    });
  };

  const handleAddToCart = () => {
    if (!userProfile) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to add items to cart.",
      });
      return;
    }

    // Prevent adding own products to cart
    if (isOwner) {
      toast({
        variant: "destructive",
        description: "You cannot add your own products to cart.",
      });
      return;
    }

    onAddToCart(product);
    toast({
      description: "Product added to cart successfully",
    });
  };

  const handleRemoveProduct = () => {
    if (!isOwner) {
      toast({
        variant: "destructive",
        description: "You can only remove your own products.",
      });
      return;
    }

    onRemove(product.id);
  };

  const handleMarkAsSold = () => {
    if (!isOwner) {
      toast({
        variant: "destructive",
        description: "You can only mark your own products as sold.",
      });
      return;
    }

    onMarkAsSold(product.id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative animate-fade-up">
      <div className="aspect-video relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg">{product.name}</h4>
          <span className="font-bold text-lg text-primary">
            {formatCurrency(product.price)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <div 
              className="relative cursor-pointer group"
              onClick={() => onSellerClick(product.seller)}
            >
              <Avatar className="h-10 w-10 ring-2 ring-accent/50 transition-all duration-300 group-hover:ring-accent">
                <AvatarImage src={product.seller.profileImage} />
                <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
              </Avatar>
              {product.seller.isVerified && (
                <Badge variant="secondary" className="absolute -bottom-1 -right-1 h-5 scale-75">
                  ✓
                </Badge>
              )}
            </div>
            <div className="flex flex-col">
              <span 
                className="text-sm font-medium hover:text-accent cursor-pointer" 
                onClick={() => onSellerClick(product.seller)}
              >
                {product.seller.name}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{product.seller.location}</span>
                <span>•</span>
                <span>{product.seller.previousSales?.length || 0} sales</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          {isOwner ? (
            <div className="flex gap-2">
              <Button 
                variant="destructive"
                className="flex-1"
                onClick={handleRemoveProduct}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleMarkAsSold}
              >
                Mark as Sold
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={handleContactSeller}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;