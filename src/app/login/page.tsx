import { signIn, signUp } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");
  const { message } = await searchParams;

  return <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10"><div className="mb-8"><p className="text-sm font-semibold text-brand">Finanças Pessoais</p><h1 className="mt-2 text-3xl font-bold">Entrar na sua conta</h1><p className="mt-2 text-slate-500">Acompanhe receitas, despesas e saldo mensal.</p></div>{message ? <p className="mb-4 rounded-2xl bg-amber-50 p-3 text-sm text-amber-700">{message}</p> : null}<form className="space-y-4 rounded-3xl bg-white p-5 shadow-sm"><label className="block text-sm font-medium">Email<input name="email" type="email" required /></label><label className="block text-sm font-medium">Password<input name="password" type="password" minLength={6} required /></label><div className="grid grid-cols-2 gap-3"><button formAction={signIn} className="bg-brand text-white">Login</button><button formAction={signUp} className="bg-slate-100 text-slate-700">Criar conta</button></div></form></main>;
}
