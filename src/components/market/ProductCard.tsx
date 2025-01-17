import { X, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface ProductCardProps {
  product: any;
  onRemove: (id: string | number) => void;
  onMarkAsSold: (id: string | number) => void;
  onSellerClick: (seller: any) => void;
}

const ProductCard = ({ product, onRemove, onMarkAsSold, onSellerClick }: ProductCardProps) => {
  const { userProfile } = useUser();
  const { toast } = useToast();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      {product.seller.id === userProfile?.id && (
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
        <h4 className="font-semibold text-lg">{product.name}</h4>
        <div className="flex items-center justify-between">
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
              <span className="text-sm font-medium hover:text-accent cursor-pointer" onClick={() => onSellerClick(product.seller)}>
                {product.seller.name}
              </span>
              <span className="text-xs text-muted-foreground">{product.seller.location}</span>
            </div>
          </div>
          <span className="font-bold text-lg text-primary">
            KSh {product.price.toLocaleString()}
          </span>
        </div>
        <div className="pt-2 border-t">
          {product.seller.id === userProfile?.id ? (
            <Button 
              variant="destructive"
              className="w-full"
              onClick={() => onMarkAsSold(product.id)}
            >
              Mark as Sold
            </Button>
          ) : (
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Contact Seller",
                  description: `Contact ${product.seller.name} to purchase this item.`,
                });
              }}
            >
              Contact Seller
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;