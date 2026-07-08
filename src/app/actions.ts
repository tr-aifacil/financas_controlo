"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { TransactionInput, TransactionType } from "@/types/finance";

async function requireUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

function parseTransaction(formData: FormData): TransactionInput {
  return {
    type: formData.get("type") as TransactionType,
    date: String(formData.get("date")),
    category: String(formData.get("category")),
    subcategory: String(formData.get("subcategory")),
    amount: Number(formData.get("amount")),
    notes: String(formData.get("notes") || ""),
  };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function createTransaction(formData: FormData) {
  const { supabase, user } = await requireUser();
  const values = parseTransaction(formData);
  const { error } = await supabase.from("transactions").insert({ ...values, user_id: user.id });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateTransaction(id: string, formData: FormData) {
  const { supabase } = await requireUser();
  const values = parseTransaction(formData);
  const { error } = await supabase.from("transactions").update(values).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteTransaction(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
}
