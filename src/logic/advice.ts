export function generateSoftAdvice(transactions: any[] = []) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');
  
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  
  if (transactions.length === 0) {
    return "When you log your first income or expense, I can help you keep an eye on things. Take your time.";
  }

  // Check 1: Over-spending Income
  if (totalExpense > totalIncome && totalIncome > 0) {
    return "We spent a little bit more than we got this period. Don't worry about it, let's just keep an eye on things and we'll be completely fine.";
  }

  // Check 2: Top category weight
  const categories: { [key: string]: number } = {};
  expenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + e.amount;
  });

  let topCategory = null;
  let topAmount = 0;
  for (const [cat, amt] of Object.entries(categories)) {
    if (amt > topAmount) { topAmount = amt; topCategory = cat; }
  }

  if (topCategory && totalExpense > 0) {
    const percentage = (topAmount / totalExpense) * 100;
    if (percentage > 35) {
      const lowerCat = topCategory.toLowerCase();
      if (lowerCat === 'food') {
        return "We've been eating pretty well recently. Cooking something simple at home tonight sounds like a nice way to save a bit together.";
      }
      if (lowerCat === 'shopping') {
        return `You picked up some nice things for yourself. Let's just go easy on the shopping for the rest of the week so we stay balanced. I'm right here with you.`;
      }
      return `We've put a bit into **${topCategory}** recently. Just a soft thought to maybe take it slow there today to keep everything balanced.`;
    }
  }

  // Check 3: Good savings
  if (totalIncome > totalExpense && totalExpense > 0) {
    return `Look at us, we saved $${(totalIncome - totalExpense).toFixed(2)} so far. That is honestly amazing and I'm proud of how you're managing this.`;
  }

  return "You're keeping everything tracking perfectly today. It's nice seeing how comfortable we are with where things are at.";
}
