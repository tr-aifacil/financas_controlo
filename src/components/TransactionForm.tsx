import { useEffect, useMemo, useState, type FormEvent } from "react";

import {
  getCategoriesByType,
  getSubcategoriesByCategory,
  type TransactionType,
} from "../lib/finance-categories";

type TransactionFormValues = {
  type: TransactionType;
  category: string;
  subcategory: string;
  amount: string;
  date: string;
  notes: string;
};

type TransactionFormProps = {
  onSubmit?: (values: TransactionFormValues) => void;
};

const initialType: TransactionType = "expense";
const initialCategory = getCategoriesByType(initialType)[0]?.category ?? "";
const initialSubcategory = getSubcategoriesByCategory(initialType, initialCategory)[0] ?? "";

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initialType);
  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState(initialSubcategory);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const categories = useMemo(() => getCategoriesByType(type), [type]);
  const subcategories = useMemo(
    () => getSubcategoriesByCategory(type, category),
    [type, category],
  );

  useEffect(() => {
    const firstCategory = categories[0]?.category ?? "";

    if (!categories.some((financeCategory) => financeCategory.category === category)) {
      setCategory(firstCategory);
    }
  }, [categories, category]);

  useEffect(() => {
    const firstSubcategory = subcategories[0] ?? "";

    if (!subcategories.includes(subcategory)) {
      setSubcategory(firstSubcategory);
    }
  }, [subcategories, subcategory]);

  function handleTypeChange(nextType: TransactionType) {
    const nextCategory = getCategoriesByType(nextType)[0]?.category ?? "";
    const nextSubcategory = getSubcategoriesByCategory(nextType, nextCategory)[0] ?? "";

    setType(nextType);
    setCategory(nextCategory);
    setSubcategory(nextSubcategory);
  }

  function handleCategoryChange(nextCategory: string) {
    const nextSubcategory = getSubcategoriesByCategory(type, nextCategory)[0] ?? "";

    setCategory(nextCategory);
    setSubcategory(nextSubcategory);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit?.({ type, category, subcategory, amount, date, notes });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tipo
        <select required value={type} onChange={(event) => handleTypeChange(event.target.value as TransactionType)}>
          <option value="expense">Despesa</option>
          <option value="income">Rendimento</option>
        </select>
      </label>

      <label>
        Categoria
        <select required value={category} onChange={(event) => handleCategoryChange(event.target.value)}>
          {categories.map((financeCategory) => (
            <option key={financeCategory.category} value={financeCategory.category}>
              {financeCategory.category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Subcategoria
        <select required value={subcategory} onChange={(event) => setSubcategory(event.target.value)}>
          {subcategories.map((subcategoryOption) => (
            <option key={subcategoryOption} value={subcategoryOption}>
              {subcategoryOption}
            </option>
          ))}
        </select>
      </label>

      <label>
        Montante
        <input required type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
      </label>

      <label>
        Data
        <input required type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>

      <label>
        Notas
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
}
