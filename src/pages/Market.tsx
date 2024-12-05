import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Filter, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Products" },
    { id: "fertilizer", label: "Fertilizers" },
    { id: "tools", label: "Farming Tools" },
    { id: "seeds", label: "Seeds" },
    { id: "products", label: "Farm Products" },
  ];

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "under1000", label: "Under KSh 1,000" },
    { id: "1000to5000", label: "KSh 1,000 - 5,000" },
    { id: "over5000", label: "Over KSh 5,000" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button 
            onClick={() => {
              toast({
                title: "List Your Product",
                description: "Product listing form will open shortly.",
              });
            }}
          >
            Sell Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        <Card className="p-4 h-fit">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <RadioGroup
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="space-y-2"
              >
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={category.id} id={category.id} />
                    <label htmlFor={category.id} className="text-sm cursor-pointer">
                      {category.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Price Range</h3>
              <RadioGroup
                value={priceRange}
                onValueChange={setPriceRange}
                className="space-y-2"
              >
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={range.id} id={range.id} />
                    <label htmlFor={range.id} className="text-sm cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Location</h3>
              <Input 
                type="text" 
                placeholder="Enter location..." 
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid 
            category={selectedCategory} 
            priceRange={priceRange}
          />
        </div>
      </div>

      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};

export default Market;