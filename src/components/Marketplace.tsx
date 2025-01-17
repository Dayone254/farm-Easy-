import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "./market/ProductCard";
import SellerDialog from "./market/SellerDialog";

interface MarketplaceProps {
  products: any[];
  setProducts: (products: any[]) => void;
}

const Marketplace = ({ products, setProducts }: MarketplaceProps) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRemove={handleRemoveProduct}
            onMarkAsSold={handleMarkAsSold}
            onSellerClick={setSelectedSeller}
          />
        ))}
      </div>

      <SellerDialog
        seller={selectedSeller}
        open={!!selectedSeller}
        onOpenChange={(open) => !open && setSelectedSeller(null)}
      />
    </div>
  );
};

export default Marketplace;