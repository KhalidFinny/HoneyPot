export interface Currency {
  symbol: string;
  rate: number;
  decimals?: number;
}

export interface Transaction {
  id?: any;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: string; // 'income' | 'expense'
  storyNote?: string;
}

export interface DecideInputProps {
  balance: number;
  transactions?: Transaction[];
  curr?: Currency;
  t?: any;
}

export interface BudgetMeterProps {
  currentExpenses: number;
  curr?: Currency;
  t?: any;
}

export interface SmartNotesProps {
  transactions?: Transaction[];
  totalIncome: number;
  totalExpense: number;
  t?: any;
}

export interface RunwayDisplayProps {
  balance: number;
  transactions?: Transaction[];
  t?: any;
  payday?: number;
  curr?: Currency;
}




export interface HistoryListProps {
  expenses?: Transaction[];
  curr?: Currency;
  t?: any;
  onOpenAll?: () => void;
  onEdit?: (item: Transaction) => void;
}



export interface HistoryManagerProps {
  expenses: Transaction[];
  curr?: Currency;
  t: any;
}



export interface InputFormProps {
  onComplete?: () => void;
  t?: any;
  editingItem?: Transaction;
  curr?: Currency;
}


export interface BalanceBannerProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  curr?: Currency;
  t?: any;
}

export interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
