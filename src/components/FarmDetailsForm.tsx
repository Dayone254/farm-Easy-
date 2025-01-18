import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFarmStore } from "@/stores/farmStore";
import type { CropDetail, SoilDetail } from "@/stores/farmStore";
import LocationSection from "./farm/LocationSection";
import SoilSection from "./farm/SoilSection";
import CropSection from "./farm/CropSection";

interface FarmDetailsFormProps {
  onClose: () => void;
}

const FarmDetailsForm = ({ onClose }: FarmDetailsFormProps) => {
  const { toast } = useToast();
  const { setFarmDetails, clearFarmDetails } = useFarmStore((state) => ({
    setFarmDetails: state.setFarmDetails,
    clearFarmDetails: state.clearFarmDetails,
  }));
  
  const [crops, setCrops] = useState<CropDetail[]>([]);
  const [location, setLocation] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" });
  const [soil, setSoil] = useState<SoilDetail>({
    type: "",
    texture: "",
    organicMatter: "",
    drainage: "",
    elevation: "",
    previousCrops: "",
    irrigationSource: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
          toast({
            title: "Location Retrieved",
            description: "Your coordinates have been automatically filled.",
          });
          // Trigger soil analysis after getting coordinates
          analyzeSoil(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter coordinates manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
    }
  };

  const analyzeSoil = async (lat?: number, long?: number) => {
    const latitude = lat || parseFloat(coordinates.latitude);
    const longitude = long || parseFloat(coordinates.longitude);

    if (!latitude || !longitude) {
      toast({
        title: "Location Required",
        description: "Please enter farm coordinates or use auto-detect for soil analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call to get elevation data
      const elevationResponse = await new Promise(resolve => 
        setTimeout(() => resolve(Math.floor(Math.random() * 1000 + 100)), 1000)
      );

      // Simulate soil analysis based on location
      const soilTypes = ["clay", "sandy", "loam", "silt", "peat"];
      const textures = ["fine", "medium", "coarse"];
      const drainageTypes = ["well", "moderate", "poor"];
      
      setSoil(prev => ({
        ...prev,
        type: soilTypes[Math.floor(Math.random() * soilTypes.length)],
        texture: textures[Math.floor(Math.random() * textures.length)],
        organicMatter: (Math.random() * 5 + 1).toFixed(1),
        drainage: drainageTypes[Math.floor(Math.random() * drainageTypes.length)],
        elevation: elevationResponse.toString(),
      }));

      toast({
        title: "Soil Analysis Complete",
        description: "AI has analyzed your soil characteristics based on location data.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze soil data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addCrop = () => {
    setCrops([
      ...crops,
      {
        name: "",
        area: "",
        plantingDate: "",
        expectedHarvest: "",
        status: "Healthy",
      },
    ]);
  };

  const removeCrop = (index: number) => {
    setCrops(crops.filter((_, i) => i !== index));
  };

  const updateCrop = (index: number, field: keyof CropDetail, value: string) => {
    const newCrops = [...crops];
    newCrops[index] = { ...newCrops[index], [field]: value };
    
    if (field === "plantingDate" && value) {
      setIsAnalyzing(true);
      setTimeout(() => {
        const plantDate = new Date(value);
        const harvestDate = new Date(plantDate.setDate(plantDate.getDate() + Math.floor(Math.random() * 60) + 60));
        newCrops[index].expectedHarvest = harvestDate.toISOString().split('T')[0];
        setCrops(newCrops);
        setIsAnalyzing(false);
      }, 1500);
    }
    
    setCrops(newCrops);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFarmDetails({
      location,
      totalArea,
      coordinates,
      crops,
      soil,
    });
    toast({
      title: "Success",
      description: "Farm details have been saved successfully.",
    });
    onClose();
  };

  const handleClear = () => {
    clearFarmDetails();
    toast({
      title: "Farm Details Cleared",
      description: "All farm details have been removed from storage.",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-background rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Farm Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <LocationSection
            location={location}
            setLocation={setLocation}
            totalArea={totalArea}
            setTotalArea={setTotalArea}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            onGetLocation={getUserLocation}
          />

          <SoilSection
            soil={soil}
            setSoil={setSoil}
            isAnalyzing={isAnalyzing}
            onAnalyzeSoil={() => analyzeSoil()}
          />

          <CropSection
            crops={crops}
            isAnalyzing={isAnalyzing}
            onAddCrop={addCrop}
            onRemoveCrop={removeCrop}
            onUpdateCrop={updateCrop}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="destructive" onClick={handleClear}>
              Clear Data
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Farm Details</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmDetailsForm;