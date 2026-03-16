import { useState } from "react";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

interface UseDecideInputProps {
  balance: number;
  transactions?: any[];
  curr: any;
  t: any;
}

export function useDecideInput({
  balance,
  transactions = [],
  curr,
  t,
}: UseDecideInputProps) {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      setAmount("");
      return;
    }
    setAmount(Number(val).toLocaleString());
  };

  const expenses = transactions.filter((t) => t.type === "expense");
  const avg = expenses.reduce((sum, t) => sum + t.amount, 0) || 1;
  const runway = balance > 0 ? balance / avg : 0;

  const symbol = curr?.symbol || "$";
  const rate = curr?.rate || 1;

  const checkSafety = () => {
    if (!amount) return null;
    const num = parseFloat(amount.replace(/,/g, ""));
    const newBal = balance - num / rate; // Safety check using local amount converted back to baseline
    if (newBal < 0)
      return {
        state: "bad",
        icon: AlertOctagon,
        text: t?.decide_bad || "The honey pot says hold off on this one.",
      };
    if (runway < 3)
      return {
        state: "warn",
        icon: AlertTriangle,
        text: t?.decide_warn || "Provisions are thinning, tread carefully.",
      };
    return {
      state: "safe",
      icon: CheckCircle,
      text: t?.decide_safe || "You may proceed with this expense.",
    };
  };

  const result = checkSafety();

  const getStyle = (st: string) => {
    if (st === "bad") return "bg-rdl/10 border-rd text-rdd";
    if (st === "warn") return "bg-yl/10 border-y text-yd";
    return "bg-grl/10 border-gr text-grd";
  };

  return {
    amount,
    handleAmountChange,
    result,
    getStyle,
    symbol,
  };
}
