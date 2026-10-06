// Regras do pedido de análise, compartilhadas entre o formulário (navegador) e a função
// /api/lead (servidor). Sem dependências: roda nos dois lados e nos testes com `node --test`.

// Destino fixo: o pedido sempre vai para a Helena, nunca para um número vindo do cliente.
export const HELENA_WHATSAPP = "5511932990106";
export const HELENA_INSTAGRAM = "creditocomhelena";

export const OBJETIVOS = [
  "Casa própria",
  "Financiar ou refinanciar veículo",
  "Renegociar dívidas",
  "Crédito para empresa ou MEI",
  "Empréstimo ou consignado",
  "Organizar minhas finanças",
  "Outro",
];

export const PARCELAS = [
  "Até R$ 300",
  "De R$ 301 a R$ 500",
  "De R$ 501 a R$ 1.000",
  "De R$ 1.001 a R$ 2.000",
  "Acima de R$ 2.000",
  "Ainda não sei",
];

const LIMITES = { nome: 80, mensagem: 600 };

// Ignora quebras de linha e caracteres de controle para a mensagem não ganhar formatação forjada.
function limpar(valor, max) {
  if (typeof valor !== "string") return "";
  return valor.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export function apenasDigitos(valor) {
  return typeof valor === "string" ? valor.replace(/\D/g, "") : "";
}

// Celular brasileiro: DDD + 9 dígitos, com ou sem 55 na frente.
export function normalizarCelular(valor) {
  let digitos = apenasDigitos(valor);
  if (digitos.length === 13 && digitos.startsWith("55")) digitos = digitos.slice(2);
  if (!/^[1-9][1-9]9\d{8}$/.test(digitos)) return null;
  return `55${digitos}`;
}

export function formatarCelular(valor) {
  const d = apenasDigitos(valor).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * @typedef {{ nome: string, whatsapp: string, objetivo: string, parcela: string, mensagem: string }} Pedido
 * @typedef {"nome" | "whatsapp" | "objetivo" | "parcela"} CampoObrigatorio
 * @param {unknown} entrada
 * @returns {{ ok: true, pedido: Pedido } | { ok: false, erros: Partial<Record<CampoObrigatorio, string>> }}
 */
export function validarPedido(entrada) {
  const dados = /** @type {Record<string, unknown>} */ (entrada && typeof entrada === "object" ? entrada : {});
  const pedido = {
    nome: limpar(dados.nome, LIMITES.nome),
    whatsapp: normalizarCelular(dados.whatsapp),
    objetivo: limpar(dados.objetivo, 60),
    parcela: limpar(dados.parcela, 40),
    mensagem: limpar(dados.mensagem, LIMITES.mensagem),
  };
  const erros = {};
  if (pedido.nome.length < 2) erros.nome = "Conte seu nome.";
  if (!pedido.whatsapp) erros.whatsapp = "Informe um celular com DDD.";
  if (!OBJETIVOS.includes(pedido.objetivo)) erros.objetivo = "Escolha um objetivo.";
  if (!PARCELAS.includes(pedido.parcela)) erros.parcela = "Escolha uma faixa.";
  return Object.keys(erros).length ? { ok: false, erros } : { ok: true, pedido };
}

/** @param {Pedido} pedido */
// Texto que o visitante manda para a Helena ao abrir o WhatsApp.
export function mensagemDoVisitante(pedido) {
  const linhas = [
    "Olá, Helena! Vim pelo site e quero uma análise gratuita.",
    "",
    `Nome: ${pedido.nome}`,
    `Objetivo: ${pedido.objetivo}`,
    `Parcela que cabe no bolso: ${pedido.parcela}`,
  ];
  if (pedido.mensagem) linhas.push(`Sobre meu caso: ${pedido.mensagem}`);
  return linhas.join("\n");
}

/** @param {Pedido} pedido */
// Aviso que a Iris manda para a Helena assim que o pedido chega.
export function avisoParaHelena(pedido) {
  const celular = formatarCelular(pedido.whatsapp.slice(2));
  const linhas = [
    "*Novo pedido de análise pelo site*",
    "",
    `*Nome:* ${pedido.nome}`,
    `*WhatsApp:* ${celular} — wa.me/${pedido.whatsapp}`,
    `*Objetivo:* ${pedido.objetivo}`,
    `*Parcela:* ${pedido.parcela}`,
  ];
  if (pedido.mensagem) linhas.push(`*Mensagem:* ${pedido.mensagem}`);
  linhas.push("", "A pessoa foi levada para o seu WhatsApp com o pedido escrito.", "— Iris · Journey Engage");
  return linhas.join("\n");
}

/** @param {string} [texto] */
export function linkWhatsApp(texto) {
  const base = `https://wa.me/${HELENA_WHATSAPP}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

// Envia pela instância da Iris na uazapi. `request` é injetável para teste.
export async function enviarPelaIris({ texto, serverUrl, token, request = fetch, timeoutMs = 10000 }) {
  if (!serverUrl || !token) throw new Error("iris_not_configured");
  const endpoint = new URL("/send/text", serverUrl);
  if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) throw new Error("invalid_uazapi_url");
  const response = await request(endpoint, {
    method: "POST",
    redirect: "error",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ number: HELENA_WHATSAPP, text: texto }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new Error("send_http_error");
  const resultado = await response.json();
  const id = resultado?.messageid || resultado?.id;
  if (typeof id !== "string" || !id) throw new Error("send_receipt_missing");
  return { providerId: id };
}
