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

const SOIL_TYPE_MULTIPLIERS = {
  clay: 1.2,
  loam: 1.0,
  sandy: 0.8,
  silt: 1.1,
  peat: 0.9
} as const;

export const calculateNutrients = (farmDetails: any): NutrientLevels => {
  if (!farmDetails?.soil) {
    console.log("No farm details or soil information available");
    return DEFAULT_NUTRIENTS;
  }

  try {
    const soilType = farmDetails.soil?.type?.toLowerCase() || '';
    if (!soilType) {
      console.log("No soil type specified");
      return DEFAULT_NUTRIENTS;
    }

    const organicMatter = parseFloat(farmDetails.soil?.organicMatter || "0");
    if (isNaN(organicMatter)) {
      console.log("Invalid organic matter value");
      return DEFAULT_NUTRIENTS;
    }

    const soilQualityScore = Math.max(0, Math.min(100, organicMatter * 20));
    const soilMultiplier = soilType in SOIL_TYPE_MULTIPLIERS 
      ? SOIL_TYPE_MULTIPLIERS[soilType as keyof typeof SOIL_TYPE_MULTIPLIERS]
      : SOIL_TYPE_MULTIPLIERS.loam;

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