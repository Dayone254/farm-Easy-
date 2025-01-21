import { Cloud, Sun, Moon, Droplets, MapPin, Clock, Calendar, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useWeatherData } from "@/utils/weatherApi";
import { useToast } from "@/hooks/use-toast";

interface WeatherCardProps {
  showHourly?: boolean;
}

const WeatherCard = ({ showHourly = false }: WeatherCardProps) => {
  const { data: weather, isLoading, error } = useWeatherData(showHourly);
  const { toast } = useToast();
  const location = "Nairobi, Kenya"; // This could be made dynamic based on user's location

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch weather data. Please try again later.",
    });
  }

  if (isLoading || !weather) {
    return (
      <Card className="w-full bg-primary/95 text-cream p-6 rounded-xl">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-cream" />
        </div>
      </Card>
    );
  }

  // Generate chart data based on view type
  const chartData = showHourly 
    ? weather.hourly.map(hour => ({
        name: hour.time,
        temperature: hour.temp,
      }))
    : weather.daily.map(day => ({
        name: day.day,
        temperature: day.temp,
      }));

  return (
    <Card className="w-full bg-primary/95 text-cream p-6 rounded-xl">
      <div className="space-y-6">
        {/* Current Weather Section */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-6xl font-light mb-2 text-cream">{weather.current.temp}°</div>
            <div className="flex items-center gap-2 text-cream/80">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="mt-1 text-cream/80">{weather.current.condition}</div>
            <div className="text-sm text-cream/70 mt-1">
              Feels like {weather.current.feels_like}°
            </div>
          </div>
          <div className="text-right">
            {weather.current.condition.includes("Night") ? (
              <Moon className="h-16 w-16 text-cream mb-2" />
            ) : (
              <Sun className="h-16 w-16 text-cream mb-2" />
            )}
            <div className="text-sm text-cream/80">
              H: {weather.current.high}° L: {weather.current.low}°
            </div>
          </div>
        </div>

        {/* Hourly/Daily Forecast Section */}
        {showHourly ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cream/80">
              <Clock className="h-4 w-4" />
              <h3 className="font-medium">Hourly Forecast</h3>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {weather.hourly.slice(0, 8).map((hour, index) => (
                <div
                  key={index}
                  className="bg-secondary/30 rounded-lg p-3 text-center hover:bg-secondary/40 transition-colors"
                >
                  <div className="text-sm font-medium mb-2">{hour.time}</div>
                  {hour.condition.includes("Night") ? (
                    <Moon className="h-6 w-6 mx-auto mb-2 text-cream" />
                  ) : (
                    <Sun className="h-6 w-6 mx-auto mb-2 text-cream" />
                  )}
                  <div className="text-lg font-semibold mb-1">{hour.temp}°</div>
                  <div className="flex items-center justify-center gap-1 text-xs text-cream/70">
                    <Droplets className="h-3 w-3" />
                    <span>{hour.humidity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cream/80">
              <Calendar className="h-4 w-4" />
              <h3 className="font-medium">Weekly Forecast</h3>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {weather.daily.map((day, index) => (
                <div
                  key={index}
                  className="bg-secondary/30 rounded-lg p-3 text-center hover:bg-secondary/40 transition-colors"
                >
                  <div className="text-sm font-medium mb-2">{day.day}</div>
                  {day.condition === "Cloudy" ? (
                    <Cloud className="h-6 w-6 mx-auto mb-2 text-cream" />
                  ) : day.condition.includes("Night") ? (
                    <Moon className="h-6 w-6 mx-auto mb-2 text-cream" />
                  ) : (
                    <Sun className="h-6 w-6 mx-auto mb-2 text-cream" />
                  )}
                  <div className="text-lg font-semibold mb-1">{day.temp}°</div>
                  <div className="flex flex-col items-center text-xs text-cream/70">
                    <span>H: {day.high}°</span>
                    <span>L: {day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Temperature Chart */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-cream/80">Temperature Trend</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="#F5F5DC"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  opacity={0.7}
                />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#F5F5DC"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weather Alert Section */}
        <div className="space-y-2">
          <h3 className="text-cream/70">Weather Alert</h3>
          <div className="bg-secondary/80 rounded-lg p-4">
            <p className="text-sm text-cream">
              {showHourly 
                ? "Best time for irrigation is during early morning hours"
                : "Clear skies expected throughout the week"}
            </p>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  className={`h-1 w-1 rounded-full ${
                    dot === 1 ? "bg-accent" : "bg-cream/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;