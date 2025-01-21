import { useQuery } from "@tanstack/react-query";

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    condition: string;
    high: number;
    low: number;
  };
  hourly: Array<{
    time: string;
    temp: number;
    humidity: number;
    condition: string;
  }>;
  daily: Array<{
    day: string;
    temp: number;
    high: number;
    low: number;
    condition: string;
  }>;
}

const MOCK_COORDINATES = {
  lat: -1.2921,
  lon: 36.8219, // Nairobi coordinates
};

export const useWeatherData = (showHourly: boolean = false) => {
  return useQuery({
    queryKey: ['weather', showHourly],
    queryFn: async (): Promise<WeatherData> => {
      try {
        // Simulated API call - replace with actual OpenWeatherMap API call in production
        // Example API endpoint: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        
        const currentDate = new Date();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          current: {
            temp: 24,
            feels_like: 22,
            humidity: 65,
            condition: "Clear",
            high: 28,
            low: 18
          },
          hourly: Array.from({ length: 24 }, (_, i) => ({
            time: new Date(currentDate.getTime() + i * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp: Math.floor(18 + Math.random() * 10),
            humidity: Math.floor(60 + Math.random() * 20),
            condition: i >= 6 && i <= 18 ? "Clear" : "Clear Night"
          })),
          daily: Array.from({ length: 7 }, (_, i) => ({
            day: new Date(currentDate.getTime() + i * 86400000).toLocaleDateString([], { weekday: 'short' }),
            temp: Math.floor(20 + Math.random() * 8),
            high: Math.floor(24 + Math.random() * 6),
            low: Math.floor(16 + Math.random() * 4),
            condition: ["Clear", "Cloudy", "Clear Night"][Math.floor(Math.random() * 3)]
          }))
        };
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
      }
    },
    refetchInterval: 900000, // Refetch every 15 minutes
  });
};