import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Dashboard = () => {
  const tasks = [
    "Water the corn field before noon",
    "Check soil moisture in wheat section",
    "Review market prices for today's harvest",
    "Confirm delivery for order #1234",
  ];

  return (
    <div className="p-6 bg-[#F5F5DC]">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-2">Welcome back, Farmer!</h1>
      <p className="text-gray-600 mb-6">Here are your tasks for today:</p>
      
      <div className="grid gap-4">
        {tasks.map((task, index) => (
          <Card key={index} className="p-4 flex items-center gap-3 bg-white/80 hover:bg-white transition-colors">
            <CheckCircle className="text-[#2F5233]" />
            <span>{task}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;