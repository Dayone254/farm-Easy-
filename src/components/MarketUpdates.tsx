import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { useMarketUpdates } from "@/utils/newsApi";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const MarketUpdates = () => {
  const { data: updates, isLoading, error } = useMarketUpdates();
  const { toast } = useToast();

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch market updates. Please try again later.",
    });
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "market":
        return "bg-blue-100 text-blue-800";
      case "trends":
        return "bg-green-100 text-green-800";
      case "technology":
        return "bg-purple-100 text-purple-800";
      case "policy":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Market Updates & News</h3>
        <span className="text-xs text-muted-foreground">
          Auto-updates every 5 minutes
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-destructive py-4">
          <AlertCircle className="w-4 h-4" />
          <span>Failed to load updates</span>
        </div>
      ) : (
        <div className="space-y-4">
          {updates?.map((update) => (
            <div
              key={update.id}
              className="p-4 bg-background/50 rounded-lg space-y-2 hover:bg-background/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{update.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(update.category)}`}>
                  {update.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {update.description}
              </p>
              <div className="text-xs text-muted-foreground">
                {format(new Date(update.date), "MMM d, yyyy 'at' h:mm a")}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default MarketUpdates;