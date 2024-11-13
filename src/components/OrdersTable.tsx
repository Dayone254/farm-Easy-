import { Truck, CheckCircle, Clock } from "lucide-react";

const OrdersTable = () => {
  const orders = [
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
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-5 h-5 text-warning" />;
      case "In Transit":
        return <Truck className="w-5 h-5 text-accent" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card rounded-lg p-6 hover-scale overflow-x-auto">
      <h3 className="text-xl font-semibold mb-6">Orders</h3>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="pb-4">Order ID</th>
            <th className="pb-4">Buyer</th>
            <th className="pb-4">Items</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Location</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;