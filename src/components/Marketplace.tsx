import { ShoppingCart, Plus } from "lucide-react";

const Marketplace = () => {
  const products = [
    {
      name: "Organic Wheat",
      seller: "Farm Fresh Co.",
      quantity: "100kg",
      price: 299,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&h=250",
    },
    {
      name: "Premium Rice",
      seller: "Green Fields",
      quantity: "50kg",
      price: 199,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&h=250",
    },
    {
      name: "Fresh Corn",
      seller: "Harvest Hub",
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
              <p className="text-sm text-gray-600 mb-2">{product.seller}</p>
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
      <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 border-2 border-accent text-accent rounded-md hover:bg-accent hover:text-white transition-colors">
        <Plus className="w-5 h-5" />
        <span>List Your Product</span>
      </button>
    </div>
  );
};

export default Marketplace;