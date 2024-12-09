import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface LoanCalculatorProps {
  averageMonthlySales: number;
}

const LoanCalculator = ({ averageMonthlySales }: LoanCalculatorProps) => {
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const calculateLoan = () => {
    const amount = parseFloat(loanAmount);
    const months = parseFloat(loanTerm);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate

    if (!amount || !months || !rate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Monthly payment calculation using PMT formula
    const monthlyPayment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    // Compare with average monthly sales
    const paymentToSalesRatio = (monthlyPayment / averageMonthlySales) * 100;

    toast({
      title: "Loan Calculation Results",
      description: `Monthly Payment: KSh ${monthlyPayment.toFixed(2)}
        Total Interest: KSh ${totalInterest.toFixed(2)}
        Payment to Sales Ratio: ${paymentToSalesRatio.toFixed(1)}%`,
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Loan Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount (KSh)</label>
          <Input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (months)</label>
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="Enter loan term"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Interest Rate (%)</label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter interest rate"
          />
        </div>
        <Button onClick={calculateLoan} className="w-full">Calculate Loan</Button>
      </div>
    </Card>
  );
};

export default LoanCalculator;