import { Card } from "@/components/ui/card";
import LoanCalculator from "@/components/LoanCalculator";

const Financing = () => {
  // In a real app, this would come from the user's sales data
  const averageMonthlySales = 50000; // Example value

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-[#2F5233] mb-6">Financing Options</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <LoanCalculator averageMonthlySales={averageMonthlySales} />
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Available Lenders</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">KCB Bank</h4>
                <p className="text-sm text-gray-600">Agricultural loans with competitive rates starting from 13% p.a.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">Equity Bank</h4>
                <p className="text-sm text-gray-600">Specialized farmer loans with flexible repayment terms.</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold">AFC</h4>
                <p className="text-sm text-gray-600">Government-backed agricultural financing solutions.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Valid identification document</li>
              <li>Proof of farming activity</li>
              <li>6 months of sales records</li>
              <li>Bank statements</li>
              <li>Business registration (if applicable)</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Financing;