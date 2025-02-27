import WeatherCard from "@/components/WeatherCard";
import FarmingAdvice from "@/components/FarmingAdvice";

const Weather = () => {
  return (
    <div className="container mx-auto space-y-6 py-6 bg-gradient-to-b from-primary/20 to-primary/5 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-8">Weather & Farm Planning</h1>
      <WeatherCard />
      <FarmingAdvice />
    </div>
  );
};

export default Weather;