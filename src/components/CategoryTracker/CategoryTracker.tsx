import { Utensils, Car, CreditCard, ShoppingBag, Folder } from 'lucide-react'
import { Transaction, Currency } from '../../types'

interface CategoryTrackerProps {
  transactions: Transaction[];
  curr?: Currency;
  t?: any;
}

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


export default function CategoryTracker({ transactions = [], curr, t }: CategoryTrackerProps) {
  const symbol = curr?.symbol || 'Rp';
  const rate = curr?.rate || 1;


  // Group by category for CURRENT MONTH
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const spentByCategory: { [key: string]: number } = {};
  
  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      const txDate = parseSafeDate(tx.date);
      if (!isNaN(txDate.getTime()) && txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {

        const cat = tx.category.toLowerCase();
        spentByCategory[cat] = (spentByCategory[cat] || 0) + tx.amount;
      }
    }
  });

  const categories = [
    { key: 'food', label: t?.food || 'Food', icon: Utensils, color: 'bg-[#FFD0E8]' },
    { key: 'transport', label: t?.transport || 'Transport', icon: Car, color: 'bg-[#FFF0F8]' },
    { key: 'bills', label: t?.bills || 'Bills', icon: CreditCard, color: 'bg-[#FFFDF5]' },
    { key: 'shopping', label: t?.shopping || 'Shopping', icon: ShoppingBag, color: 'bg-[#FFE566]' },
  ];

  const totalSpent = Object.values(spentByCategory).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-sm flex flex-col items-start mt-4 bg-bg2 border border-border2 p-4 rounded-[24px] shadow-sm">
      <h3 className="text-sm font-sans font-bold text-ink mb-3 tracking-wide">{t?.categories || 'Category Spent'}</h3>
      <div className="flex flex-col gap-3 w-full">
        {categories.map((cat) => {
          const spent = spentByCategory[cat.key] || 0;
          const percentage = totalSpent > 0 ? (spent / totalSpent) * 100 : 0;
          const Icon = cat.icon;

          return (
            <div key={cat.key} className="w-full">
              <div className="flex justify-between items-center mb-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 rounded-lg bg-ink/5 text-ink">
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-ink">{cat.label}</span>
                </div>
                <span className="font-extrabold text-ink">
                  {symbol}{(spent * rate).toLocaleString(undefined, { minimumFractionDigits: curr?.decimals ?? 0, maximumFractionDigits: curr?.decimals ?? 0 })}
                </span>

              </div>
              <div className="w-full h-2 bg-rule/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#FFC4D9] rounded-full transition-all duration-300 shadow-sm" 
                  style={{ width: `${Math.min(100, percentage)}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
