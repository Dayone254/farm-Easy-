import { useQuery } from "@tanstack/react-query";

export interface MarketUpdate {
  id: string;
  title: string;
  description: string;
  category: "market" | "trends" | "technology" | "policy";
  date: string;
}

// Simulated API call since we don't have a real API endpoint yet
const fetchMarketUpdates = async (): Promise<MarketUpdate[]> => {
  // Simulated API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    {
      id: "1",
      title: "New Agricultural Trade Policies",
      description: "Recent updates to agricultural trade regulations and their impact on market dynamics.",
      category: "policy",
      date: new Date().toISOString()
    },
    {
      id: "2",
      title: "Sustainable Agriculture Trends",
      description: "Growing demand for sustainably sourced agricultural products and certification requirements.",
      category: "trends",
      date: new Date().toISOString()
    },
    {
      id: "3",
      title: "Technology in Agriculture",
      description: "Latest technological innovations in farming and their impact on product quality.",
      category: "technology",
      date: new Date().toISOString()
    },
    {
      id: "4",
      title: "Market Price Trends Q1 2024",
      description: "Analysis of agricultural commodity prices and market trends for the first quarter.",
      category: "market",
      date: new Date().toISOString()
    }
  ];
};

export const useMarketUpdates = () => {
  return useQuery({
    queryKey: ['marketUpdates'],
    queryFn: fetchMarketUpdates,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};