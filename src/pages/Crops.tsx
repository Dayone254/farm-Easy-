import SoilAnalysis from "../components/SoilAnalysis";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Crops = () => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Image uploaded",
        description: "AI analysis will begin shortly.",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-6">Soil & Crops Analysis</h1>
      
      <SoilAnalysis />
      
      <div className="glass-card rounded-lg p-6 hover-scale">
        <h3 className="text-xl font-semibold mb-6">AI Crop Analysis</h3>
        <div className="space-y-4">
          <p className="text-gray-600">Upload an image of your crop for AI-assisted analysis</p>
          <label className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#2F5233] transition-colors">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Crops;