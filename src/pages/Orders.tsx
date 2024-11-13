import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Order {
  id: string;
  buyer: string;
  items: string;
  status: "Pending" | "In Transit" | "Delivered" | "Cancelled";
  location: string;
}

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      buyer: "John Smith",
      items: "Wheat (50kg)",
      status: "Pending",
      location: "Farm A",
    },
    {
      id: "ORD002",
      buyer: "Sarah Johnson",
      items: "Rice (100kg)",
      status: "In Transit",
      location: "Farm B",
    },
    {
      id: "ORD003",
      buyer: "Mike Brown",
      items: "Corn (75kg)",
      status: "Delivered",
      location: "Farm C",
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Order Updated",
      description: `Order ${orderId} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-5 h-5 text-warning" />;
      case "In Transit":
        return <Truck className="w-5 h-5 text-accent" />;
      case "Delivered":
        return <Check className="w-5 h-5 text-success" />;
      case "Cancelled":
        return <X className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-6">Orders & Tracking</h1>
      
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Buyer</th>
                <th className="pb-4">Items</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Location</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-4">{order.id}</td>
                  <td className="py-4">{order.buyer}</td>
                  <td className="py-4">{order.items}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td className="py-4">{order.location}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      {order.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleStatusChange(order.id, "In Transit")}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(order.id, "Cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {order.status === "In Transit" && (
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleStatusChange(order.id, "Delivered")}
                        >
                          Mark Delivered
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Orders;