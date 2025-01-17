import { X, UserCheck } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { Card } from "./ui/card";

interface MarketplaceProps {
  products: any[];
  setProducts: (products: any[]) => void;
}

const Marketplace = ({ products, setProducts }: MarketplaceProps) => {
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const { userProfile } = useUser();
  const { toast } = useToast();

  const handleMarkAsSold = (productId: string | number) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      title: "Product Marked as Sold",
      description: "The product has been removed from the marketplace.",
    });
  };

  const handleRemoveProduct = (productId: string | number) => {
    setProducts(products.filter(product => product.id !== productId));
    toast({
      description: "Product removed from marketplace",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
            {product.seller.id === userProfile?.id && (
              <button
                onClick={() => handleRemoveProduct(product.id)}
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
                    onClick={() => setSelectedSeller(product.seller)}
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
                    <span className="text-sm font-medium hover:text-accent cursor-pointer" onClick={() => setSelectedSeller(product.seller)}>
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
                    onClick={() => handleMarkAsSold(product.id)}
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
        ))}
      </div>

      <Dialog open={!!selectedSeller} onOpenChange={() => setSelectedSeller(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Seller Profile</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedSeller.profileImage} />
                  <AvatarFallback>{selectedSeller.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {selectedSeller.name}
                    {selectedSeller.isVerified && (
                      <Badge variant="secondary">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSeller.location} • Joined {selectedSeller.joinedDate}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Previous Sales</h4>
                {selectedSeller.previousSales.length > 0 ? (
                  <div className="space-y-2">
                    {selectedSeller.previousSales.map((sale, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-secondary/20 rounded">
                        <span>{sale.item}</span>
                        <div className="flex items-center gap-2">
                          <span>⭐ {sale.rating}</span>
                          <span className="text-muted-foreground">{sale.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No previous sales</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;