import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions";
import { MonthSummaryCards } from "@/components/MonthSummaryCards";
import { TransactionList } from "@/components/TransactionList";
import { createClient } from "@/lib/supabase/server";
import type { Transaction } from "@/types/finance";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString().slice(0, 10);
  const { data: transactions = [] } = await supabase.from("transactions").select("*").order("date", { ascending: false }).order("created_at", { ascending: false }).limit(20).returns<Transaction[]>();
  const monthTransactions = transactions.filter((transaction) => transaction.date >= monthStart);
  const income = monthTransactions.filter((transaction) => transaction.type === "income").reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const expenses = monthTransactions.filter((transaction) => transaction.type === "expense").reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  return <main className="mx-auto max-w-4xl px-5 py-6"><header className="mb-6 flex items-center justify-between gap-3"><div><p className="text-sm text-slate-500">Olá, {user.email}</p><h1 className="text-3xl font-bold">Dashboard</h1></div><form action={signOut}><button className="bg-slate-200 text-slate-700">Logout</button></form></header><MonthSummaryCards income={income} expenses={expenses} /><div className="my-6 grid grid-cols-2 gap-3"><Link href="/transactions/new?type=expense" className="button bg-rose-600 text-white">Nova despesa</Link><Link href="/transactions/new?type=income" className="button bg-emerald-600 text-white">Nova receita</Link></div><section><h2 className="mb-3 text-xl font-bold">Últimos movimentos</h2><TransactionList transactions={transactions} /></section></main>;
}
