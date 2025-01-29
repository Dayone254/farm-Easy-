import { Battery } from "lucide-react";

interface HealthScoreProps {
  score: number;
}

const HealthScore = ({ score }: HealthScoreProps) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Battery className="w-5 h-5 text-success" />
          <span className="text-sm font-medium">Overall Health Score</span>
        </div>
        <span className="text-lg font-bold text-success">{score}%</span>
      </div>
    </div>
  );
};

export default HealthScore;