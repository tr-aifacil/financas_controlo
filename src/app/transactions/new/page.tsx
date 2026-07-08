import Link from "next/link";
import { redirect } from "next/navigation";
import { createTransaction } from "@/app/actions";
import { TransactionForm } from "@/components/TransactionForm";
import { createClient } from "@/lib/supabase/server";
import type { TransactionType } from "@/types/finance";

export default async function NewTransactionPage({ searchParams }: { searchParams: Promise<{ type?: TransactionType }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { type } = await searchParams;
  return <main className="mx-auto max-w-xl px-5 py-6"><Link href="/dashboard" className="text-sm font-semibold text-brand">← Voltar</Link><h1 className="my-5 text-3xl font-bold">Novo movimento</h1><TransactionForm action={createTransaction} initialType={type === "income" ? "income" : "expense"} submitLabel="Criar movimento" /></main>;
}
