import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Marketplace from "@/components/Marketplace";
import ProductListingForm from "@/components/ProductListingForm";
import CartDrawer from "@/components/CartDrawer";
import MarketFilters from "@/components/market/MarketFilters";
import MarketHeader from "@/components/market/MarketHeader";
import { useUser } from "@/contexts/UserContext";

const STORAGE_KEY = "marketplace_products";

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { userProfile } = useUser();

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (newProduct: any) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    setIsListingFormOpen(false);
    toast({
      title: "Product Listed",
      description: "Your product has been successfully added to the marketplace.",
    });
  };

  const handleOrderCreated = (orderDetails: any) => {
    toast({
      title: "Order Created",
      description: "Your order has been created and is now being processed.",
    });
    navigate("/orders");
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
    
    if (priceRange === "under1000") return product.price < 1000;
    if (priceRange === "1000to5000") return product.price >= 1000 && product.price <= 5000;
    if (priceRange === "over5000") return product.price > 5000;
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <MarketHeader 
        cartItems={cartItems}
        onCartOpen={() => setIsCartOpen(true)}
        onListProduct={() => setIsListingFormOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-1">
          <MarketFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            isFiltersOpen={isFiltersOpen}
            setIsFiltersOpen={setIsFiltersOpen}
          />
        </div>

        <div className="lg:col-span-5">
          <div className="mb-4 flex justify-end">
            <Button 
              onClick={() => setIsListingFormOpen(true)}
              className="bg-accent hover:bg-accent/90"
            >
              List Product
            </Button>
          </div>
          <Marketplace products={filteredProducts} setProducts={setProducts} />
        </div>
      </div>

      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(index) => {
          setCartItems(prev => prev.filter((_, i) => i !== index));
        }}
        onOrderCreated={handleOrderCreated}
      />

      <ProductListingForm
        isOpen={isListingFormOpen}
        onClose={() => setIsListingFormOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default Market;