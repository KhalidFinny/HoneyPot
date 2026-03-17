import { useState } from "react";
import { db } from "../../data/db";

interface UseInputFormProps {
  onComplete?: () => void;
  editingItem?: any;
  curr?: any;
}



export function useInputForm({ onComplete, editingItem, curr }: UseInputFormProps) {
  const [title, setTitle] = useState(editingItem?.title || "");
  const [amount, setAmount] = useState(editingItem?.amount ? (editingItem.amount * (curr?.rate || 1)).toLocaleString(undefined, { maximumFractionDigits: curr?.decimals ?? 0 }) : "");
  const [type, setType] = useState(editingItem?.type || "expense");
  const [category, setCategory] = useState(editingItem?.category || "Food");


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

    const payload: any = {
      title: title.trim(),
      amount: parseFloat(amount.replace(/\D/g, "")) / (curr?.rate || 1),
      category: type === "income" ? "Income" : category,
      date: editingItem?.date || new Date().toISOString(),


      type,
      storyNote: editingItem?.storyNote || "Local log.",
    };
    if (editingItem?.id) payload.id = editingItem.id;

    await db.table("expenses").put(payload);


    setTitle("");
    setAmount("");
    setCategory("Food");

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
