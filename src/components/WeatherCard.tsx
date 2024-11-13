import { Cloud, Sun, Wind, Droplets } from "lucide-react";

const WeatherCard = () => {
  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Weather Forecast</h3>
        <Sun className="w-8 h-8 text-warning" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center p-3 rounded-md bg-white bg-opacity-50">
            <p className="text-sm font-medium mb-2">{day}</p>
            <Cloud className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-lg font-semibold">24°C</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Wind className="w-4 h-4" />
              <span>12km/h</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Droplets className="w-4 h-4" />
              <span>30%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;