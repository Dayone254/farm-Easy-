import { Sprout, Droplets, Thermometer, Beaker } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SoilData {
  moisture: number;
  temperature: number;
  ph: number;
  cropType: string;
  growthStage: string;
  lastUpdated: string;
}

const SoilAnalysis = ({ data }: { data: SoilData }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Soil Analysis</CardTitle>
        <Sprout className="w-8 h-8 text-success" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-accent" />
              <span className="text-sm text-gray-600">Soil Moisture</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-accent rounded-full h-2 transition-all duration-500" 
                style={{ width: `${data.moisture}%` }}
              />
            </div>
            <span className="text-sm font-medium">{data.moisture}%</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-warning" />
              <span className="text-sm text-gray-600">Temperature</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-warning rounded-full h-2 transition-all duration-500" 
                style={{ width: `${(data.temperature / 40) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{data.temperature}°C</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Beaker className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-600">pH Level</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500" 
              style={{ width: `${(data.ph / 14) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{data.ph}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <span className="text-sm text-gray-600">Crop Type</span>
            <p className="font-medium">{data.cropType}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Growth Stage</span>
            <p className="font-medium">{data.growthStage}</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilAnalysis;