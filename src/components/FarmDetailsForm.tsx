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
import type { CropDetail } from "@/stores/farmStore";

interface FarmDetailsFormProps {
  onClose: () => void;
}

const FarmDetailsForm = ({ onClose }: FarmDetailsFormProps) => {
  const { toast } = useToast();
  const setFarmDetails = useFarmStore((state) => state.setFarmDetails);
  const [crops, setCrops] = useState<CropDetail[]>([]);
  const [location, setLocation] = useState("");
  const [totalArea, setTotalArea] = useState("");

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
    setCrops(newCrops);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFarmDetails({
      location,
      totalArea,
      crops,
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
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
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
                      onChange={(e) => updateCrop(index, "plantingDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Harvest</Label>
                    <Input
                      type="date"
                      value={crop.expectedHarvest}
                      onChange={(e) => updateCrop(index, "expectedHarvest", e.target.value)}
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
