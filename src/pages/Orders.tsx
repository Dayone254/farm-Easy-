import OrdersTable from "../components/OrdersTable";
import { Package, Truck, CheckCircle } from "lucide-react";

const Orders = () => {
  const deliveryStages = [
    { icon: Package, label: "Order Placed", status: "completed" },
    { icon: Truck, label: "In Transit", status: "active" },
    { icon: CheckCircle, label: "Delivered", status: "pending" }
  ];

  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-6">Orders & Tracking</h1>
      
      <div className="glass-card rounded-lg p-6 hover-scale mb-6">
        <h3 className="text-xl font-semibold mb-6">Latest Order Status</h3>
        <div className="flex justify-between items-center">
          {deliveryStages.map((stage, index) => (
            <div key={stage.label} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                stage.status === 'active' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-400'
              }`}>
                <stage.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-600">{stage.label}</span>
              {index < deliveryStages.length - 1 && (
                <div className="absolute h-0.5 bg-gray-200 w-24 left-[calc(100%+1rem)]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <OrdersTable />
    </div>
  );
};

export default Orders;