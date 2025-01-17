import { Button } from "@/components/ui/button";
import { Check, X, Clock, Truck, DollarSign, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

interface OrdersTableProps {
  orders: Order[];
  viewType: "buying" | "selling";
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void;
}

const OrdersTable = ({ orders, viewType, onStatusChange }: OrdersTableProps) => {
  const { toast } = useToast();

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
        return <Shield className="w-5 h-5 text-warning" />;
      case "Payment Released":
        return <DollarSign className="w-5 h-5 text-success" />;
      default:
        return null;
    }
  };

  const handlePaymentRelease = (orderId: string) => {
    onStatusChange(orderId, "Payment Released");
    toast({
      title: "Payment Released",
      description: "The payment has been released to the seller.",
    });
  };

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
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
            {orders.map((order) => (
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
                          onClick={() => onStatusChange(order.id, "In Transit")}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onStatusChange(order.id, "Cancelled")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {viewType === "selling" && order.status === "In Transit" && (
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => onStatusChange(order.id, "Delivered")}
                      >
                        Mark Delivered
                      </Button>
                    )}
                    {viewType === "buying" && 
                     order.status === "Delivered" && 
                     order.paymentStatus === "In Escrow" && (
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handlePaymentRelease(order.id)}
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

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-gray-600">
                  {viewType === "buying" ? order.seller : order.buyer}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className="text-sm">{order.status}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Items:</span>
                <span className="text-sm">{order.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-sm">KSh {order.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="text-sm">{order.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  order.paymentStatus === "Released" ? "bg-green-100 text-green-800" :
                  order.paymentStatus === "In Escrow" ? "bg-yellow-100 text-yellow-800" :
                  order.paymentStatus === "Refunded" ? "bg-red-100 text-red-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              {viewType === "selling" && order.status === "Pending" && (
                <>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => onStatusChange(order.id, "In Transit")}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onStatusChange(order.id, "Cancelled")}
                  >
                    Reject
                  </Button>
                </>
              )}
              {viewType === "selling" && order.status === "In Transit" && (
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => onStatusChange(order.id, "Delivered")}
                >
                  Mark Delivered
                </Button>
              )}
              {viewType === "buying" && 
               order.status === "Delivered" && 
               order.paymentStatus === "In Escrow" && (
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => handlePaymentRelease(order.id)}
                >
                  Release Payment
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;