import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "./market/ProductCard";
import SellerDialog from "./market/SellerDialog";

interface MarketplaceProps {
  products: any[];
  setProducts: (products: any[]) => void;
  onAddToCart: (product: any) => void;
}

const Marketplace = ({ products, setProducts, onAddToCart }: MarketplaceProps) => {
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
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
              onAddToCart={onAddToCart}
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