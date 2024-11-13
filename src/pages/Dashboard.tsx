import { Card } from "@/components/ui/card";
import TaskList from "@/components/TaskList";
import AIHelper from "@/components/AIHelper";
import { Newspaper, BookOpen, Lightbulb } from "lucide-react";

const Dashboard = () => {
  const news = [
    { title: "New Sustainable Farming Methods Emerge", date: "2024-02-20" },
    { title: "Climate Change Impact on Agriculture", date: "2024-02-19" },
    { title: "Innovation in Crop Protection", date: "2024-02-18" },
  ];

  const practices = [
    "Crop Rotation for Soil Health",
    "Water Conservation Techniques",
    "Integrated Pest Management",
  ];

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-2 animate-fade-up">
        Welcome back, Farmer!
      </h1>
      <p className="text-gray-600 mb-6 animate-fade-up">Here's your daily overview</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 hover-scale">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Latest Agricultural News
          </h2>
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.title} className="border-b pb-2">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 hover-scale">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Educational Resources
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Latest Courses</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Advanced Irrigation Techniques</li>
                <li>Organic Farming Certification</li>
                <li>Soil Management Basics</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 hover-scale">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Best Farming Practices
          </h2>
          <div className="space-y-4">
            {practices.map((practice) => (
              <div key={practice} className="p-3 bg-gray-50 rounded-lg">
                {practice}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 hover-scale">
          <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
          <TaskList />
        </Card>
      </div>

      <AIHelper />
    </div>
  );
};

export default Dashboard;