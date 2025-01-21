import { useQuery } from "@tanstack/react-query";

interface MarketPrice {
  crop: string;
  price: number;
  trend: "up" | "down";
  lastUpdated: string;
}

export const useMarketPrices = () => {
  return useQuery({
    queryKey: ['marketPrices'],
    queryFn: async (): Promise<MarketPrice[]> => {
      try {
        // Simulated API call since we don't have actual API access
        // In production, replace this with actual API call
        const mockData: MarketPrice[] = [
          { 
            crop: "Wheat", 
            price: 320, 
            trend: "up",
            lastUpdated: new Date().toISOString()
          },
          { 
            crop: "Rice", 
            price: 450, 
            trend: "down",
            lastUpdated: new Date().toISOString()
          },
          { 
            crop: "Corn", 
            price: 280, 
            trend: "up",
            lastUpdated: new Date().toISOString()
          },
          { 
            crop: "Soybeans", 
            price: 520, 
            trend: "up",
            lastUpdated: new Date().toISOString()
          }
        ];

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockData;
      } catch (error) {
        console.error('Error fetching market prices:', error);
        throw new Error('Failed to fetch market prices');
      }
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};