import { X, UserCheck, ExternalLink } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import ProductListingForm from "./ProductListingForm";

const Marketplace = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isListingFormOpen, setIsListingFormOpen] = useState(false);
  const { userProfile } = useUser();
  const { toast } = useToast();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Wheat",
      seller: {
        id: "seller1",
        name: "Farm Fresh Co.",
        isVerified: true,
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        location: "Nairobi",
        joinedDate: "2023",
        previousSales: [
          { item: "Premium Rice", date: "2024-01-15", rating: 4.5 },
          { item: "Organic Corn", date: "2024-01-10", rating: 5 },
        ],
      },
      quantity: "100kg",
      price: 299,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&h=250",
    },
    {
      name: "Premium Rice",
      seller: {
        name: "Green Fields",
        isVerified: false,
        profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
        location: "Mombasa",
        joinedDate: "2024",
        previousSales: [],
      },
      quantity: "50kg",
      price: 199,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&h=250",
    },
    {
      name: "Fresh Corn",
      seller: {
        name: "Harvest Hub",
        isVerified: true,
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
        location: "Kisumu",
        joinedDate: "2023",
        previousSales: [
          { item: "Organic Wheat", date: "2024-01-20", rating: 4.8 },
        ],
      },
      quantity: "75kg",
      price: 149,
      image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=400&h=250",
    },
  ]);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [{
      id: Date.now(),
      seller: {
        id: userProfile?.id,
        name: userProfile?.name,
        isVerified: userProfile?.isVerified,
        profileImage: userProfile?.profileImage || "",
        location: userProfile?.location,
        joinedDate: new Date().getFullYear().toString(),
        previousSales: [],
      },
      ...newProduct
    }, ...prev]);
    
    toast({
      title: "Product Listed",
      description: "Your product has been successfully added to the marketplace.",
    });
  };

  const handleMarkAsSold = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    toast({
      title: "Product Marked as Sold",
      description: "The product has been removed from the marketplace.",
    });
  };

  const handleRemoveProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    toast({
      description: "Product removed from marketplace",
    });
  };

  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Marketplace</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white bg-opacity-50 rounded-lg overflow-hidden relative">
            {product.seller.id === userProfile?.id && (
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-medium mb-2">{product.name}</h4>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedSeller(product.seller)}
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-accent/50 transition-all duration-300 group-hover:ring-accent">
                      <AvatarImage src={product.seller.profileImage} />
                      <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1">
                      {product.seller.isVerified && (
                        <Badge variant="secondary" className="h-5 scale-75">
                          <UserCheck className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium hover:text-accent cursor-pointer" onClick={() => setSelectedSeller(product.seller)}>
                      {product.seller.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{product.seller.location}</span>
                  </div>
                </div>
                <span className="font-semibold">${product.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{product.quantity}</span>
                {product.seller.id === userProfile?.id ? (
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => handleMarkAsSold(product.id)}
                  >
                    Mark as Sold
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Contact Seller",
                        description: `Contact ${product.seller.name} to purchase this item.`,
                      });
                    }}
                  >
                    Contact Seller
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {userProfile?.isVerified && (
        <Button
          className="w-full mt-6"
          variant="outline"
          onClick={() => setIsListingFormOpen(true)}
        >
          List Your Product
        </Button>
      )}

      <ProductListingForm
        isOpen={isListingFormOpen}
        onClose={() => setIsListingFormOpen(false)}
        onSubmit={handleAddProduct}
      />

      <Dialog open={!!selectedSeller} onOpenChange={() => setSelectedSeller(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Seller Profile</DialogTitle>
          </DialogHeader>
          {selectedSeller && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedSeller.profileImage} />
                  <AvatarFallback>{selectedSeller.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {selectedSeller.name}
                    {selectedSeller.isVerified && (
                      <Badge variant="secondary">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSeller.location} • Joined {selectedSeller.joinedDate}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Previous Sales</h4>
                {selectedSeller.previousSales.length > 0 ? (
                  <div className="space-y-2">
                    {selectedSeller.previousSales.map((sale, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-secondary/20 rounded">
                        <span>{sale.item}</span>
                        <div className="flex items-center gap-2">
                          <span>⭐ {sale.rating}</span>
                          <span className="text-muted-foreground">{sale.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No previous sales</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
