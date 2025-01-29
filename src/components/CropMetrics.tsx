import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { useFarmStore } from "@/stores/farmStore";
import { calculateNutrients } from "@/utils/nutrientCalculations";
import NutrientBar from "./NutrientBar";
import HealthScore from "./HealthScore";

interface CropData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  healthScore: number;
}

const CropMetrics = ({ data }: { data: CropData }) => {
  const farmDetails = useFarmStore((state) => state.farmDetails);
  const nutrients = calculateNutrients(farmDetails);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Nutrient Levels</CardTitle>
        <Leaf className="w-8 h-8 text-success" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <NutrientBar 
            label="Nitrogen (N)"
            value={nutrients.nitrogen}
            color="bg-success"
          />
          <NutrientBar 
            label="Phosphorus (P)"
            value={nutrients.phosphorus}
            color="bg-warning"
          />
          <NutrientBar 
            label="Potassium (K)"
            value={nutrients.potassium}
            color="bg-accent"
          />
        </div>
        <HealthScore score={nutrients.healthScore} />
      </CardContent>
    </Card>
  );
};

export default CropMetrics;