import { Leaf, Sprout, Wheat } from "lucide-react";
import FarmingAdviceCard from "./FarmingAdviceCard";

const shortTermAdvice = [
  {
    title: "Today's Priority",
    advice: "Light rainfall expected - ideal time for fertilizer application",
    icon: Sprout,
  },
  {
    title: "Pest Alert",
    advice: "High humidity may increase fungal risks - monitor crop leaves",
    icon: Leaf,
  },
  {
    title: "Resource Management",
    advice: "Reduce irrigation due to predicted rainfall",
    icon: Wheat,
  },
];

const longTermAdvice = [
  {
    title: "Seasonal Planning",
    advice: "Prepare for dry season starting next month - consider drought-resistant crops",
    icon: Wheat,
  },
  {
    title: "Crop Rotation",
    advice: "Plan rotation for next season based on soil analysis",
    icon: Sprout,
  },
  {
    title: "Infrastructure",
    advice: "Set up water harvesting systems before rainy season",
    icon: Leaf,
  },
];

const FarmingAdvice = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <FarmingAdviceCard title="Short-term Farming Advice" items={shortTermAdvice} />
      <FarmingAdviceCard title="Long-term Farming Strategy" items={longTermAdvice} />
    </div>
  );
};

export default FarmingAdvice;