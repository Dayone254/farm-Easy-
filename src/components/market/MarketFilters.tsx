import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Filter, ChevronDown, ChevronUp, Search } from "lucide-react";

interface MarketFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

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

const MarketFilters = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  isFiltersOpen,
  setIsFiltersOpen,
  searchQuery,
  setSearchQuery,
}: MarketFiltersProps) => {
  return (
    <Card className="p-3 space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <div className="flex items-center justify-between">
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
  );
};

export default MarketFilters;