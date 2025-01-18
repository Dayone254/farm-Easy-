import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Ruler, Map, Wheat, AlertCircle } from "lucide-react";
import { useFarmStore } from "@/stores/farmStore";

const CropAnalysisDetails = () => {
  const farmDetails = useFarmStore((state) => state.farmDetails);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "text-green-500";
      case "Needs Attention":
        return "text-yellow-500";
      case "Critical":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (!farmDetails) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No farm details available. Please add your farm details first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Farm Overview</CardTitle>
          <Map className="w-8 h-8 text-primary" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-600">Total Area</span>
              </div>
              <p className="font-medium">{farmDetails.totalArea} acres</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-primary" />
                <span className="text-sm text-gray-600">Location</span>
              </div>
              <p className="font-medium">{farmDetails.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Planted Crops</CardTitle>
          <Wheat className="w-8 h-8 text-success" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {farmDetails.crops.map((crop, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{crop.name}</h4>
                    <p className="text-sm text-gray-600">{crop.area} hectares</p>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(crop.status)}`}>
                    {crop.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Planted:</span>{" "}
                    {new Date(crop.plantingDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-gray-600">Expected Harvest:</span>{" "}
                    {new Date(crop.expectedHarvest).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Recommended Actions</CardTitle>
          <AlertCircle className="w-8 h-8 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {farmDetails.crops.map((crop, index) => (
              <div key={index} className="flex items-start gap-4 border-b last:border-0 pb-4 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor("Medium")}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">Monitor {crop.name} growth progress</p>
                    <span className={`text-sm font-medium ${getPriorityColor("Medium")}`}>
                      Medium Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Due by: {new Date(crop.expectedHarvest).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropAnalysisDetails;