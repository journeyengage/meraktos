import { useState } from "react";
import { ArrowRight, Instagram } from "lucide-react";
import { HELENA_INSTAGRAM, OBJETIVOS, linkWhatsApp } from "../lib/lead.js";
import { Formulario, type Preselecao } from "./Formulario";
import { IconeWhatsApp } from "./IconeWhatsApp";

const WHATSAPP_DIRETO = linkWhatsApp("Olá, Helena! Vim pelo site e gostaria de conversar sobre uma operação de crédito.");

type Perfil = keyof typeof OBJETIVOS;
type Operacao = { nome: string; texto: string };

const operacoes: Record<Perfil, Operacao[]> = {
  Empresa: [
    { nome: "Capital de giro", texto: "Caixa para operar e crescer, com prazo e garantia ajustados ao ciclo do negócio." },
    { nome: "BNDES, FGI ou FINAME", texto: "Linhas de fomento para investimento, máquinas e equipamentos." },
    { nome: "Crédito com garantia de imóvel", texto: "Prazo longo e custo menor que o crédito sem garantia." },
    { nome: "Auto equity", texto: "Crédito com a frota ou o veículo da empresa como garantia." },
    { nome: "Antecipação de recebíveis", texto: "Vendas a prazo convertidas em caixa hoje." },
    { nome: "Reestruturação de passivos bancários", texto: "Dívidas com bancos reorganizadas em prazo e custo que a operação suporta." },
    { nome: "Consórcio ou seguro empresarial", texto: "Planejamento de aquisições e proteção do patrimônio da empresa." },
  ],
  "Pessoa física": [
    { nome: "Financiamento de imóvel", texto: "Aquisição de imóvel residencial, inclusive de alto padrão." },
    { nome: "Home equity", texto: "Crédito com o seu imóvel como garantia, em prazo longo." },
    { nome: "Consórcio", texto: "Compra planejada de imóvel ou veículo sem os juros de um financiamento." },
    { nome: "Financiamento ou refinanciamento de veículo", texto: "Compra ou crédito com o veículo quitado como garantia." },
    { nome: "Reestruturação de passivos", texto: "Dívidas caras trocadas por uma estrutura que cabe no seu patrimônio." },
  ],
};

const principios = [
  { titulo: "Leio a operação como o comitê lê", texto: "Sei o que o banco pergunta antes de aprovar: garantia, fluxo de caixa, endividamento, histórico. Chegamos com as respostas prontas." },
  { titulo: "Estruturo antes de pedir", texto: "Linha, prazo e garantia são definidos antes da proposta, e não depois da primeira recusa." },
  { titulo: "Negocio e acompanho até a liberação", texto: "Fico do seu lado durante a negociação e todo o processo, até o crédito liberado." },
];

const etapas = [
  { titulo: "Diagnóstico", texto: "Entendo o objetivo, o caixa e as garantias disponíveis. A análise inicial não tem custo." },
  { titulo: "Estruturação", texto: "Defino a linha, o prazo e a garantia que fazem sentido e preparo a documentação." },
  { titulo: "Negociação", texto: "Apresento a operação às instituições e negocio as condições junto com você." },
  { titulo: "Liberação", texto: "Acompanho até o crédito na conta e sigo disponível depois dele." },
];

function Cabecalho() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-noite-950/95">
      <div className="container flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <a href="#inicio" aria-label="Meraktos Consultoria, início" className="shrink-0">
          <img src="/img/logo-horizontal.png" alt="Meraktos Consultoria" width={450} height={125} className="h-9 w-auto md:h-10" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-9 text-[15px] text-white/75 lg:flex">
          <a href="#operacoes" className="transition-colors hover:text-white">Operações</a>
          <a href="#como-funciona" className="transition-colors hover:text-white">Como funciona</a>
          <a href="#helena" className="transition-colors hover:text-white">Helena Santos</a>
        </nav>
        <a href="#analise" className="btn-claro min-h-10 px-4 text-sm md:min-h-11 md:px-5">Solicitar análise</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-noite-950 text-white">
      <picture className="absolute inset-0 -z-20">
        <source media="(max-width: 767px)" srcSet="/img/sao-paulo-noite-mobile.webp" />
        <img src="/img/sao-paulo-noite.webp" alt="" width={2000} height={1126}
          className="h-full w-full animate-assentar object-cover object-center" fetchPriority="high" />
      </picture>
      <div aria-hidden className="absolute inset-0 -z-10 bg-noite-900/30 mix-blend-multiply" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,11,21,0.94)_0%,rgba(5,11,21,0.74)_45%,rgba(5,11,21,0.12)_100%)] max-md:bg-[linear-gradient(0deg,rgba(5,11,21,0.97)_0%,rgba(5,11,21,0.82)_52%,rgba(5,11,21,0.15)_100%)]" />

      <div className="container pb-12 pt-32 md:pb-20">
        <h1 className="max-w-[15ch] animate-subir text-display font-semibold">
          Crédito estruturado com quem conhece o banco por dentro.
        </h1>
        <p className="mt-7 max-w-[54ch] text-lede text-noite-300">
          Passei mais de 15 anos dentro dos bancos. Hoje estruturo, negocio e acompanho operações de crédito para
          empresas e para o patrimônio de quem as dirige.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#analise" className="btn-claro">
            Solicitar análise <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a href={WHATSAPP_DIRETO} className="btn-contorno">
            <IconeWhatsApp className="h-5 w-5" /> Conversar no WhatsApp
          </a>
        </div>
        <div className="mt-14 flex items-center gap-4 border-t border-ouro/60 pt-6">
          <img src="/img/helena.webp" alt="" width={788} height={786} className="h-14 w-14 rounded-full object-cover object-top" />
          <p className="text-[15px] leading-snug">
            <span className="block font-semibold text-white">Helena Santos</span>
            <span className="text-noite-300">Personal Banker · Meraktos Consultoria</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Tese() {
  return (
    <section aria-labelledby="tese" className="bg-noite-900 py-24 text-white md:py-32">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.6fr] lg:gap-20">
        <h2 id="tese" className="max-w-[12ch] text-titulo font-semibold">Quinze anos do outro lado da mesa.</h2>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {principios.map((p) => (
            <div key={p.titulo} className="border-t border-ouro pt-6">
              <h3 className="text-xl font-semibold leading-snug tracking-tight">{p.titulo}</h3>
              <p className="mt-3 leading-relaxed text-noite-300">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Operacoes({ escolher }: { escolher: (perfil: Perfil, objetivo: string) => void }) {
  const coluna = (perfil: Perfil, titulo: string) => (
    <div>
      <h3 className="border-b border-tinta pb-4 text-2xl font-semibold" style={{ fontVariationSettings: '"wdth" 80' }}>{titulo}</h3>
      <ul>
        {operacoes[perfil].map((op) => (
          <li key={op.nome} className="border-b border-gelo-linha">
            <button type="button" onClick={() => escolher(perfil, op.nome)}
              className="group grid w-full grid-cols-[1fr_auto] items-start gap-4 py-5 text-left transition-colors hover:bg-white/60 md:py-6">
              <span>
                <span className="block text-lg font-semibold tracking-tight md:text-xl">{op.nome}</span>
                <span className="mt-1 block text-[15px] leading-relaxed text-tinta-suave">{op.texto}</span>
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-noite-700">
                <span className="hidden whitespace-nowrap sm:inline">Solicitar</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section id="operacoes" aria-labelledby="titulo-operacoes" className="bg-gelo py-24 md:py-32">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2 id="titulo-operacoes" className="max-w-[16ch] text-titulo font-semibold">Operações que eu estruturo</h2>
          <p className="max-w-sm text-tinta-suave">Escolha uma operação e a sua solicitação já começa com ela preenchida.</p>
        </div>
        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {coluna("Empresa", "Para empresas")}
          {coluna("Pessoa física", "Para você e seu patrimônio")}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  return (
    <section id="como-funciona" aria-labelledby="titulo-processo" className="py-24 md:py-32">
      <div className="container">
        <h2 id="titulo-processo" className="max-w-[18ch] text-titulo font-semibold">Do diagnóstico ao crédito liberado</h2>
        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {etapas.map((etapa, i) => (
            <li key={etapa.titulo} className="border-t border-ouro pt-6">
              <h3 className="text-2xl font-semibold tracking-tight">
                <span className="tabular mr-2 text-ouro-escuro">{i + 1}</span>
                {etapa.titulo}
              </h3>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-tinta-suave">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Helena() {
  return (
    <section id="helena" aria-labelledby="titulo-helena" className="bg-gelo">
      <div className="container grid gap-12 py-24 md:py-32 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-20">
        <figure className="w-full max-w-[320px] overflow-hidden">
          <img src="/img/helena.webp" alt="Helena Santos" width={788} height={786} loading="lazy"
            className="aspect-[4/5] w-full origin-top scale-[1.18] object-cover object-[50%_8%]" />
        </figure>
        <div>
          <h2 id="titulo-helena" className="text-titulo font-semibold">Helena Santos</h2>
          <p className="mt-2 text-lg text-tinta-suave">Personal Banker à frente da Meraktos Consultoria</p>
          <div className="mt-8 max-w-[60ch] space-y-5 text-lede text-tinta-suave">
            <p>
              Foram mais de 15 anos no mercado bancário atendendo pessoas e empresas. Hoje faço o caminho inverso: uso o
              que aprendi dentro do banco para defender o lado do cliente.
            </p>
            <p>
              Vou do diagnóstico à assinatura do contrato, e sigo junto depois dele. No mercado, me chamam de “Severina das
              Finanças”: faço um pouco de tudo, e faço tudo com alma.
            </p>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-2 border-t border-ouro">
            <div className="flex flex-col border-r border-tinta/15 py-6 pr-6">
              <dt className="text-sm text-tinta-suave">anos em bancos</dt>
              <dd className="tabular order-first text-4xl font-semibold tracking-tight text-ouro-escuro" style={{ fontVariationSettings: '"wdth" 80' }}>15+</dd>
            </div>
            <div className="flex flex-col py-6 pl-6">
              <dt className="text-sm text-tinta-suave">pessoas atendidas</dt>
              <dd className="tabular order-first text-4xl font-semibold tracking-tight text-ouro-escuro" style={{ fontVariationSettings: '"wdth" 80' }}>300+</dd>
            </div>
          </dl>
          <a href={`https://www.instagram.com/${HELENA_INSTAGRAM}/`} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-[15px] text-tinta-suave underline decoration-tinta/25 hover:text-tinta">
            <Instagram className="h-4 w-4" aria-hidden /> @{HELENA_INSTAGRAM}
          </a>
        </div>
      </div>
    </section>
  );
}

function Analise({ preselecao }: { preselecao: Preselecao | null }) {
  return (
    <section id="analise" aria-labelledby="titulo-analise" className="bg-noite-900 py-24 text-white md:py-32">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="titulo-analise" className="text-titulo font-semibold">Solicite sua análise</h2>
          <p className="mt-6 max-w-[44ch] text-lede text-noite-300">
            Conte o essencial da operação. A solicitação abre no meu WhatsApp já escrita, e eu retorno pessoalmente.
          </p>
          <ul className="mt-10 max-w-sm divide-y divide-white/15 border-y border-white/15 text-[15px] text-white/90">
            <li className="py-4">Análise inicial sem custo</li>
            <li className="py-4">Conversa direta com a Helena</li>
            <li className="py-4">Sem promessa de aprovação: a decisão é sempre da instituição</li>
          </ul>
          <a href={WHATSAPP_DIRETO} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-white/30 hover:decoration-ouro-claro">
            <IconeWhatsApp className="h-5 w-5" /> Prefiro conversar direto
          </a>
        </div>
        <Formulario preselecao={preselecao} />
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="bg-noite-950 py-14 text-noite-300">
      <div className="container flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <img src="/img/logo-horizontal.png" alt="Meraktos Consultoria" width={450} height={125} className="h-10 w-auto self-start" loading="lazy" />
        <ul className="flex flex-col gap-2 text-[15px] sm:flex-row sm:gap-8">
          <li>
            <a href={WHATSAPP_DIRETO} className="tabular inline-flex min-h-11 items-center gap-2 hover:text-white">
              <IconeWhatsApp className="h-4 w-4 text-noite-300" /> (11) 93299-0106
            </a>
          </li>
          <li>
            <a href={`https://www.instagram.com/${HELENA_INSTAGRAM}/`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-white">
              <Instagram className="h-4 w-4 text-noite-300" aria-hidden /> @{HELENA_INSTAGRAM}
            </a>
          </li>
        </ul>
      </div>
      <div className="container mt-10">
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-noite-300 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Meraktos Consultoria. Análise e aprovação de crédito sujeitas às políticas de cada instituição financeira.</p>
        <p>Foto de São Paulo: Maick Maciel / Unsplash</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [preselecao, setPreselecao] = useState<Preselecao | null>(null);

  function escolher(perfil: Perfil, objetivo: string) {
    setPreselecao((atual) => ({ perfil, objetivo, vez: (atual?.vez ?? 0) + 1 }));
    // No desktop a seção inteira cabe; em telas estreitas o formulário fica abaixo do texto.
    const largo = window.matchMedia("(min-width: 1024px)").matches;
    document.getElementById(largo ? "analise" : "formulario-analise")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <a href="#analise" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-noite-950">
        Ir para a solicitação de análise
      </a>
      <Cabecalho />
      <main>
        <Hero />
        <Tese />
        <Operacoes escolher={escolher} />
        <ComoFunciona />
        <Helena />
        <Analise preselecao={preselecao} />
      </main>
      <Rodape />
    </>
  );
}
