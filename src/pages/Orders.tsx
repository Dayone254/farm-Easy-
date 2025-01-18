import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FinancialSummary from "@/components/FinancialSummary";
import OrdersTable from "@/components/OrdersTable";
import { useUser } from "@/contexts/UserContext";

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
  const { userProfile } = useUser();
  const queryClient = useQueryClient();

  // Fetch orders using React Query
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', viewType, userProfile?.id],
    queryFn: async () => {
      console.log('Fetching orders for user:', userProfile?.id, 'viewType:', viewType);
      // Simulate API call - replace with actual API endpoint
      const response = await fetch(`/api/orders/${userProfile?.id}?type=${viewType}`).catch(() => {
        // Fallback data for demo purposes - remove this in production
        console.log('Using fallback order data');
        return {
          json: async () => ([
            {
              id: `ORD${Date.now()}1`,
              buyer: userProfile?.name || "Unknown",
              seller: "Farm Fresh Co.",
              items: "Wheat (50kg)",
              status: "Pending",
              location: userProfile?.location || "Unknown",
              price: 2500,
              paymentStatus: "In Escrow",
            },
            {
              id: `ORD${Date.now()}2`,
              buyer: userProfile?.name || "Unknown",
              seller: "Green Fields",
              items: "Rice (100kg)",
              status: "In Transit",
              location: userProfile?.location || "Unknown",
              price: 5000,
              paymentStatus: "In Escrow",
            }
          ])
        };
      });
      const data = await response.json();
      console.log('Received orders:', data);
      return data;
    },
    enabled: !!userProfile?.id,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Update order status mutation
  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: Order['status'] }) => {
      console.log('Updating order status:', orderId, newStatus);
      // Simulate API call - replace with actual API endpoint
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      }).catch(() => {
        console.log('Using mock update response');
        return { ok: true };
      });
      return response.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Order Updated",
        description: "The order status has been successfully updated.",
      });
    },
  });

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus.mutate({ orderId, newStatus });
  };

  const calculateFinancials = () => {
    const spent = orders.reduce((total, order) => 
      viewType === "buying" ? total + order.price : total, 0
    );
    const earned = orders.reduce((total, order) => 
      viewType === "selling" ? total + order.price : total, 0
    );
    return { totalSpent: spent, totalEarned: earned };
  };

  const downloadStatement = () => {
    // Create worksheet data
    const wsData = [
      ['Order ID', 'Date', viewType === 'buying' ? 'Seller' : 'Buyer', 'Items', 'Status', 'Payment Status', 'Amount (KSh)'],
      ...orders.map(order => [
        order.id,
        new Date().toLocaleDateString(),
        viewType === 'buying' ? order.seller : order.buyer,
        order.items,
        order.status,
        order.paymentStatus,
        order.price
      ])
    ];

    // Add total row
    const total = orders.reduce((sum, order) => sum + order.price, 0);
    wsData.push(['', '', '', '', '', 'Total:', total]);

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

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

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading orders...</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col space-y-4 mb-6">
        <h1 className="text-3xl font-bold text-[#2F5233]">Orders & Tracking</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Select value={viewType} onValueChange={(value: "buying" | "selling") => setViewType(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="View Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buying">My Purchases</SelectItem>
              <SelectItem value="selling">My Sales</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            onClick={downloadStatement}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2 border-[#2F5233] text-[#2F5233] hover:bg-[#2F5233] hover:text-cream"
          >
            <Download className="h-4 w-4" />
            Download Statement
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <FinancialSummary totalSpent={totalSpent} totalEarned={totalEarned} />
      </div>
      
      <Card className="p-4 sm:p-6">
        <OrdersTable 
          orders={orders}
          viewType={viewType}
          onStatusChange={handleStatusChange}
        />
      </Card>
    </div>
  );
};

export default Orders;