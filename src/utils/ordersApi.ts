import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

const ORDERS_STORAGE_KEY = "marketplace_orders";

// Helper function to get orders from localStorage
const getStoredOrders = (): Order[] => {
  const orders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return orders ? JSON.parse(orders) : [];
};

// Helper function to save orders to localStorage
const saveOrders = (orders: Order[]) => {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const useOrders = (viewType: "buying" | "selling", userId?: string) => {
  return useQuery({
    queryKey: ["orders", viewType, userId],
    queryFn: async () => {
      console.log("Fetching orders:", { viewType, userId });
      const allOrders = getStoredOrders();
      
      // Filter orders based on viewType and userId
      return allOrders.filter(order => {
        if (viewType === "buying") {
          return order.buyer === userId;
        } else {
          return order.seller === userId;
        }
      });
    },
    enabled: !!userId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      orderId, 
      newStatus 
    }: { 
      orderId: string; 
      newStatus: Order["status"]; 
    }) => {
      const orders = getStoredOrders();
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      
      saveOrders(updatedOrders);
      return { orderId, newStatus };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const createOrder = (orderData: Omit<Order, "id">): Order => {
  const orders = getStoredOrders();
  const newOrder = {
    ...orderData,
    id: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
  };
  
  saveOrders([...orders, newOrder]);
  return newOrder;
};