import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface ProductGridProps {
  category: string;
  priceRange: string;
  onAddToCart: (product: any) => void;
}

const ProductGrid = ({ category, priceRange, onAddToCart }: ProductGridProps) => {
  const products = [
    {
      id: 1,
      name: "DK777 Maize Seeds",
      category: "seeds",
      price: 980,
      location: "Nairobi",
      image: "/lovable-uploads/503fc31f-02e6-4c18-b440-2f7e76c6be55.png",
    },
    {
      id: 2,
      name: "NPK Fertilizer",
      category: "fertilizer",
      price: 3500,
      location: "Nakuru",
      image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Garden Hoe",
      category: "tools",
      price: 1200,
      location: "Mombasa",
      image: "https://images.unsplash.com/photo-1598751337485-033a71e42ef9?w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Fresh Tomatoes",
      category: "products",
      price: 800,
      location: "Kisumu",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    
    if (priceRange === "under1000") return product.price < 1000;
    if (priceRange === "1000to5000") return product.price >= 1000 && product.price <= 5000;
    if (priceRange === "over5000") return product.price > 5000;
    
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 space-y-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {product.location}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary">
                KSh {product.price.toLocaleString()}
              </span>
              <Button 
                onClick={() => onAddToCart(product)}
                size="sm"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;