import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface LocationSectionProps {
  location: string;
  setLocation: (value: string) => void;
  totalArea: string;
  setTotalArea: (value: string) => void;
  coordinates: Coordinates;
  setCoordinates: (coords: Coordinates) => void;
  onGetLocation: () => void;
}

const LocationSection = ({
  location,
  setLocation,
  totalArea,
  setTotalArea,
  coordinates,
  setCoordinates,
  onGetLocation,
}: LocationSectionProps) => {
  return (
    <>
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
          <Label htmlFor="totalArea">Total Area (acres)</Label>
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
          <Label>Farm Coordinates</Label>
          <Button type="button" onClick={onGetLocation} variant="outline">
            Auto-detect Location
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              value={coordinates.latitude}
              onChange={(e) =>
                setCoordinates({
                  ...coordinates,
                  latitude: e.target.value,
                })
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
                setCoordinates({
                  ...coordinates,
                  longitude: e.target.value,
                })
              }
              placeholder="Enter longitude"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSection;