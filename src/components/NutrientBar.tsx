interface NutrientBarProps {
  label: string;
  value: number;
  color: string;
}

const NutrientBar = ({ label, value = 0, color }: NutrientBarProps) => {
  // Ensure value is a valid number
  const safeValue = isNaN(value) ? 0 : Math.max(0, Math.min(100, value));
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium">{safeValue}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} rounded-full h-2 transition-all duration-500`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
};

export default NutrientBar;