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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STORAGE_KEY = "marketplace_products";
const CART_STORAGE_KEY = "cart_items";

const Market = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const savedProducts = userProfile?.savedProducts || [];

  // Load products and cart items from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    const savedCartItems = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddProduct = (newProduct: any) => {
    const productWithSeller = {
      ...newProduct,
      seller: {
        id: userProfile?.id || '',
        name: userProfile?.name || '',
        location: userProfile?.location || '',
        isVerified: userProfile?.isVerified || false,
        profileImage: userProfile?.profileImage || null,
        previousSales: []
      }
    };
    
    setProducts(prevProducts => [productWithSeller, ...prevProducts]);
    setIsListingFormOpen(false);
    toast({
      description: "Product listed successfully",
    });
  };

  const handleAddToCart = (product: any) => {
    const currentUserId = String(userProfile?.id || '');
    const sellerId = String(product.seller?.id || '');
    const isOwner = Boolean(currentUserId && sellerId && currentUserId === sellerId);
    
    console.log("Market Page - Add to Cart Final Check:", {
      component: "Market",
      productId: product.id,
      productName: product.name,
      currentUserId,
      sellerId,
      isOwner,
      userProfile
    });

    if (!userProfile) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please login to add items to cart.",
      });
      return;
    }

    if (isOwner) {
      toast({
        variant: "destructive",
        title: "Invalid Action",
        description: "You cannot add your own products to cart.",
      });
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      seller: {
        id: product.seller.id,
        name: product.seller.name
      }
    };

    setCartItems(prev => [...prev, cartItem]);
    toast({
      description: "Product added to cart",
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    toast({
      description: "Product removed from cart",
    });
  };

  const handleOrderCreated = (orderDetails: any) => {
    toast({
      title: "Order Created",
      description: "Your order has been created and is now being processed.",
    });
    setCartItems([]);
    navigate("/orders");
  };

  const filteredProducts = products.filter((product) => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    
    // Price range filter
    if (priceRange === "under1000") return product.price < 1000;
    if (priceRange === "1000to5000") return product.price >= 1000 && product.price <= 5000;
    if (priceRange === "over5000") return product.price > 5000;
    
    return true;
  });

  const canListProducts = userProfile?.userType !== 'buyer';

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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="lg:col-span-5">
          {canListProducts && (
            <div className="mb-4 flex justify-end">
              <Button 
                onClick={() => setIsListingFormOpen(true)}
                className="bg-accent hover:bg-accent/90"
              >
                List Product
              </Button>
            </div>
          )}

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="saved">Saved Products</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Marketplace 
                products={filteredProducts} 
                setProducts={setProducts} 
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
            <TabsContent value="saved">
              <Marketplace 
                products={savedProducts}
                setProducts={setProducts}
                onAddToCart={handleAddToCart}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
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
