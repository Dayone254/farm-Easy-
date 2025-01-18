import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SoilDetail } from "@/stores/farmStore";

interface SoilSectionProps {
  soil: SoilDetail;
  setSoil: (soil: SoilDetail) => void;
  isAnalyzing: boolean;
  onAnalyzeSoil: () => void;
}

const SoilSection = ({
  soil,
  setSoil,
  isAnalyzing,
  onAnalyzeSoil,
}: SoilSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Soil Information</h3>
        <Button type="button" onClick={onAnalyzeSoil} disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze Soil"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Soil Type</Label>
          <Input
            value={soil.type}
            readOnly
            placeholder="AI will analyze"
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Soil Texture</Label>
          <Input
            value={soil.texture}
            readOnly
            placeholder="AI will analyze"
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Organic Matter Content (%)</Label>
          <Input
            value={soil.organicMatter}
            readOnly
            placeholder="AI will analyze"
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Drainage</Label>
          <Input
            value={soil.drainage}
            readOnly
            placeholder="AI will analyze"
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Elevation (meters)</Label>
          <Input
            value={soil.elevation}
            readOnly
            placeholder="AI will analyze"
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label>Irrigation Source</Label>
          <Select
            value={soil.irrigationSource}
            onValueChange={(value) =>
              setSoil({
                ...soil,
                irrigationSource: value,
              })
            }
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
          onChange={(e) =>
            setSoil({
              ...soil,
              previousCrops: e.target.value,
            })
          }
          placeholder="Enter previous crops grown in this soil"
        />
      </div>
    </div>
  );
};

export default SoilSection;