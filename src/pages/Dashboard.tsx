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
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-2 animate-fade-up">Welcome back, Farmer!</h1>
      <p className="text-gray-600 mb-6 animate-fade-up">Here are your tasks for today:</p>
      
      <div className="grid gap-4 animate-fade-in">
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