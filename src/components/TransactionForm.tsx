"use client";

import { useMemo, useState } from "react";
import { categoriesForType } from "@/lib/finance-categories";
import type { Transaction, TransactionType } from "@/types/finance";

type Props = {
  action: (formData: FormData) => void;
  initialType?: TransactionType;
  transaction?: Transaction;
  submitLabel?: string;
};

export function TransactionForm({ action, initialType = "expense", transaction, submitLabel = "Guardar" }: Props) {
  const [type, setType] = useState<TransactionType>(transaction?.type ?? initialType);
  const categories = useMemo(() => categoriesForType(type), [type]);
  const defaultCategory = transaction?.type === type ? transaction.category : categories[0]?.name ?? "";
  const [category, setCategory] = useState(defaultCategory);
  const subcategories = categories.find((item) => item.name === category)?.subcategories ?? categories[0]?.subcategories ?? [];

  function changeType(nextType: TransactionType) {
    setType(nextType);
    setCategory(categoriesForType(nextType)[0]?.name ?? "");
  }

  return (
    <form action={action} className="space-y-4 rounded-3xl bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        {(["expense", "income"] as TransactionType[]).map((option) => (
          <label key={option} className={`rounded-2xl border p-3 text-center text-sm font-semibold ${type === option ? "border-brand bg-blue-50 text-brand" : "border-slate-200"}`}>
            <input className="sr-only" name="type" type="radio" value={option} checked={type === option} onChange={() => changeType(option)} />
            {option === "expense" ? "Despesa" : "Receita"}
          </label>
        ))}
      </div>
      <label className="block text-sm font-medium">Data<input name="date" type="date" required defaultValue={transaction?.date ?? new Date().toISOString().slice(0, 10)} /></label>
      <label className="block text-sm font-medium">Categoria<select name="category" required value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
      <label className="block text-sm font-medium">Subcategoria<select name="subcategory" required defaultValue={transaction?.subcategory ?? subcategories[0]} key={`${type}-${category}`}>{subcategories.map((subcategory) => <option key={subcategory}>{subcategory}</option>)}</select></label>
      <label className="block text-sm font-medium">Valor<input name="amount" type="number" step="0.01" min="0" required defaultValue={transaction?.amount} placeholder="0,00" /></label>
      <label className="block text-sm font-medium">Notas<textarea name="notes" rows={3} defaultValue={transaction?.notes ?? ""} placeholder="Opcional" /></label>
      <button className="w-full bg-brand text-white hover:bg-blue-700" type="submit">{submitLabel}</button>
    </form>
  );
}
