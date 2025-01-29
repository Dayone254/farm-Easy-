interface NutrientLevels {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  healthScore: number;
}

export const DEFAULT_NUTRIENTS: NutrientLevels = {
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
  healthScore: 0
};

const SOIL_TYPE_MULTIPLIERS: Record<string, number> = {
  clay: 1.2,
  loam: 1.0,
  sandy: 0.8,
  silt: 1.1,
  peat: 0.9
};

export const calculateNutrients = (farmDetails: any | null): NutrientLevels => {
  // Early return if farmDetails is null or undefined
  if (!farmDetails) {
    console.log("Farm details are null or undefined");
    return DEFAULT_NUTRIENTS;
  }

  // Early return if soil information is missing
  if (!farmDetails.soil) {
    console.log("Soil information is missing");
    return DEFAULT_NUTRIENTS;
  }

  try {
    // Safely access soil type with fallback
    const soilType = (farmDetails.soil?.type || "").toLowerCase();
    
    // Early return if no soil type
    if (!soilType) {
      console.log("No soil type specified");
      return DEFAULT_NUTRIENTS;
    }

    // Safely parse organic matter with fallback
    const organicMatter = parseFloat(farmDetails.soil?.organicMatter || "0");
    if (isNaN(organicMatter)) {
      console.log("Invalid organic matter value");
      return DEFAULT_NUTRIENTS;
    }

    // Calculate base soil quality score
    const soilQualityScore = Math.max(0, Math.min(100, organicMatter * 20));
    
    // Get soil multiplier with fallback to loam
    const soilMultiplier = SOIL_TYPE_MULTIPLIERS[soilType] || SOIL_TYPE_MULTIPLIERS.loam;

    // Calculate nutrient levels
    const nitrogen = Math.min(100, Math.max(0, Math.round(soilQualityScore * soilMultiplier * 0.8)));
    const phosphorus = Math.min(100, Math.max(0, Math.round(soilQualityScore * soilMultiplier * 0.6)));
    const potassium = Math.min(100, Math.max(0, Math.round(soilQualityScore * soilMultiplier * 0.7)));
    const healthScore = Math.round((nitrogen + phosphorus + potassium) / 3);

    console.log(`Calculated nutrients for soil type: ${soilType}, multiplier: ${soilMultiplier}`);
    
    return {
      nitrogen,
      phosphorus,
      potassium,
      healthScore
    };
  } catch (error) {
    console.error("Error calculating nutrients:", error);
    return DEFAULT_NUTRIENTS;
  }
};