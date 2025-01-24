import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Leaf, Droplet, Battery } from "lucide-react";
import { useFarmStore } from "@/stores/farmStore";

interface CropData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  healthScore: number;
}

const CropMetrics = ({ data }: { data: CropData }) => {
  const farmDetails = useFarmStore((state) => state.farmDetails);

  const calculateNutrients = () => {
    // Early return with default data if farmDetails is null or undefined
    if (!farmDetails?.soil) {
      console.log("Farm details or soil information is missing");
      return {
        nitrogen: data.nitrogen,
        phosphorus: data.phosphorus,
        potassium: data.potassium,
        healthScore: data.healthScore
      };
    }

    try {
      // Ensure we have valid soil data
      const organicMatter = parseFloat(farmDetails.soil.organicMatter || "0");
      const soilQualityScore = organicMatter * 20;

      const soilTypeMultipliers: Record<string, number> = {
        clay: 1.2,
        loam: 1.0,
        sandy: 0.8,
        silt: 1.1,
        peat: 0.9
      };

      // Safely access soil type with fallback to default
      const soilType = farmDetails.soil?.type?.toLowerCase() || "loam";
      const soilMultiplier = soilTypeMultipliers[soilType as keyof typeof soilTypeMultipliers] || 1.0;

      const nitrogen = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.8));
      const phosphorus = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.6));
      const potassium = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.7));
      const healthScore = Math.round((nitrogen + phosphorus + potassium) / 3);

      console.log("Calculated nutrients with soil type:", soilType, "and multiplier:", soilMultiplier);

      return {
        nitrogen,
        phosphorus,
        potassium,
        healthScore
      };
    } catch (error) {
      console.error("Error calculating nutrients:", error);
      return {
        nitrogen: data.nitrogen,
        phosphorus: data.phosphorus,
        potassium: data.potassium,
        healthScore: data.healthScore
      };
    }
  };

  const nutrients = calculateNutrients();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Nutrient Levels</CardTitle>
        <Leaf className="w-8 h-8 text-success" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nitrogen (N)</span>
              <span className="text-sm font-medium">{nutrients.nitrogen}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success rounded-full h-2 transition-all duration-500" 
                style={{ width: `${nutrients.nitrogen}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Phosphorus (P)</span>
              <span className="text-sm font-medium">{nutrients.phosphorus}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-warning rounded-full h-2 transition-all duration-500" 
                style={{ width: `${nutrients.phosphorus}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Potassium (K)</span>
              <span className="text-sm font-medium">{nutrients.potassium}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-accent rounded-full h-2 transition-all duration-500" 
                style={{ width: `${nutrients.potassium}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">Overall Health Score</span>
            </div>
            <span className="text-lg font-bold text-success">{nutrients.healthScore}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropMetrics;
