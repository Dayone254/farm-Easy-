import { ShoppingCart, Plus, UserCheck, ExternalLink } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";

const Marketplace = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const { userProfile } = useUser();

  const products = [
    {
      name: "Organic Wheat",
      seller: {
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
  ];

  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Marketplace</h3>
        <ShoppingCart className="w-8 h-8 text-accent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.name} className="bg-white bg-opacity-50 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-medium mb-2">{product.name}</h4>
              <div 
                className="flex items-center gap-2 mb-2 cursor-pointer hover:text-accent transition-colors"
                onClick={() => setSelectedSeller(product.seller)}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={product.seller.profileImage} />
                  <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{product.seller.name}</span>
                {product.seller.isVerified && (
                  <Badge variant="secondary" className="h-5">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">{product.quantity}</span>
                <span className="font-semibold">${product.price}</span>
              </div>
              <button className="w-full mt-4 bg-accent text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {userProfile?.isVerified && (
        <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 border-2 border-accent text-accent rounded-md hover:bg-accent hover:text-white transition-colors">
          <Plus className="w-5 h-5" />
          <span>List Your Product</span>
        </button>
      )}

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