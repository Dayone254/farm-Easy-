import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFarmStore } from "@/stores/farmStore";
import type { CropDetail, SoilDetail } from "@/stores/farmStore";
import { Textarea } from "@/components/ui/textarea";

interface FarmDetailsFormProps {
  onClose: () => void;
}

const cropTypes = [
  // Grains and Cereals
  "wheat", "corn", "rice", "barley", "oats", "rye", "sorghum", "millet",
  // Legumes
  "soybeans", "peanuts", "beans", "lentils", "chickpeas", "peas",
  // Vegetables
  "tomatoes", "potatoes", "carrots", "onions", "cabbage", "lettuce", "spinach", 
  "peppers", "cucumbers", "eggplant", "broccoli", "cauliflower",
  // Fruits
  "apples", "oranges", "bananas", "grapes", "strawberries", "blueberries",
  "watermelon", "mango", "pineapple",
  // Cash Crops
  "cotton", "sugarcane", "coffee", "tea", "tobacco", "rubber",
  // Oil Crops
  "sunflower", "rapeseed", "palm oil", "coconut",
  // Fiber Crops
  "flax", "hemp", "jute",
  // Root Crops
  "cassava", "sweet potato", "yam", "taro",
  // Spices
  "ginger", "turmeric", "cardamom", "pepper",
  // Other
  "bamboo", "mushrooms", "flowers"
];

const FarmDetailsForm = ({ onClose }: FarmDetailsFormProps) => {
  const { toast } = useToast();
  const setFarmDetails = useFarmStore((state) => state.setFarmDetails);
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
    
    // If planting date is set, simulate AI analysis for harvest date
    if (field === "plantingDate" && value) {
      setIsAnalyzing(true);
      // Simulate AI analysis delay
      setTimeout(() => {
        const plantDate = new Date(value);
        // Add random growing period between 60-120 days
        const harvestDate = new Date(plantDate.setDate(plantDate.getDate() + Math.floor(Math.random() * 60) + 60));
        newCrops[index].expectedHarvest = harvestDate.toISOString().split('T')[0];
        setCrops(newCrops);
        setIsAnalyzing(false);
      }, 1500);
    }
    
    setCrops(newCrops);
  };

  const analyzeSoil = () => {
    if (!coordinates.latitude || !coordinates.longitude) {
      toast({
        title: "Location Required",
        description: "Please enter farm coordinates for soil analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate AI soil analysis
    setTimeout(() => {
      const soilTypes = ["clay", "sandy", "loam", "silt", "peat"];
      const textures = ["fine", "medium", "coarse"];
      const drainageTypes = ["well", "moderate", "poor"];
      
      setSoil({
        type: soilTypes[Math.floor(Math.random() * soilTypes.length)],
        texture: textures[Math.floor(Math.random() * textures.length)],
        organicMatter: (Math.random() * 5 + 1).toFixed(1),
        drainage: drainageTypes[Math.floor(Math.random() * drainageTypes.length)],
        elevation: Math.floor(Math.random() * 1000 + 100).toString(),
        previousCrops: soil.previousCrops,
        irrigationSource: soil.irrigationSource,
      });

      setIsAnalyzing(false);
      toast({
        title: "Soil Analysis Complete",
        description: "AI has analyzed your soil characteristics based on location data.",
      });
    }, 2000);
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Farm Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter farm location"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalArea">Total Area (hectares)</Label>
              <Input
                id="totalArea"
                type="number"
                value={totalArea}
                onChange={(e) => setTotalArea(e.target.value)}
                placeholder="Enter total area"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                value={coordinates.latitude}
                onChange={(e) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    latitude: e.target.value,
                  }))
                }
                placeholder="Enter latitude"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                value={coordinates.longitude}
                onChange={(e) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    longitude: e.target.value,
                  }))
                }
                placeholder="Enter longitude"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Soil Information</h3>
              <Button 
                type="button" 
                onClick={analyzeSoil}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Soil"}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Soil Type</Label>
                <Select
                  value={soil.type}
                  onValueChange={(value) => setSoil((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="loam">Loam</SelectItem>
                    <SelectItem value="silt">Silt</SelectItem>
                    <SelectItem value="peat">Peat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Soil Texture</Label>
                <Select
                  value={soil.texture}
                  onValueChange={(value) => setSoil((prev) => ({ ...prev, texture: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil texture" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fine">Fine</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="coarse">Coarse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Organic Matter Content (%)</Label>
                <Input
                  type="number"
                  value={soil.organicMatter}
                  onChange={(e) => setSoil((prev) => ({ ...prev, organicMatter: e.target.value }))}
                  placeholder="Enter organic matter content"
                />
              </div>

              <div className="space-y-2">
                <Label>Drainage</Label>
                <Select
                  value={soil.drainage}
                  onValueChange={(value) => setSoil((prev) => ({ ...prev, drainage: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select drainage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="well">Well-drained</SelectItem>
                    <SelectItem value="moderate">Moderately-drained</SelectItem>
                    <SelectItem value="poor">Poorly-drained</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Elevation (meters)</Label>
                <Input
                  type="number"
                  value={soil.elevation}
                  onChange={(e) => setSoil((prev) => ({ ...prev, elevation: e.target.value }))}
                  placeholder="Enter elevation"
                />
              </div>

              <div className="space-y-2">
                <Label>Irrigation Source</Label>
                <Select
                  value={soil.irrigationSource}
                  onValueChange={(value) => setSoil((prev) => ({ ...prev, irrigationSource: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select irrigation source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rain">Rainfed</SelectItem>
                    <SelectItem value="well">Well</SelectItem>
                    <SelectItem value="canal">Canal</SelectItem>
                    <SelectItem value="river">River</SelectItem>
                    <SelectItem value="pond">Pond</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Previous Crops</Label>
              <Textarea
                value={soil.previousCrops}
                onChange={(e) => setSoil((prev) => ({ ...prev, previousCrops: e.target.value }))}
                placeholder="Enter previous crops grown in this soil"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Crops</h3>
              <Button type="button" onClick={addCrop} variant="outline">
                Add Crop
              </Button>
            </div>

            {crops.map((crop, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Crop {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCrop(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Crop Type</Label>
                    <Select
                      value={crop.name}
                      onValueChange={(value) => updateCrop(index, "name", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Area (hectares)</Label>
                    <Input
                      type="number"
                      value={crop.area}
                      onChange={(e) => updateCrop(index, "area", e.target.value)}
                      placeholder="Enter area"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Planting Date</Label>
                    <Input
                      type="date"
                      value={crop.plantingDate}
                      onChange={(e) =>
                        updateCrop(index, "plantingDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Harvest</Label>
                    <Input
                      type="date"
                      value={crop.expectedHarvest}
                      onChange={(e) =>
                        updateCrop(index, "expectedHarvest", e.target.value)
                      }
                      placeholder={isAnalyzing ? "Analyzing..." : "AI will predict"}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
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
