import { Sprout, Droplets } from "lucide-react";

const SoilAnalysis = () => {
  return (
    <div className="glass-card rounded-lg p-6 hover-scale">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Soil & Crop Analysis</h3>
        <Sprout className="w-8 h-8 text-success" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Crop Type</span>
          <span className="font-medium">Wheat</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Growth Stage</span>
          <span className="font-medium">Flowering</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Soil Moisture</span>
            <Droplets className="w-5 h-5 text-accent" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-accent rounded-full h-2" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;