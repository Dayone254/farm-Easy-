import { Cloud, Sun, Moon, Wind, Droplets, MapPin } from "lucide-react";
import { format } from "date-fns";
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

  // Generate hourly data for the temperature graph
  const hourlyData = Array.from({ length: 12 }, (_, i) => {
    const hour = new Date(currentDate);
    hour.setHours(currentDate.getHours() + i);
    return {
      time: format(hour, 'ha'),
      temp: Math.floor(22 + Math.random() * 6),
      icon: ["Sun", "Cloud", "Moon"][Math.floor(Math.random() * 3)],
    };
  });

  // Generate chart data
  const chartData = hourlyData.map(hour => ({
    name: hour.time,
    temperature: hour.temp,
  }));

  return (
    <Card className="w-full bg-[#2B2D42] text-white p-6 rounded-xl">
      <div className="space-y-8">
        {/* Current Weather Section */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-6xl font-light mb-2">{currentTemp}°</div>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="mt-1 text-gray-300">{condition}</div>
            <div className="text-sm text-gray-400 mt-1">
              Feels like {feelsLike}°
            </div>
          </div>
          <div className="text-right">
            <Moon className="h-16 w-16 text-yellow-300 mb-2" />
            <div className="text-sm text-gray-300">
              H: {highTemp}° L: {lowTemp}°
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="space-y-4">
          <div className="text-sm text-gray-400">
            Partly cloudy. Highs in the upper 70s and lows in the low 60s.
          </div>
          
          <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
            {hourlyData.map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2"
              >
                <span className="text-sm text-gray-400">{hour.time}</span>
                {hour.icon === "Sun" ? (
                  <Sun className="h-5 w-5 text-yellow-300" />
                ) : hour.icon === "Moon" ? (
                  <Moon className="h-5 w-5 text-yellow-300" />
                ) : (
                  <Cloud className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">{hour.temp}°</span>
              </div>
            ))}
          </div>

          {/* Temperature Chart */}
          <div className="h-32 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trending Section */}
        <div className="space-y-2">
          <h3 className="text-gray-400">Trending Now</h3>
          <div className="bg-[#373952] rounded-lg p-4">
            <p className="text-sm">Weather Alert: Clear skies expected throughout the week</p>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div
                  key={dot}
                  className={`h-1 w-1 rounded-full ${
                    dot === 1 ? "bg-blue-400" : "bg-gray-600"
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