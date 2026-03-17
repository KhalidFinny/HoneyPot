interface UseRunwayDisplayProps {
  balance: number;
  t: any;
  payday?: number;
}

export function useRunwayDisplay({ balance, t, payday }: UseRunwayDisplayProps) {
  // Calculate Days Left in current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const currentDay = today.getDate();
  let daysLeft = 0;

  if (payday && payday >= 1 && payday <= 31) {
    if (currentDay <= payday) {
      daysLeft = payday - currentDay;
    } else {
      const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
      daysLeft = (daysInCurrentMonth - currentDay) + payday;
    }
  } else {
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    daysLeft = daysInCurrentMonth - currentDay;
  }


  // Daily Allowance = Current Balance / Days Left
  const dailyAllowance =
    daysLeft > 0 && balance > 0
      ? balance / daysLeft
      : balance > 0
      ? balance
      : 0;

  const getAllowanceState = (amount: number) => {
    if (amount >= 12.5)
      return {
        title: t?.comfy_allowance || "Comfortable Daily Budget",
        sub: t?.comfy_allowance_sub || "Spend wisely, you have a safe margin.",
      };
    if (amount >= 3.1)
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
