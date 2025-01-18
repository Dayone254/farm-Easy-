import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface FinancialSummaryProps {
  totalSpent: number;
  totalEarned: number;
}

const FinancialSummary = ({ totalSpent, totalEarned }: FinancialSummaryProps) => {
  const netBalance = totalEarned - totalSpent;

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 bg-red-100 rounded-full">
          <TrendingDown className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-xl font-bold">KSh {totalSpent.toLocaleString()}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 bg-green-100 rounded-full">
          <TrendingUp className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Earned</p>
          <p className="text-xl font-bold">KSh {totalEarned.toLocaleString()}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className={`p-3 ${netBalance >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-full`}>
          <DollarSign className={`h-6 w-6 ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Net Balance</p>
          <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            KSh {Math.abs(netBalance).toLocaleString()}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default FinancialSummary;