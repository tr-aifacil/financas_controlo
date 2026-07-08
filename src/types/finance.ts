export type TransactionType = "expense" | "income";

export type Transaction = {
  id: string;
  user_id: string;
  type: TransactionType;
  date: string;
  category: string;
  subcategory: string;
  amount: number;
  notes: string | null;
  synced_to_sheet: boolean;
  synced_at: string | null;
  created_at: string;
  updated_at: string;
};

export type TransactionInput = {
  type: TransactionType;
  date: string;
  category: string;
  subcategory: string;
  amount: number;
  notes?: string;
};
