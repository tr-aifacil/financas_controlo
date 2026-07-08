export type TransactionType = "income" | "expense";

export type FinanceCategory = {
  type: TransactionType;
  category: string;
  subcategories: string[];
};

export const financeCategories: FinanceCategory[] = [
  {
    type: "income",
    category: "Rendimentos",
    subcategories: ["Salário", "Subsídios", "Bónus", "Juros", "Dividendos", "Outros rendimentos"],
  },
  {
    type: "expense",
    category: "Habitação",
    subcategories: ["Renda", "Crédito habitação", "Condomínio", "Manutenção", "Seguro habitação", "Outros"],
  },
  {
    type: "expense",
    category: "Utilities",
    subcategories: ["Eletricidade", "Água", "Gás", "Internet", "Telemóvel", "Televisão", "Outros"],
  },
  {
    type: "expense",
    category: "Comida e bebida",
    subcategories: ["Supermercado", "Restaurantes", "Cafés", "Take-away", "Outros"],
  },
  {
    type: "expense",
    category: "Transportes",
    subcategories: ["Combustível", "Transportes públicos", "Táxi/TVDE", "Estacionamento", "Portagens", "Manutenção", "Seguro automóvel", "Outros"],
  },
  {
    type: "expense",
    category: "Saúde",
    subcategories: ["Consultas", "Medicamentos", "Exames", "Seguro saúde", "Dentista", "Outros"],
  },
  {
    type: "expense",
    category: "Educação",
    subcategories: ["Propinas", "Livros", "Cursos", "Material escolar", "Outros"],
  },
  {
    type: "expense",
    category: "Entretenimento",
    subcategories: ["Cinema", "Concertos", "Streaming", "Jogos", "Eventos", "Outros"],
  },
  {
    type: "expense",
    category: "Cuidados pessoais",
    subcategories: ["Cabeleireiro", "Estética", "Ginásio", "Vestuário", "Higiene", "Outros"],
  },
  {
    type: "expense",
    category: "Férias",
    subcategories: ["Alojamento", "Voos", "Transportes", "Refeições", "Atividades", "Outros"],
  },
  {
    type: "expense",
    category: "Investimentos",
    subcategories: ["Ações", "ETF", "Fundos", "Cripto", "PPR", "Outros"],
  },
  {
    type: "expense",
    category: "Outras despesas",
    subcategories: ["Impostos", "Comissões bancárias", "Donativos", "Presentes", "Outros"],
  },
];

export function getCategoriesByType(type: TransactionType): FinanceCategory[] {
  return financeCategories.filter((financeCategory) => financeCategory.type === type);
}

export function getSubcategoriesByCategory(type: TransactionType, category: string): string[] {
  return financeCategories.find(
    (financeCategory) => financeCategory.type === type && financeCategory.category === category,
  )?.subcategories ?? [];
}
