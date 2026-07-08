const currency = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" });

export function MonthSummaryCards({ income, expenses }: { income: number; expenses: number }) {
  const balance = income - expenses;
  return <section className="grid grid-cols-1 gap-3 sm:grid-cols-3"><Card title="Despesas do mês" value={currency.format(expenses)} tone="text-rose-600" /><Card title="Receitas do mês" value={currency.format(income)} tone="text-emerald-600" /><Card title="Saldo do mês" value={currency.format(balance)} tone={balance >= 0 ? "text-brand" : "text-rose-600"} /></section>;
}
function Card({ title, value, tone }: { title: string; value: string; tone: string }) { return <div className="rounded-3xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{title}</p><p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p></div>; }
