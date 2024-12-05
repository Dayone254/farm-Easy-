import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AdviceItem {
  title: string;
  advice: string;
  icon: LucideIcon;
}

interface FarmingAdviceCardProps {
  title: string;
  items: AdviceItem[];
}

const FarmingAdviceCard = ({ title, items }: FarmingAdviceCardProps) => {
  return (
    <Card className="glass-card hover-scale">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-accent/10">
              <item.icon className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.advice}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmingAdviceCard;