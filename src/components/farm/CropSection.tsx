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

const cropTypes = [
  // Grains and Cereals
  "wheat", "maize", "rice", "barley", "oats", "rye", "sorghum", "millet",
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

const CropSection = ({
  crops,
  isAnalyzing,
  onAddCrop,
  onRemoveCrop,
  onUpdateCrop,
}: CropSectionProps) => {
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
                onValueChange={(value) => onUpdateCrop(index, "name", value)}
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
                onChange={(e) => onUpdateCrop(index, "area", e.target.value)}
                placeholder="Enter area"
              />
            </div>

            <div className="space-y-2">
              <Label>Planting Date</Label>
              <Input
                type="date"
                value={crop.plantingDate}
                onChange={(e) =>
                  onUpdateCrop(index, "plantingDate", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Expected Harvest</Label>
              <Input
                type="date"
                value={crop.expectedHarvest}
                onChange={(e) =>
                  onUpdateCrop(index, "expectedHarvest", e.target.value)
                }
                placeholder={isAnalyzing ? "Analyzing..." : "AI will predict"}
                readOnly
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CropSection;
