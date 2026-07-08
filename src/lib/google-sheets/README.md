# Futuro sincronizador Google Sheets

A sincronização deverá procurar transações com `synced_to_sheet = false`, escrever apenas os campos necessários na folha **“Registo de transações”** e marcar `synced_to_sheet`/`synced_at` depois de uma escrita bem-sucedida.

Mapeamento planeado:

| Campo da transação | Google Sheet | Coluna |
| --- | --- | --- |
| `date` | Registo de transações | B |
| `subcategory` | Registo de transações | D |
| `amount` | Registo de transações | F |
| `notes` | Registo de transações | G |

Não escrever nas colunas C e E, porque são fórmulas mantidas na própria folha.
