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
    if (!farmDetails?.soil?.organicMatter || !farmDetails?.soil?.type) return data;

    const organicMatter = parseFloat(farmDetails.soil.organicMatter) || 0;
    const soilQualityScore = organicMatter * 20; // Convert to percentage

    // Different soil types have different nutrient holding capacities
    const soilTypeMultipliers: Record<string, number> = {
      clay: 1.2,
      loam: 1.0,
      sandy: 0.8,
      silt: 1.1,
      peat: 0.9
    };

    const soilType = farmDetails.soil.type.toLowerCase();
    const soilMultiplier = soilTypeMultipliers[soilType] || 1.0;

    // Calculate individual nutrient levels
    const nitrogen = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.8));
    const phosphorus = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.6));
    const potassium = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.7));
    const healthScore = Math.round((nitrogen + phosphorus + potassium) / 3);

    return {
      nitrogen,
      phosphorus,
      potassium,
      healthScore
    };
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