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
    queryKey: ['crop-data'],
    queryFn: async () => {
      // Simulated API call - replace with real endpoint
      return {
        moisture: 70,
        temperature: 24,
        ph: 6.8,
        nitrogen: 65,
        phosphorus: 45,
        potassium: 80,
        cropType: farmDetails?.crops[0]?.name || "Not set",
        growthStage: "Flowering",
        healthScore: 85,
        lastUpdated: new Date().toISOString(),
      };
    },
    refetchInterval: 30000 // Refetch every 30 seconds
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
        <SoilAnalysis data={cropData} />
        <CropMetrics data={cropData} />
      </div>
      
      <div className="mt-8">
        <SoilHealthChart data={cropData} />
      </div>

      <div className="mt-8">
        <CropAnalysisDetails />
      </div>

      {showFarmForm && <FarmDetailsForm onClose={() => setShowFarmForm(false)} />}
    </div>
  );
};

export default Crops;