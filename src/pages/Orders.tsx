import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, Truck, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  buyer: string;
  seller: string;
  items: string;
  status: "Pending" | "In Transit" | "Delivered" | "Cancelled" | "Payment Held" | "Payment Released";
  location: string;
  price: number;
  paymentStatus: "Pending" | "In Escrow" | "Released" | "Refunded";
}

const Orders = () => {
  const { toast } = useToast();
  const [viewType, setViewType] = useState<"buying" | "selling">("buying");
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      buyer: "John Smith",
      seller: "Farm Fresh Co.",
      items: "Wheat (50kg)",
      status: "Pending",
      location: "Farm A",
      price: 2500,
      paymentStatus: "In Escrow",
    },
    {
      id: "ORD002",
      buyer: "Sarah Johnson",
      seller: "Green Fields",
      items: "Rice (100kg)",
      status: "In Transit",
      location: "Farm B",
      price: 5000,
      paymentStatus: "In Escrow",
    },
    {
      id: "ORD003",
      buyer: "Mike Brown",
      seller: "Harvest Hub",
      items: "Corn (75kg)",
      status: "Delivered",
      location: "Farm C",
      price: 3500,
      paymentStatus: "Released",
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        let paymentStatus = order.paymentStatus;
        
        // Update payment status based on order status
        if (newStatus === "Delivered") {
          paymentStatus = "Released";
        } else if (newStatus === "Cancelled") {
          paymentStatus = "Refunded";
        }
        
        return { ...order, status: newStatus, paymentStatus };
      }
      return order;
    }));

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
      case "Payment Held":
        return <DollarSign className="w-5 h-5 text-warning" />;
      case "Payment Released":
        return <DollarSign className="w-5 h-5 text-success" />;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => 
    viewType === "buying" ? order.buyer === "John Smith" : order.seller === "Farm Fresh Co."
  );

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2F5233]">Orders & Tracking</h1>
        <Select value={viewType} onValueChange={(value: "buying" | "selling") => setViewType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buying">My Purchases</SelectItem>
            <SelectItem value="selling">My Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">{viewType === "buying" ? "Seller" : "Buyer"}</th>
                <th className="pb-4">Items</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Payment</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Location</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-4">{order.id}</td>
                  <td className="py-4">{viewType === "buying" ? order.seller : order.buyer}</td>
                  <td className="py-4">{order.items}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.paymentStatus === "Released" ? "bg-green-100 text-green-800" :
                      order.paymentStatus === "In Escrow" ? "bg-yellow-100 text-yellow-800" :
                      order.paymentStatus === "Refunded" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4">KSh {order.price.toLocaleString()}</td>
                  <td className="py-4">{order.location}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      {viewType === "selling" && order.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleStatusChange(order.id, "In Transit")}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(order.id, "Cancelled")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {viewType === "selling" && order.status === "In Transit" && (
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleStatusChange(order.id, "Delivered")}
                        >
                          Mark Delivered
                        </Button>
                      )}
                      {viewType === "buying" && order.status === "Delivered" && order.paymentStatus === "In Escrow" && (
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleStatusChange(order.id, "Payment Released")}
                        >
                          Release Payment
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