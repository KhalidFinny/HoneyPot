interface UseRunwayDisplayProps {
  balance: number;
  t: any;
}

export function useRunwayDisplay({ balance, t }: UseRunwayDisplayProps) {
  // Calculate Days Left in current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysLeft = daysInMonth - today.getDate();

  // Daily Allowance = Current Balance / Days Left
  const dailyAllowance =
    daysLeft > 0 && balance > 0
      ? balance / daysLeft
      : balance > 0
      ? balance
      : 0;

  const getAllowanceState = (amount: number) => {
    if (amount >= 200000)
      return {
        title: t?.comfy_allowance || "Comfortable Daily Budget",
        sub: t?.comfy_allowance_sub || "Spend wisely, you have a safe margin.",
      };
    if (amount >= 50000)
      return {
        title: t?.mod_allowance || "Moderate Daily Budget",
        sub: t?.mod_allowance_sub || "Mindful spending recommended.",
      };
    if (amount > 0)
      return {
        title: t?.tight_allowance || "Tight Daily Budget",
        sub: t?.tight_allowance_sub || "Keep it descriptive, every penny counts.",
      };
    return {
      title: t?.empty_allowance || "The pot is empty",
      sub: t?.empty_allowance_sub || "No remaining funds for the month.",
    };
  };

  const { title, sub } = getAllowanceState(dailyAllowance);

  return {
    daysLeft,
    dailyAllowance,
    title,
    sub,
  };
}
