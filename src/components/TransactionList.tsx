"use client";

import Link from "next/link";
import { deleteTransaction } from "@/app/actions";
import type { Transaction } from "@/types/finance";

const currency = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (!transactions.length) return <p className="rounded-2xl bg-white p-4 text-sm text-slate-500">Ainda não existem movimentos.</p>;
  return <div className="space-y-3">{transactions.map((transaction) => <article key={transaction.id} className="rounded-2xl bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{transaction.subcategory}</p><p className="text-sm text-slate-500">{transaction.date} · {transaction.category}</p>{transaction.notes ? <p className="mt-1 text-sm text-slate-600">{transaction.notes}</p> : null}</div><p className={transaction.type === "expense" ? "font-bold text-rose-600" : "font-bold text-emerald-600"}>{transaction.type === "expense" ? "-" : "+"}{currency.format(transaction.amount)}</p></div><div className="mt-3 flex gap-2"><Link className="button bg-slate-100 text-slate-700" href={`/transactions/${transaction.id}/edit`}>Editar</Link><form action={deleteTransaction.bind(null, transaction.id)} onSubmit={(event) => { if (!confirm("Eliminar este movimento?")) event.preventDefault(); }}><button className="bg-rose-50 text-rose-700" type="submit" formAction={deleteTransaction.bind(null, transaction.id)}>Eliminar</button></form></div></article>)}</div>;
}
