import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/currency";
import { ProductCardProps } from "@/types/market";
import ProductBuyerActions from "./ProductBuyerActions";
import ProductOwnerActions from "./ProductOwnerActions";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (!userProfile?.id || !product.seller?.id) {
      setIsOwner(false);
      return;
    }

    const currentUserId = String(userProfile.id);
    const sellerId = String(product.seller.id);
    
    console.log("ProductCard - Ownership Check:", {
      component: "ProductCard",
      productId: product.id,
      productName: product.name,
      currentUserId,
      sellerId,
      isOwner: currentUserId === sellerId,
      userProfile
    });

    setIsOwner(currentUserId === sellerId);
  }, [userProfile, product.seller, product.id, product.name]);

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
          profileImage: product.seller.profileImage,
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

    if (isOwner) {
      toast({
        variant: "destructive",
        title: "Invalid Action",
        description: "You cannot add your own products to cart.",
      });
      return;
    }

    onAddToCart(product);
  };

  const handleRemoveProduct = async () => {
    try {
      setIsLoading(true);
      await onRemove(product.id);
      toast({
        description: "Product removed successfully",
      });
    } catch (error) {
      console.error("Error removing product:", error);
      toast({
        variant: "destructive",
        description: "Failed to remove product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsSold = async () => {
    try {
      setIsLoading(true);
      await onMarkAsSold(product.id);
      toast({
        description: "Product marked as sold successfully",
      });
    } catch (error) {
      console.error("Error marking product as sold:", error);
      toast({
        variant: "destructive",
        description: "Failed to mark product as sold. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
            <ProductOwnerActions
              onRemove={handleRemoveProduct}
              onMarkAsSold={handleMarkAsSold}
              isLoading={isLoading}
            />
          ) : (
            <ProductBuyerActions
              onMessage={handleContactSeller}
              onAddToCart={handleAddToCart}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;