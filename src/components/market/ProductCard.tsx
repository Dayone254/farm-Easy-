import { X, UserCheck, MessageCircle, ShoppingCart } from "lucide-react";
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

const ProductCard = ({ product, onRemove, onMarkAsSold, onSellerClick, onAddToCart }: ProductCardProps) => {
  const { userProfile } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleContactSeller = () => {
    if (!userProfile) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to message sellers.",
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
        }
      }
    });
  };

  const isOwner = userProfile?.id === product.seller.id;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative animate-fade-up">
      {isOwner && (
        <button
          onClick={() => onRemove(product.id)}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
        >
          <X className="h-4 w-4 text-red-500" />
        </button>
      )}
      
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
                  <UserCheck className="h-3 w-3" />
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

        <div className="pt-2 border-t space-y-2">
          {isOwner ? (
            <Button 
              variant="destructive"
              className="w-full"
              onClick={() => onMarkAsSold(product.id)}
            >
              Mark as Sold
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={handleContactSeller}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button
                className="flex-1"
                onClick={() => onAddToCart(product)}
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