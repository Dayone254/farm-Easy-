import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeatherCard from "@/components/WeatherCard";
import { Leaf, Sprout, Wheat } from "lucide-react";

const Weather = () => {
  const shortTermAdvice = [
    {
      title: "Today's Priority",
      advice: "Light rainfall expected - ideal time for fertilizer application",
      icon: Sprout,
    },
    {
      title: "Pest Alert",
      advice: "High humidity may increase fungal risks - monitor crop leaves",
      icon: Leaf,
    },
    {
      title: "Resource Management",
      advice: "Reduce irrigation due to predicted rainfall",
      icon: Wheat,
    },
  ];

  const longTermAdvice = [
    {
      title: "Seasonal Planning",
      advice: "Prepare for dry season starting next month - consider drought-resistant crops",
      icon: Wheat,
    },
    {
      title: "Crop Rotation",
      advice: "Plan rotation for next season based on soil analysis",
      icon: Sprout,
    },
    {
      title: "Infrastructure",
      advice: "Set up water harvesting systems before rainy season",
      icon: Leaf,
    },
  ];

  return (
    <div className="container mx-auto space-y-6 py-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Weather & Farm Planning</h1>
      
      <WeatherCard />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Short-term Advice */}
        <Card className="glass-card hover-scale">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Short-term Farming Advice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shortTermAdvice.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-accent/10">
                  <item.icon className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.advice}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Long-term Advice */}
        <Card className="glass-card hover-scale">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Long-term Farming Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {longTermAdvice.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-accent/10">
                  <item.icon className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.advice}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;