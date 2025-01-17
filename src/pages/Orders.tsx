import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FinancialSummary from "@/components/FinancialSummary";
import OrdersTable from "@/components/OrdersTable";

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

  const filteredOrders = orders.filter(order => 
    viewType === "buying" ? order.buyer === "John Smith" : order.seller === "Farm Fresh Co."
  );

  const calculateFinancials = () => {
    const spent = filteredOrders.reduce((total, order) => 
      viewType === "buying" ? total + order.price : total, 0
    );
    const earned = filteredOrders.reduce((total, order) => 
      viewType === "selling" ? total + order.price : total, 0
    );
    return { totalSpent: spent, totalEarned: earned };
  };

  const downloadStatement = () => {
    // Create worksheet data
    const wsData = [
      ['Order ID', 'Date', viewType === 'buying' ? 'Seller' : 'Buyer', 'Items', 'Status', 'Payment Status', 'Amount (KSh)'],
      ...filteredOrders.map(order => [
        order.id,
        new Date().toLocaleDateString(), // You might want to add actual dates to your orders
        viewType === 'buying' ? order.seller : order.buyer,
        order.items,
        order.status,
        order.paymentStatus,
        order.price
      ])
    ];

    // Add total row
    const total = filteredOrders.reduce((sum, order) => sum + order.price, 0);
    wsData.push(['', '', '', '', '', 'Total:', total]);

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Style the header row
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + '1';
      if (!ws[address]) continue;
      ws[address].s = {
        fill: { fgColor: { rgb: "2F5233" }, patternType: "solid" },
        font: { color: { rgb: "FFFFFF" }, bold: true }
      };
    }

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, `${viewType === 'buying' ? 'Purchases' : 'Sales'} Statement`);

    // Generate and download the file
    XLSX.writeFile(wb, `${viewType === 'buying' ? 'purchases' : 'sales'}_statement.xlsx`);

    toast({
      title: "Statement Downloaded",
      description: `Your ${viewType === 'buying' ? 'purchases' : 'sales'} statement has been downloaded.`,
    });
  };

  const { totalSpent, totalEarned } = calculateFinancials();

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2F5233]">Orders & Tracking</h1>
        <div className="flex gap-4 items-center">
          <Button
            onClick={downloadStatement}
            variant="outline"
            className="flex items-center gap-2 border-[#2F5233] text-[#2F5233] hover:bg-[#2F5233] hover:text-cream"
          >
            <Download className="h-4 w-4" />
            Download Statement
          </Button>
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
      </div>

      <FinancialSummary totalSpent={totalSpent} totalEarned={totalEarned} />
      
      <Card className="p-6">
        <OrdersTable 
          orders={filteredOrders}
          viewType={viewType}
          onStatusChange={handleStatusChange}
        />
      </Card>
    </div>
  );
};

export default Orders;
