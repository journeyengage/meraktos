// Regras do pedido de análise, compartilhadas entre o formulário (navegador) e a função
// /api/lead (servidor). Sem dependências: roda nos dois lados e nos testes com `node --test`.

// Destino fixo: o pedido sempre vai para a Helena, nunca para um número vindo do cliente.
export const HELENA_WHATSAPP = "5511932990106";
export const HELENA_INSTAGRAM = "creditocomhelena";

export const PERFIS = ["Empresa", "Pessoa física"];

export const OBJETIVOS = {
  Empresa: [
    "Capital de giro",
    "BNDES, FGI ou FINAME",
    "Crédito com garantia de imóvel",
    "Auto equity",
    "Antecipação de recebíveis",
    "Reestruturação de passivos bancários",
    "Consórcio ou seguro empresarial",
    "Outro",
  ],
  "Pessoa física": [
    "Financiamento de imóvel",
    "Home equity",
    "Consórcio",
    "Financiamento ou refinanciamento de veículo",
    "Reestruturação de passivos",
    "Outro",
  ],
};

export const VALORES = [
  "Até R$ 100 mil",
  "R$ 100 mil a R$ 500 mil",
  "R$ 500 mil a R$ 1 milhão",
  "R$ 1 milhão a R$ 5 milhões",
  "Acima de R$ 5 milhões",
  "Ainda não sei",
];

const LIMITES = { nome: 80, empresa: 80, mensagem: 600 };

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
 * @typedef {{ nome: string, whatsapp: string, perfil: string, empresa: string, objetivo: string, valor: string, mensagem: string }} Pedido
 * @typedef {"nome" | "whatsapp" | "perfil" | "objetivo" | "valor"} CampoObrigatorio
 * @param {unknown} entrada
 * @returns {{ ok: true, pedido: Pedido } | { ok: false, erros: Partial<Record<CampoObrigatorio, string>> }}
 */
export function validarPedido(entrada) {
  const dados = /** @type {Record<string, unknown>} */ (entrada && typeof entrada === "object" ? entrada : {});
  const perfil = limpar(dados.perfil, 20);
  const pedido = {
    nome: limpar(dados.nome, LIMITES.nome),
    whatsapp: normalizarCelular(dados.whatsapp),
    perfil,
    empresa: perfil === "Empresa" ? limpar(dados.empresa, LIMITES.empresa) : "",
    objetivo: limpar(dados.objetivo, 60),
    valor: limpar(dados.valor, 40),
    mensagem: limpar(dados.mensagem, LIMITES.mensagem),
  };
  const erros = {};
  if (pedido.nome.length < 2) erros.nome = "Informe seu nome.";
  if (!pedido.whatsapp) erros.whatsapp = "Informe um celular com DDD.";
  if (!PERFIS.includes(perfil)) erros.perfil = "Diga se o crédito é para empresa ou pessoa física.";
  else if (!OBJETIVOS[perfil].includes(pedido.objetivo)) erros.objetivo = "Escolha o tipo de operação.";
  if (!VALORES.includes(pedido.valor)) erros.valor = "Escolha uma faixa de valor.";
  return Object.keys(erros).length ? { ok: false, erros } : { ok: true, pedido };
}

/** @param {Pedido} pedido */
function perfilDescrito(pedido) {
  return pedido.empresa ? `${pedido.perfil} (${pedido.empresa})` : pedido.perfil;
}

/** @param {Pedido} pedido */
// Texto que o visitante manda para a Helena ao abrir o WhatsApp.
export function mensagemDoVisitante(pedido) {
  const linhas = [
    "Olá, Helena! Vim pelo site e quero solicitar uma análise de crédito.",
    "",
    `Nome: ${pedido.nome}`,
    `Para: ${perfilDescrito(pedido)}`,
    `Operação: ${pedido.objetivo}`,
    `Valor aproximado: ${pedido.valor}`,
  ];
  if (pedido.mensagem) linhas.push(`Contexto: ${pedido.mensagem}`);
  return linhas.join("\n");
}

/** @param {Pedido} pedido */
// Aviso que a Iris manda para a Helena assim que o pedido chega.
export function avisoParaHelena(pedido) {
  const celular = formatarCelular(pedido.whatsapp.slice(2));
  const linhas = [
    "*Nova solicitação de análise pelo site*",
    "",
    `*Nome:* ${pedido.nome}`,
    `*WhatsApp:* ${celular} — wa.me/${pedido.whatsapp}`,
    `*Para:* ${perfilDescrito(pedido)}`,
    `*Operação:* ${pedido.objetivo}`,
    `*Valor aproximado:* ${pedido.valor}`,
  ];
  if (pedido.mensagem) linhas.push(`*Contexto:* ${pedido.mensagem}`);
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
