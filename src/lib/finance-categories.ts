import type { TransactionType } from "@/types/finance";

export type FinanceCategory = {
  type: TransactionType;
  name: string;
  subcategories: string[];
};

export const financeCategories: FinanceCategory[] = [
  { type: "expense", name: "Casa", subcategories: ["Renda", "Crédito habitação", "Condomínio", "Eletricidade", "Água", "Gás", "Internet"] },
  { type: "expense", name: "Alimentação", subcategories: ["Supermercado", "Restaurantes", "Café"] },
  { type: "expense", name: "Transportes", subcategories: ["Combustível", "Transportes públicos", "Táxi/TVDE", "Manutenção", "Seguro auto"] },
  { type: "expense", name: "Saúde", subcategories: ["Consultas", "Farmácia", "Seguro saúde"] },
  { type: "expense", name: "Lazer", subcategories: ["Viagens", "Subscrições", "Eventos", "Compras"] },
  { type: "expense", name: "Educação", subcategories: ["Cursos", "Livros", "Propinas"] },
  { type: "expense", name: "Outros", subcategories: ["Impostos", "Presentes", "Diversos"] },
  { type: "income", name: "Rendimentos", subcategories: ["Salário", "Bónus", "Freelance", "Juros", "Dividendos", "Reembolsos", "Outros"] },
];

export function categoriesForType(type: TransactionType) {
  return financeCategories.filter((category) => category.type === type);
}
