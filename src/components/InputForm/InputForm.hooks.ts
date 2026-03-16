import { useState } from "react";
import { db } from "../../data/db";

interface UseInputFormProps {
  onComplete?: () => void;
}

export function useInputForm({ onComplete }: UseInputFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      setAmount("");
      return;
    }
    setAmount(Number(val).toLocaleString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    await db.table("expenses").add({
      title: title.trim(),
      amount: parseFloat(amount.replace(/,/g, "")),
      category: type === "income" ? "Income" : category,
      date: new Date().toLocaleDateString(),
      type,
      storyNote: "Local log.",
    });

    setTitle("");
    setAmount("");
    if (onComplete) onComplete();
  };

  return {
    title,
    setTitle,
    amount,
    setAmount,
    type,
    setType,
    category,
    setCategory,
    handleAmountChange,
    handleSubmit,
  };
}
