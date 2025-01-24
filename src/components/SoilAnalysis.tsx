import { Sprout, Droplets, Thermometer, Beaker } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFarmStore } from "@/stores/farmStore";

interface SoilData {
  moisture: number;
  temperature: number;
  ph: number;
  cropType: string;
  growthStage: string;
  lastUpdated: string;
}

const SoilAnalysis = ({ data }: { data: SoilData }) => {
  const farmDetails = useFarmStore((state) => state.farmDetails);

  const calculateMoisture = () => {
    // Early return if no farm details or soil information
    if (!farmDetails?.soil) {
      console.log("Farm details or soil information is missing");
      return data.moisture;
    }
    
    try {
      const drainageFactors: Record<string, number> = {
        poor: 85,
        moderate: 65,
        well: 45
      };
      
      const soilTypeFactors: Record<string, number> = {
        clay: 80,
        loam: 60,
        sandy: 40,
        silt: 70,
        peat: 90
      };
      
      // Default to moderate drainage and loam soil if values are missing
      const drainage = ((farmDetails.soil?.drainage || "").toLowerCase() || "moderate") as keyof typeof drainageFactors;
      const soilType = ((farmDetails.soil?.type || "").toLowerCase() || "loam") as keyof typeof soilTypeFactors;
      
      const drainageFactor = drainageFactors[drainage] || 65;
      const soilTypeFactor = soilTypeFactors[soilType] || 60;
      
      return Math.round((drainageFactor + soilTypeFactor) / 2);
    } catch (error) {
      console.error("Error calculating moisture:", error);
      return data.moisture;
    }
  };

  const calculateTemperature = () => {
    return data.temperature;
  };

  const calculatePH = () => {
    if (!farmDetails?.soil?.type) {
      console.log("Soil type is missing");
      return data.ph;
    }
    
    try {
      const soilTypePH: Record<string, number> = {
        clay: 6.5,
        loam: 6.8,
        sandy: 6.0,
        silt: 6.4,
        peat: 5.5
      };
      
      // Default to loam if soil type is missing or invalid
      const soilType = ((farmDetails.soil?.type || "").toLowerCase() || "loam") as keyof typeof soilTypePH;
      return soilTypePH[soilType] || data.ph;
    } catch (error) {
      console.error("Error calculating pH:", error);
      return data.ph;
    }
  };

  const moisture = calculateMoisture();
  const temperature = calculateTemperature();
  const ph = calculatePH();

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
                style={{ width: `${moisture}%` }}
              />
            </div>
            <span className="text-sm font-medium">{moisture}%</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-warning" />
              <span className="text-sm text-gray-600">Temperature</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-warning rounded-full h-2 transition-all duration-500" 
                style={{ width: `${(temperature / 40) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{temperature}°C</span>
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
              style={{ width: `${(ph / 14) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium">{ph}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <span className="text-sm text-gray-600">Soil Type</span>
            <p className="font-medium capitalize">{farmDetails?.soil?.type || "Not specified"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Drainage</span>
            <p className="font-medium capitalize">{farmDetails?.soil?.drainage || "Not specified"}</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Last updated: {new Date().toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilAnalysis;