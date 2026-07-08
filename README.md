# Finanças Pessoais

App moderna para controlo de finanças pessoais, focada em registar despesas e receitas, acompanhar o saldo do mês e preparar futura sincronização com Google Sheets.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Supabase Auth e Postgres com RLS
- PWA básico através de `public/manifest.json`

## Variáveis de ambiente

Crie um ficheiro `.env.local` com:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Como correr localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## SQL / migration Supabase

A migration está em `supabase/migrations/20260708000000_create_transactions.sql` e cria a tabela `transactions` com:

- `synced_to_sheet` e `synced_at`
- Row Level Security com políticas baseadas em `auth.uid() = user_id`
- trigger para atualizar `updated_at`

Aplique a migration no projeto Supabase antes de usar o CRUD.

## Funcionalidades implementadas

- Login, criação de conta e logout com Supabase email/password
- Proteção das páginas principais e redirect para `/login`
- Dashboard mobile first com despesas, receitas e saldo do mês atual
- Criação de despesas e receitas
- Listagem dos últimos movimentos
- Edição de movimentos
- Eliminação com confirmação
- Garantia de que `user_id` vem do utilizador autenticado no servidor
- Categorias simples para despesas e receitas
- Estrutura inicial para futura sincronização com Google Sheets

## Funcionalidades futuras

- Sincronização Google Sheets
- Investimentos
- Snapshot mensal de net worth
- Importação CSV do Money Lover
- Dashboards avançados
