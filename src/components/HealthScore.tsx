import { Battery } from "lucide-react";

interface HealthScoreProps {
  score: number;
}

const HealthScore = ({ score = 0 }: HealthScoreProps) => {
  // Ensure score is a valid number
  const safeScore = isNaN(score) ? 0 : Math.max(0, Math.min(100, score));
  
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-success" />
          <span className="text-sm font-medium">Overall Health Score</span>
        </div>
        <span className="text-lg font-bold text-success">{safeScore}%</span>
      </div>
    </div>
  );
};

export default HealthScore;