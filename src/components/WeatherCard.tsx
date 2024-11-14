import { Cloud, Sun, Wind, Droplets, MapPin, ThermometerSun, ThermometerSnowflake } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeatherCard = () => {
  const currentDate = new Date();
  const location = "Nairobi, Kenya"; // This could be made dynamic with geolocation

  const weatherData = [
    {
      date: new Date(),
      highTemp: 24,
      lowTemp: 18,
      windSpeed: 12,
      humidity: 30,
      condition: "Sunny",
      precipitation: 10,
    },
    // Generate next 6 days
    ...Array.from({ length: 6 }, (_, i) => ({
      date: new Date(currentDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000),
      highTemp: 22 + Math.floor(Math.random() * 4),
      lowTemp: 16 + Math.floor(Math.random() * 4),
      windSpeed: 10 + Math.floor(Math.random() * 5),
      humidity: 30 + Math.floor(Math.random() * 20),
      condition: ["Sunny", "Cloudy", "Partly Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
      precipitation: Math.floor(Math.random() * 30),
    })),
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Weather Forecast</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{format(currentDate, 'EEEE')}</p>
            <p className="text-sm text-muted-foreground">{format(currentDate, 'MMM d, yyyy')}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-4">
          {weatherData.map((day) => (
            <div
              key={day.date.toISOString()}
              className="flex flex-col items-center p-3 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
            >
              <p className="text-sm font-medium mb-2">{format(day.date, 'EEE')}</p>
              <p className="text-xs text-muted-foreground mb-3">{format(day.date, 'MMM d')}</p>
              
              {day.condition === "Sunny" ? (
                <Sun className="h-6 w-6 text-yellow-500 mb-2" />
              ) : day.condition === "Cloudy" ? (
                <Cloud className="h-6 w-6 text-gray-500 mb-2" />
              ) : day.condition === "Partly Cloudy" ? (
                <Cloud className="h-6 w-6 text-blue-500 mb-2" />
              ) : (
                <Droplets className="h-6 w-6 text-blue-500 mb-2" />
              )}

              <div className="flex items-center gap-1 mb-1">
                <ThermometerSun className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">{day.highTemp}°C</span>
              </div>
              
              <div className="flex items-center gap-1 mb-2">
                <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">{day.lowTemp}°C</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wind className="h-3 w-3" />
                <span>{day.windSpeed}km/h</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Droplets className="h-3 w-3" />
                <span>{day.humidity}%</span>
              </div>

              {day.precipitation > 0 && (
                <div className="text-xs text-muted-foreground mt-1">
                  {day.precipitation}% rain
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;