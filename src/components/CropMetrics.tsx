import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Leaf, Droplet, Battery } from "lucide-react";

interface CropData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  healthScore: number;
}

const CropMetrics = ({ data }: { data: CropData }) => {
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
              <span className="text-sm font-medium">{data.nitrogen}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success rounded-full h-2 transition-all duration-500" 
                style={{ width: `${data.nitrogen}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Phosphorus (P)</span>
              <span className="text-sm font-medium">{data.phosphorus}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-warning rounded-full h-2 transition-all duration-500" 
                style={{ width: `${data.phosphorus}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Potassium (K)</span>
              <span className="text-sm font-medium">{data.potassium}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-accent rounded-full h-2 transition-all duration-500" 
                style={{ width: `${data.potassium}%` }}
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
            <span className="text-lg font-bold text-success">{data.healthScore}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropMetrics;