import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, ShoppingCart } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import ProductListingForm from "@/components/ProductListingForm";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
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
          <Button onClick={() => setIsListingFormOpen(true)}>
            Sell Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className="lg:col-span-1">
          <Card className="p-4 h-fit">
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isFiltersOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Categories</h4>
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="space-y-1"
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
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <RadioGroup
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="space-y-1"
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
                  <h4 className="font-medium mb-2">Location</h4>
                  <Input 
                    type="text" 
                    placeholder="Enter location..." 
                    className="w-full"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

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

      <ProductListingForm
        isOpen={isListingFormOpen}
        onClose={() => setIsListingFormOpen(false)}
      />
    </div>
  );
};

export default Market;
