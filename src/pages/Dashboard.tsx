import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CropAnalysisDetails from "@/components/CropAnalysisDetails";
import TaskList from "@/components/TaskList";
import FarmingAdvice from "@/components/FarmingAdvice";
import CommunityForum from "@/components/CommunityForum";
import MarketPrices from "@/components/MarketPrices";
import { Book, Newspaper } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import WeatherCard from "@/components/WeatherCard";

const Dashboard = () => {
  const { userProfile } = useUser();
  const isVendor = userProfile?.userType === 'vendor';

  if (isVendor) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        {/* Market Prices Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MarketPrices />
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Book className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Vendor Resources</h3>
            </div>
            <ul className="space-y-2">
              <li className="p-2 bg-background/50 rounded-lg">
                Market Analysis & Trends
              </li>
              <li className="p-2 bg-background/50 rounded-lg">
                Supply Chain Management Guide
              </li>
              <li className="p-2 bg-background/50 rounded-lg">
                Agricultural Product Standards
              </li>
              <li className="p-2 bg-background/50 rounded-lg">
                Storage Best Practices
              </li>
            </ul>
          </Card>
        </div>

        {/* Latest News Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Latest Industry News</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-medium">New Agricultural Trade Policies</h4>
              <p className="text-sm text-muted-foreground">
                Recent updates to agricultural trade regulations and their impact on market dynamics.
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-medium">Sustainable Agriculture Trends</h4>
              <p className="text-sm text-muted-foreground">
                Growing demand for sustainably sourced agricultural products and certification requirements.
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-medium">Technology in Agriculture</h4>
              <p className="text-sm text-muted-foreground">
                Latest technological innovations in farming and their impact on product quality.
              </p>
            </div>
          </div>
        </Card>

        {/* Community Forum Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Community Insights</h2>
          <CommunityForum />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Top Priority Section - Critical Farm Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CropAnalysisDetails />
        <WeatherCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Today's Tasks</h2>
          <TaskList />
        </div>
        <MarketPrices />
      </div>

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

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Community Insights</h2>
        <CommunityForum />
      </div>
    </div>
  );
};

export default Dashboard;