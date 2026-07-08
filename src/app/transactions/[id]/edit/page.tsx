import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { updateTransaction } from "@/app/actions";
import { TransactionForm } from "@/components/TransactionForm";
import { createClient } from "@/lib/supabase/server";
import type { Transaction } from "@/types/finance";

export default async function EditTransactionPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { id } = await params;
  const { data: transaction } = await supabase.from("transactions").select("*").eq("id", id).single<Transaction>();
  if (!transaction) notFound();
  return <main className="mx-auto max-w-xl px-5 py-6"><Link href="/dashboard" className="text-sm font-semibold text-brand">← Voltar</Link><h1 className="my-5 text-3xl font-bold">Editar movimento</h1><TransactionForm action={updateTransaction.bind(null, id)} transaction={transaction} submitLabel="Atualizar movimento" /></main>;
}
