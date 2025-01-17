import { Cloud, Sun, Moon, Wind, Droplets, MapPin } from "lucide-react";
import { format, addDays } from "date-fns";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const WeatherCard = () => {
  const currentDate = new Date();
  const location = "Nairobi, Kenya";
  const currentTemp = 24;
  const condition = "Clear";
  const feelsLike = 22;
  const highTemp = 28;
  const lowTemp = 18;

  // Generate weekly data for the temperature graph
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentDate, i);
    return {
      day: format(date, 'EEE'),
      temp: Math.floor(20 + Math.random() * 8),
      icon: ["Sun", "Cloud", "Moon"][Math.floor(Math.random() * 3)],
      high: Math.floor(24 + Math.random() * 6),
      low: Math.floor(16 + Math.random() * 4),
    };
  });

  // Generate chart data
  const chartData = weeklyData.map(day => ({
    name: day.day,
    temperature: day.temp,
  }));

  return (
    <Card className="w-full bg-primary/95 text-cream p-6 rounded-xl">
      <div className="space-y-8">
        {/* Current Weather Section */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-6xl font-light mb-2 text-cream">{currentTemp}°</div>
            <div className="flex items-center gap-2 text-cream/80">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="mt-1 text-cream/80">{condition}</div>
            <div className="text-sm text-cream/70 mt-1">
              Feels like {feelsLike}°
            </div>
          </div>
          <div className="text-right">
            <Moon className="h-16 w-16 text-cream mb-2" />
            <div className="text-sm text-cream/80">
              H: {highTemp}° L: {lowTemp}°
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="space-y-4">
          <div className="text-sm text-cream/70">
            Weekly forecast shows stable temperatures with occasional cloud cover.
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {weeklyData.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2"
              >
                <span className="text-sm font-medium text-cream">{day.day}</span>
                {day.icon === "Sun" ? (
                  <Sun className="h-5 w-5 text-cream" />
                ) : day.icon === "Moon" ? (
                  <Moon className="h-5 w-5 text-cream" />
                ) : (
                  <Cloud className="h-5 w-5 text-cream/80" />
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-cream">{day.high}°</span>
                  <span className="text-xs text-cream/70">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>

          {/* Temperature Chart */}
          <div className="h-32 mt-6">
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

        {/* Trending Section */}
        <div className="space-y-2">
          <h3 className="text-cream/70">Trending Now</h3>
          <div className="bg-secondary/80 rounded-lg p-4">
            <p className="text-sm text-cream">Weather Alert: Clear skies expected throughout the week</p>
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