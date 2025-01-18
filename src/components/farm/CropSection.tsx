import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CropDetail } from "@/stores/farmStore";

// Growing periods in days for different crops
const cropGrowingPeriods: { [key: string]: { min: number; max: number } } = {
  maize: { min: 90, max: 120 },
  wheat: { min: 110, max: 130 },
  rice: { min: 105, max: 150 },
  beans: { min: 85, max: 110 },
  potatoes: { min: 90, max: 120 },
  tomatoes: { min: 60, max: 80 },
  cabbage: { min: 70, max: 90 },
  soybeans: { min: 100, max: 140 },
  cotton: { min: 150, max: 180 },
  sugarcane: { min: 270, max: 365 },
  // ... Add more crops with their growing periods
};

const cropTypes = [
  // Grains and Cereals
  "maize", "wheat", "rice", "barley", "oats", "rye", "sorghum", "millet",
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

interface CropSectionProps {
  crops: CropDetail[];
  isAnalyzing: boolean;
  onAddCrop: () => void;
  onRemoveCrop: (index: number) => void;
  onUpdateCrop: (index: number, field: keyof CropDetail, value: string) => void;
}

const calculateHarvestDate = (plantingDate: string, cropType: string): string => {
  if (!plantingDate || !cropType) return '';
  
  const growingPeriod = cropGrowingPeriods[cropType];
  if (!growingPeriod) return '';

  // Calculate average growing period
  const avgDays = Math.floor((growingPeriod.min + growingPeriod.max) / 2);
  
  const plantDate = new Date(plantingDate);
  const harvestDate = new Date(plantDate);
  harvestDate.setDate(harvestDate.getDate() + avgDays);
  
  return harvestDate.toISOString().split('T')[0];
};

const CropSection = ({
  crops,
  isAnalyzing,
  onAddCrop,
  onRemoveCrop,
  onUpdateCrop,
}: CropSectionProps) => {
  const handleCropUpdate = (index: number, field: keyof CropDetail, value: string) => {
    onUpdateCrop(index, field, value);
    
    // If planting date or crop type changes, update harvest date
    if (field === "plantingDate" || field === "name") {
      const crop = crops[index];
      const harvestDate = calculateHarvestDate(
        field === "plantingDate" ? value : crop.plantingDate,
        field === "name" ? value : crop.name
      );
      if (harvestDate) {
        onUpdateCrop(index, "expectedHarvest", harvestDate);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Crops</h3>
        <Button type="button" onClick={onAddCrop} variant="outline">
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
              onClick={() => onRemoveCrop(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Crop Type</Label>
              <Select
                value={crop.name}
                onValueChange={(value) => handleCropUpdate(index, "name", value)}
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
              <Label>Area (acres)</Label>
              <Input
                type="number"
                value={crop.area}
                onChange={(e) => handleCropUpdate(index, "area", e.target.value)}
                placeholder="Enter area"
              />
            </div>

            <div className="space-y-2">
              <Label>Planting Date</Label>
              <Input
                type="date"
                value={crop.plantingDate}
                onChange={(e) => handleCropUpdate(index, "plantingDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Harvest</Label>
              <Input
                type="date"
                value={crop.expectedHarvest}
                readOnly
                className="bg-gray-50"
                placeholder={isAnalyzing ? "Analyzing..." : "Auto-calculated"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CropSection;
