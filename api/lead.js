// POST /api/lead — a Iris avisa a Helena no WhatsApp quando chega um pedido pelo site.
// O token da instância fica só aqui (env do Vercel); o navegador nunca o vê.
import { avisoParaHelena, enviarPelaIris, validarPedido } from "../lib/lead.js";

const MAX_BYTES = 4096;
const TEMPO_MINIMO_MS = 2500;
const JANELA_MS = 10 * 60 * 1000;
const MAX_POR_JANELA = 5;

// Limite por IP na instância aquecida: freia repetição, não é barreira forte.
const tentativas = new Map();

function json(status, corpo) {
  return Response.json(corpo, { status, headers: { "Cache-Control": "no-store" } });
}

function mesmaOrigem(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function excedeuLimite(ip, agora = Date.now()) {
  const recentes = (tentativas.get(ip) || []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  tentativas.set(ip, recentes);
  return recentes.length > MAX_POR_JANELA;
}

export function _limparTentativas() {
  tentativas.clear();
}

export async function tratarPedido(request, { env = process.env, enviar = fetch } = {}) {
  if (!mesmaOrigem(request)) return json(403, { error: "forbidden" });
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES) return json(413, { error: "too_large" });

  let dados;
  try {
    const texto = await request.text();
    if (texto.length > MAX_BYTES) return json(413, { error: "too_large" });
    dados = JSON.parse(texto);
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Honeypot preenchido ou envio rápido demais: responde ok e não envia nada.
  if (dados?.site || Number(dados?.tempoMs) < TEMPO_MINIMO_MS) return json(200, { ok: true });

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "desconhecido";
  if (excedeuLimite(ip)) return json(429, { error: "rate_limited" });

  const validado = validarPedido(dados);
  if (!validado.ok) return json(400, { error: "invalid", erros: validado.erros });

  try {
    const { providerId } = await enviarPelaIris({
      texto: avisoParaHelena(validado.pedido),
      serverUrl: env.UAZAPI_SERVER_URL,
      token: env.UAZAPI_INSTANCE_TOKEN,
      request: enviar,
    });
    console.log(JSON.stringify({ event: "lead_notified", providerId }));
    return json(200, { ok: true });
  } catch (erro) {
    const code = /^[a-z_]{1,40}$/.test(erro?.message || "") ? erro.message : erro?.name || "error";
    console.error(JSON.stringify({ event: "lead_notify_failed", code }));
    return json(code === "iris_not_configured" ? 503 : 502, { error: "notify_failed" });
  }
}

export function POST(request) {
  return tratarPedido(request);
}
