import { useState } from "react";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/db";


const parseSafeDate = (dStr: string) => {
  const date = new Date(dStr);
  if (!isNaN(date.getTime())) return date;
  const parts = dStr.split("/");
  if (parts.length === 3) {
    const [m, d, y] = parts.map(Number);
    if (m <= 12 && d <= 31) return new Date(y, m - 1, d);
  }
  return date;
};

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

  const capSetting = useLiveQuery(() => db.table("settings").get("monthly_cap"));
  const monthlyCap = capSetting ? parseFloat(capSetting.value) : 0;


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
    const num = parseFloat(amount.replace(/\D/g, ""));
    const baselineSpent = num / rate;
    const newBal = balance - baselineSpent;

    const currentMonth = new Date().getMonth();
    const currentMonthSpent = transactions
      .filter((t) => t.type === "expense" && parseSafeDate(t.date).getMonth() === currentMonth)
      .reduce((sum: number, t: any) => sum + t.amount, 0);


    const totalProjectedSpent = currentMonthSpent + baselineSpent;
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysLeft = daysInMonth - today.getDate() + 1;

    const dailyBudgetBefore = balance > 0 ? balance / daysLeft : 0;
    const dailyBudgetAfter = newBal > 0 ? newBal / daysLeft : 0;

    // 🔴 Stage 1: NO (Exceeds Balance OR Exceeds Monthly Cap)
    if (newBal < 0 || (monthlyCap > 0 && totalProjectedSpent > monthlyCap)) {
      return {
        state: "bad",
        icon: AlertOctagon,
        text: "NO, the honey pot says hold off. Exceeds available limits!",
      };
    }

    // 🟡 Stage 2: MAYBE (Exceeds 80% of Cap OR cuts daily headroom significantly)
    const cutsDailyByHalf = dailyBudgetAfter < dailyBudgetBefore * 0.7; // 30% reduction on single item
    const nearingCap = monthlyCap > 0 && totalProjectedSpent > monthlyCap * 0.8;

    if (nearingCap || cutsDailyByHalf || runway < 3) {
      return {
        state: "warn",
        icon: AlertTriangle,
        text: "MAYBE, cutting it close on headroom. Tread carefully.",
      };
    }

    // 🟢 Stage 3: YES
    return {
      state: "safe",
      icon: CheckCircle,
      text: "YES! We are well within standard calculations to proceed.",
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
