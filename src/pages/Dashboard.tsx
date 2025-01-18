import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeatherCard from "@/components/WeatherCard";
import CropAnalysisDetails from "@/components/CropAnalysisDetails";
import TaskList from "@/components/TaskList";
import FarmingAdvice from "@/components/FarmingAdvice";
import CommunityForum from "@/components/CommunityForum";
import MarketPrices from "@/components/MarketPrices";
import { Book, Newspaper } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Top Priority Section - Critical Farm Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CropAnalysisDetails />
        <WeatherCard />
      </div>

      {/* Second Priority - Active Tasks and Market Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Today's Tasks</h2>
          <TaskList />
        </div>
        <MarketPrices />
      </div>

      {/* Third Priority - Recommendations and Education */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Farming Insights</h2>
        <Tabs defaultValue="advice" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="advice">Recommendations</TabsTrigger>
            <TabsTrigger value="education">Educational Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="advice">
            <FarmingAdvice />
          </TabsContent>
          <TabsContent value="education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Book className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Learning Resources</h3>
                </div>
                <ul className="space-y-2">
                  <li className="p-2 bg-background/50 rounded-lg">
                    Sustainable Farming Techniques
                  </li>
                  <li className="p-2 bg-background/50 rounded-lg">
                    Crop Disease Management
                  </li>
                  <li className="p-2 bg-background/50 rounded-lg">
                    Water Conservation Methods
                  </li>
                </ul>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Newspaper className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Latest News</h3>
                </div>
                <ul className="space-y-2">
                  <li className="p-2 bg-background/50 rounded-lg">
                    New Farming Policies Announced
                  </li>
                  <li className="p-2 bg-background/50 rounded-lg">
                    Agricultural Technology Updates
                  </li>
                  <li className="p-2 bg-background/50 rounded-lg">
                    Market Trend Analysis
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fourth Priority - Community Engagement */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Community Insights</h2>
        <CommunityForum />
      </div>
    </div>
  );
};

export default Dashboard;