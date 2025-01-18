import { useQuery } from "@tanstack/react-query";
import SoilAnalysis from "../components/SoilAnalysis";
import CropMetrics from "../components/CropMetrics";
import SoilHealthChart from "../components/SoilHealthChart";
import CropAnalysisDetails from "../components/CropAnalysisDetails";
import { Button } from "@/components/ui/button";
import { Upload, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import FarmDetailsForm from "../components/FarmDetailsForm";
import { useFarmStore } from "@/stores/farmStore";

const Crops = () => {
  const { toast } = useToast();
  const [showFarmForm, setShowFarmForm] = useState(false);
  const farmDetails = useFarmStore((state) => state.farmDetails);

  const { data: cropData, isLoading } = useQuery({
    queryKey: ['crop-data', farmDetails?.soil],
    queryFn: async () => {
      // Return default values if no farm details exist
      if (!farmDetails?.soil) {
        return {
          moisture: 0,
          temperature: 0,
          ph: 0,
          nitrogen: 0,
          phosphorus: 0,
          potassium: 0,
          cropType: "Not set",
          growthStage: "Not set",
          healthScore: 0,
          lastUpdated: new Date().toISOString(),
        };
      }

      // Calculate nutrient levels based on soil type and organic matter
      const organicMatter = parseFloat(farmDetails.soil.organicMatter) || 0;
      const soilQualityScore = organicMatter * 20; // Convert to percentage

      // Different soil types have different nutrient holding capacities
      const soilTypeMultipliers: { [key: string]: number } = {
        clay: 1.2,
        loam: 1.0,
        sandy: 0.8,
        silt: 1.1,
        peat: 0.9
      };

      const soilMultiplier = farmDetails.soil.type ? 
        soilTypeMultipliers[farmDetails.soil.type.toLowerCase()] || 1.0 : 
        1.0;

      // Calculate individual nutrient levels
      const nitrogen = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.8));
      const phosphorus = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.6));
      const potassium = Math.min(100, Math.round(soilQualityScore * soilMultiplier * 0.7));

      // Calculate moisture based on drainage type
      const drainageToMoisture: { [key: string]: number } = {
        poor: 85,
        moderate: 65,
        well: 45
      };

      const moisture = farmDetails.soil.drainage ? 
        drainageToMoisture[farmDetails.soil.drainage.toLowerCase()] || 60 : 
        60;

      return {
        moisture,
        temperature: 24,
        ph: 6.8,
        nitrogen,
        phosphorus,
        potassium,
        cropType: farmDetails.crops[0]?.name || "Not set",
        growthStage: "Active Growth",
        healthScore: Math.round((nitrogen + phosphorus + potassium) / 3),
        lastUpdated: new Date().toISOString(),
      };
    },
    enabled: true, // Always enable the query, we'll handle the null case inside
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Image uploaded:", file.name);
      toast({
        title: "Image uploaded",
        description: "AI analysis will begin shortly.",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Soil & Crops Analysis</h1>
        <Button onClick={() => setShowFarmForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {farmDetails ? 'Update Farm Details' : 'Add Farm Details'}
        </Button>
      </div>

      {!farmDetails && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          Please add your farm details to see soil and crop analysis.
        </div>
      )}

      <div className="glass-card rounded-lg p-6 hover-scale mb-8">
        <h3 className="text-xl font-semibold mb-6">AI Crop Analysis</h3>
        <div className="space-y-4">
          <p className="text-gray-600">Upload an image of your crop for AI-assisted analysis</p>
          <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cropData && <SoilAnalysis data={cropData} />}
        {cropData && <CropMetrics data={cropData} />}
      </div>
      
      <div className="mt-8">
        {cropData && <SoilHealthChart data={cropData} />}
      </div>

      <div className="mt-8">
        <CropAnalysisDetails />
      </div>

      {showFarmForm && <FarmDetailsForm onClose={() => setShowFarmForm(false)} />}
    </div>
  );
};

export default Crops;