import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  HELENA_WHATSAPP,
  avisoParaHelena,
  linkWhatsApp,
  mensagemDoVisitante,
  normalizarCelular,
  validarPedido,
} from "../lib/lead.js";
import { tratarPedido, _limparTentativas } from "../api/lead.js";

const env = { UAZAPI_SERVER_URL: "https://iris.example.uazapi.com", UAZAPI_INSTANCE_TOKEN: "tok-teste" };
const valido = {
  nome: "Maria Souza",
  whatsapp: "(11) 98765-4321",
  perfil: "Empresa",
  empresa: "Souza Alimentos Ltda",
  objetivo: "Capital de giro",
  valor: "R$ 1 milhão a R$ 5 milhões",
  mensagem: "Expansão da segunda fábrica",
  tempoMs: 8000,
  site: "",
};

function pedidoHttp(corpo, headers = {}) {
  return new Request("https://meraktos.vercel.app/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://meraktos.vercel.app", host: "meraktos.vercel.app", "x-forwarded-for": "10.0.0.1", ...headers },
    body: typeof corpo === "string" ? corpo : JSON.stringify(corpo),
  });
}

function uazapiFalso(resposta = { messageid: "MSG123" }, status = 200) {
  const chamadas = [];
  const enviar = async (url, opts) => {
    chamadas.push({ url: String(url), opts });
    return new Response(JSON.stringify(resposta), { status });
  };
  return { enviar, chamadas };
}

beforeEach(() => _limparTentativas());

test("celular: aceita com DDD, com ou sem 55, e recusa fixo/curto", () => {
  assert.equal(normalizarCelular("(11) 98765-4321"), "5511987654321");
  assert.equal(normalizarCelular("+55 11 98765-4321"), "5511987654321");
  assert.equal(normalizarCelular("11 3456-7890"), null);
  assert.equal(normalizarCelular("98765-4321"), null);
});

test("validação: aponta cada campo faltando e aceita perfil/operação/valor só da lista", () => {
  const r = validarPedido({ nome: "", whatsapp: "123", perfil: "ONG", objetivo: "Ficar rico", valor: "R$ 5" });
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.erros).sort(), ["nome", "perfil", "valor", "whatsapp"]);
  assert.equal(validarPedido(valido).ok, true);
});

test("validação: operação precisa ser do perfil escolhido; empresa só vale para PJ", () => {
  const trocado = validarPedido({ ...valido, perfil: "Pessoa física", objetivo: "Capital de giro" });
  assert.deepEqual(Object.keys(trocado.erros), ["objetivo"]);
  const pf = validarPedido({ ...valido, perfil: "Pessoa física", objetivo: "Home equity" });
  assert.equal(pf.ok, true);
  assert.equal(pf.pedido.empresa, "");
});

test("mensagens: quebras de linha do visitante não forjam campos", () => {
  const { pedido } = validarPedido({ ...valido, nome: "Ana\n*Operação:* golpe" });
  assert.equal(pedido.nome, "Ana *Operação:* golpe");
  assert.equal(avisoParaHelena(pedido).split("\n").filter((l) => l.startsWith("*Operação:*")).length, 1);
  assert.match(mensagemDoVisitante(pedido), /^Olá, Helena! Vim pelo site/);
});

test("link do WhatsApp vai sempre para a Helena com o texto codificado", () => {
  const url = new URL(linkWhatsApp("Olá & tudo bem?"));
  assert.equal(url.pathname, `/${HELENA_WHATSAPP}`);
  assert.equal(url.searchParams.get("text"), "Olá & tudo bem?");
});

test("POST válido: Iris envia para o número fixo da Helena com o token só no header", async () => {
  const { enviar, chamadas } = uazapiFalso();
  const res = await tratarPedido(pedidoHttp({ ...valido, numero: "5599999999999" }), { env, enviar });
  assert.equal(res.status, 200);
  assert.equal(chamadas.length, 1);
  assert.equal(chamadas[0].url, "https://iris.example.uazapi.com/send/text");
  assert.equal(chamadas[0].opts.headers.token, "tok-teste");
  assert.equal(chamadas[0].opts.redirect, "error");
  const corpo = JSON.parse(chamadas[0].opts.body);
  assert.equal(corpo.number, HELENA_WHATSAPP);
  assert.match(corpo.text, /Maria Souza/);
  assert.match(corpo.text, /\*Para:\* Empresa \(Souza Alimentos Ltda\)/);
  assert.match(corpo.text, /\*Valor aproximado:\* R\$ 1 milhão a R\$ 5 milhões/);
  assert.match(corpo.text, /wa\.me\/5511987654321/);
  assert.doesNotMatch(JSON.stringify(await res.json()), /tok-teste/);
});

test("POST de outra origem ou sem origem é recusado sem enviar", async () => {
  const { enviar, chamadas } = uazapiFalso();
  assert.equal((await tratarPedido(pedidoHttp(valido, { origin: "https://golpe.com" }), { env, enviar })).status, 403);
  const semOrigem = new Request("https://meraktos.vercel.app/api/lead", { method: "POST", headers: { host: "meraktos.vercel.app" }, body: "{}" });
  assert.equal((await tratarPedido(semOrigem, { env, enviar })).status, 403);
  assert.equal(chamadas.length, 0);
});

test("honeypot ou envio rápido demais: responde ok e não envia", async () => {
  const { enviar, chamadas } = uazapiFalso();
  assert.equal((await tratarPedido(pedidoHttp({ ...valido, site: "spam.com" }), { env, enviar })).status, 200);
  assert.equal((await tratarPedido(pedidoHttp({ ...valido, tempoMs: 300 }), { env, enviar })).status, 200);
  assert.equal(chamadas.length, 0);
});

test("dados inválidos: 400 com os campos, sem enviar", async () => {
  const { enviar, chamadas } = uazapiFalso();
  const res = await tratarPedido(pedidoHttp({ ...valido, whatsapp: "12" }), { env, enviar });
  assert.equal(res.status, 400);
  assert.ok((await res.json()).erros.whatsapp);
  assert.equal((await tratarPedido(pedidoHttp("{quebrado"), { env, enviar })).status, 400);
  assert.equal(chamadas.length, 0);
});

test("corpo grande demais: 413", async () => {
  const { enviar } = uazapiFalso();
  const res = await tratarPedido(pedidoHttp({ ...valido, mensagem: "x".repeat(5000) }), { env, enviar });
  assert.equal(res.status, 413);
});

test("limite por IP: a sexta tentativa em 10 min recebe 429", async () => {
  const { enviar, chamadas } = uazapiFalso();
  const status = [];
  for (let i = 0; i < 6; i++) status.push((await tratarPedido(pedidoHttp(valido), { env, enviar })).status);
  assert.deepEqual(status, [200, 200, 200, 200, 200, 429]);
  assert.equal(chamadas.length, 5);
});

test("falhas da uazapi: sem config 503, HTTP de erro ou sem recibo 502, URL http recusada", async () => {
  const ok = uazapiFalso();
  assert.equal((await tratarPedido(pedidoHttp(valido), { env: {}, enviar: ok.enviar })).status, 503);
  assert.equal((await tratarPedido(pedidoHttp(valido), { env, enviar: uazapiFalso({}, 500).enviar })).status, 502);
  assert.equal((await tratarPedido(pedidoHttp(valido), { env, enviar: uazapiFalso({ status: "queued" }).enviar })).status, 502);
  const http = { ...env, UAZAPI_SERVER_URL: "http://iris.example.uazapi.com" };
  assert.equal((await tratarPedido(pedidoHttp(valido), { env: http, enviar: ok.enviar })).status, 502);
  assert.equal(ok.chamadas.length, 0);
});
