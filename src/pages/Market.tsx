import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, ShoppingCart } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Marketplace from "@/components/Marketplace";
import ProductListingForm from "@/components/ProductListingForm";

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);

  const handleAddProduct = (newProduct: any) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    setIsListingFormOpen(false);
    toast({
      title: "Product Listed",
      description: "Your product has been successfully added to the marketplace.",
    });
  };

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
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-3">
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Filters
                </h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                    {isFiltersOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium mb-1">Categories</h4>
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="space-y-1"
                  >
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={category.id} id={category.id} />
                        <label htmlFor={category.id} className="text-xs cursor-pointer">
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h4 className="text-xs font-medium mb-1">Price Range</h4>
                  <RadioGroup
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="space-y-1"
                  >
                    {priceRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={range.id} id={range.id} />
                        <label htmlFor={range.id} className="text-xs cursor-pointer">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <h4 className="text-xs font-medium mb-1">Location</h4>
                  <Input 
                    type="text" 
                    placeholder="Enter location..." 
                    className="w-full h-8 text-xs"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setIsListingFormOpen(true)} className="bg-accent hover:bg-accent/90">
              Sell Product
            </Button>
          </div>
          <Marketplace products={products} setProducts={setProducts} />
        </div>
      </div>

      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(index) => {
          setCartItems(prev => prev.filter((_, i) => i !== index));
        }}
      />

      <ProductListingForm
        isOpen={isListingFormOpen}
        onClose={() => setIsListingFormOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

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

export default Market;