import { useState } from "react";
import { db } from "../../data/db";
import { currencies } from "../../logic/settings";

export function useOnboarding() {
  const [step, setStep] = useState<"cover" | "info">("cover");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [lang, setLang] = useState<"en" | "id">("en");
  const [curr, setCurr] = useState("USD");


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
    if (!name.trim()) return;

    await db.table("settings").put({ key: "language", value: lang });
    await db.table("settings").put({ key: "currency", value: curr });
    await db.table("settings").put({ key: "username", value: name.trim() });

    if (amount) {
      const num = parseFloat(amount.replace(/,/g, ""));
      const activeCurr =
        currencies[curr as keyof typeof currencies] || currencies.USD;
      // Convert amount back to baseline USD equivalent before saving raw to DB
      const baselineAmount = num / activeCurr.rate;

      await db.table("expenses").add({
        title: lang === "id" ? "Saldo Awal" : "Starting Balance",
        amount: baselineAmount,
        category: "Income",
        date: new Date().toLocaleDateString(),
        type: "income",
        storyNote: "Local account opened.",
      });
    }
    window.location.reload();
  };

  return {
    step,
    setStep,
    name,
    setName,
    amount,
    lang,
    setLang,
    curr,
    setCurr,
    handleAmountChange,
    handleSubmit,
  };
}
