import { Leaf, Sprout, Wheat, Cloud, Droplets } from "lucide-react";
import FarmingAdviceCard from "./FarmingAdviceCard";
import { useFarmStore } from "@/stores/farmStore";

const FarmingAdvice = () => {
  const farmDetails = useFarmStore((state) => state.farmDetails);

  const generateShortTermAdvice = () => {
    if (!farmDetails) return [];

    const advice = [];

    // Check soil type and current crops
    farmDetails.crops.forEach(crop => {
      const plantDate = new Date(crop.plantingDate);
      const harvestDate = new Date(crop.expectedHarvest);
      const today = new Date();
      const daysSincePlanting = Math.floor((today.getTime() - plantDate.getTime()) / (1000 * 60 * 60 * 24));

      // Early growth stage advice
      if (daysSincePlanting < 30) {
        advice.push({
          title: `${crop.name} Care`,
          advice: `Monitor ${crop.name} seedling emergence. Maintain soil moisture for optimal growth.`,
          icon: Sprout,
        });
      }
      
      // Mid-growth stage advice
      else if (daysSincePlanting < 60) {
        advice.push({
          title: "Nutrient Management",
          advice: `Consider applying fertilizer to support ${crop.name} development.`,
          icon: Leaf,
        });
      }
      
      // Pre-harvest advice
      else {
        advice.push({
          title: "Harvest Preparation",
          advice: `Begin harvest preparation for ${crop.name}. Expected harvest in ${Math.ceil((harvestDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days.`,
          icon: Wheat,
        });
      }
    });

    // Soil-based advice
    if (farmDetails.soil.type === "clay") {
      advice.push({
        title: "Soil Management",
        advice: "Clay soil detected. Monitor drainage to prevent waterlogging.",
        icon: Droplets,
      });
    }

    // Weather-based advice (simulated - you can integrate with actual weather data)
    advice.push({
      title: "Weather Alert",
      advice: "Light rainfall expected. Plan irrigation accordingly.",
      icon: Cloud,
    });

    return advice.slice(0, 3); // Return only top 3 most relevant advice
  };

  const generateLongTermAdvice = () => {
    if (!farmDetails) return [];

    const advice = [];

    // Crop rotation planning
    advice.push({
      title: "Crop Rotation",
      advice: `Plan next season's rotation based on current ${farmDetails.crops.map(c => c.name).join(", ")} cultivation.`,
      icon: Wheat,
    });

    // Soil improvement strategy
    advice.push({
      title: "Soil Health",
      advice: `Consider ${farmDetails.soil.organicMatter < "2" ? "increasing organic matter content" : "maintaining current soil health practices"}.`,
      icon: Sprout,
    });

    // Infrastructure planning
    if (farmDetails.soil.irrigationSource === "rain") {
      advice.push({
        title: "Infrastructure",
        advice: "Consider installing irrigation system for better water management.",
        icon: Droplets,
      });
    } else {
      advice.push({
        title: "Resource Planning",
        advice: "Evaluate current irrigation system efficiency for next season.",
        icon: Droplets,
      });
    }

    return advice;
  };

  if (!farmDetails) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Please add your farm details to receive personalized farming advice.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <FarmingAdviceCard 
        title="Short-term Farming Advice" 
        items={generateShortTermAdvice()} 
      />
      <FarmingAdviceCard 
        title="Long-term Farming Strategy" 
        items={generateLongTermAdvice()} 
      />
    </div>
  );
};

export default FarmingAdvice;