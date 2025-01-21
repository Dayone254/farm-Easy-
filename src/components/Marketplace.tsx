import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "./market/ProductCard";
import SellerDialog from "./market/SellerDialog";
import { useUser } from "@/contexts/UserContext";

interface MarketplaceProps {
  products: any[];
  setProducts: (products: any[]) => void;
  onAddToCart: (product: any) => void;
}

const Marketplace = ({ products, setProducts, onAddToCart }: MarketplaceProps) => {
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const { toast } = useToast();
  const { userProfile } = useUser();

  const handleAddToCart = (product: any) => {
    const currentUserId = String(userProfile?.id || '');
    const sellerId = String(product.seller?.id || '');
    const isOwner = Boolean(currentUserId && sellerId && currentUserId === sellerId);
    
    console.log("Marketplace - Add to Cart Check:", {
      component: "Marketplace",
      productId: product.id,
      productName: product.name,
      currentUserId,
      sellerId,
      isOwner,
      userProfile
    });
    
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

  const handleRemoveProduct = (productId: string | number) => {
    // Strict ownership check based on user profile ID
    if (!userProfile?.id) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to manage your products.",
      });
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product || product.seller?.id !== userProfile.id) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You can only remove your own products.",
      });
      return;
    }

    setProducts(products.filter(p => p.id !== productId));
    toast({
      description: "Product removed from marketplace",
    });
  };

  const handleMarkAsSold = (productId: string | number) => {
    // Strict ownership check based on user profile ID
    if (!userProfile?.id) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to manage your products.",
      });
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product || product.seller?.id !== userProfile.id) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You can only mark your own products as sold.",
      });
      return;
    }

    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Success",
      description: "Product has been marked as sold.",
    });
  };

  return (
    <div className="space-y-6">
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available in the marketplace yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRemove={handleRemoveProduct}
              onMarkAsSold={handleMarkAsSold}
              onSellerClick={setSelectedSeller}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      <SellerDialog
        seller={selectedSeller}
        open={!!selectedSeller}
        onOpenChange={(open) => !open && setSelectedSeller(null)}
      />
    </div>
  );
};

export default Marketplace;