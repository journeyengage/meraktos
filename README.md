# Crédito com Helena · Meraktos Consultoria

Site de uma página da Helena Santos (Meraktos Consultoria). Vite + React + Tailwind, publicado no Vercel.

## Como o pedido de análise funciona

1. O visitante preenche o formulário (`src/Formulario.tsx`).
2. O navegador chama `POST /api/lead` (`api/lead.js`). A função valida o pedido e a **Iris** (instância
   uazapi da Journey) manda o aviso para o WhatsApp da Helena, **sempre** para o número fixo em
   `lib/lead.js` (`HELENA_WHATSAPP`).
3. Em seguida o visitante é levado para `wa.me/5511932990106` com o pedido já escrito. Se a função falhar
   ou demorar mais de 2,5 s, o WhatsApp abre do mesmo jeito.

Proteções da função: mesma origem obrigatória, campo-isca, tempo mínimo de preenchimento, limite de
4 KB, limite por IP (por instância) e destino fixo. O token fica só no servidor.

## Variáveis de ambiente (Vercel)

| Nome | O quê |
|---|---|
| `UAZAPI_SERVER_URL` | URL HTTPS do servidor uazapi |
| `UAZAPI_INSTANCE_TOKEN` | token da instância da Iris (nunca o admin token) |

Sem elas, `/api/lead` responde 503 e o visitante ainda chega ao WhatsApp.

## Comandos

```bash
npm install
npm run dev      # http://localhost:8080
npm test         # testes da função (node --test, sem rede)
npm run build    # typecheck + build
```
