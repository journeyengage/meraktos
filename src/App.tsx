import { Briefcase, Car, Compass, Home, Instagram, RefreshCcw } from "lucide-react";
import { HELENA_INSTAGRAM, linkWhatsApp } from "../lib/lead.js";
import { Formulario } from "./Formulario";
import { IconeWhatsApp } from "./IconeWhatsApp";

const WHATSAPP_DIRETO = linkWhatsApp("Olá, Helena! Vim pelo site e quero conversar sobre crédito.");

const destravar = [
  { icone: Home, titulo: "Casa própria", texto: "Sair do aluguel com aprovação facilitada e a melhor taxa que o seu perfil alcança." },
  { icone: Car, titulo: "Veículo", texto: "Financiar ou refinanciar o carro com segurança e sem juros abusivos." },
  { icone: RefreshCcw, titulo: "Dívidas", texto: "Renegociar com os bancos, limpar o nome e voltar a respirar." },
  { icone: Briefcase, titulo: "Empresa e MEI", texto: "Capital de giro e linhas que você nem sabia que existiam para o seu negócio." },
  { icone: Compass, titulo: "Clareza", texto: "Entender a sua situação financeira de verdade, sem enrolação." },
];

const servicosPF = [
  "Crédito imobiliário e consórcio",
  "Financiamento de veículos",
  "Refinanciamento de veículos",
  "Empréstimo consignado",
  "Empréstimos pessoais",
  "Renegociação de dívidas",
  "Planejamento financeiro simples",
];

const servicosPJ = [
  "Capital de giro",
  "Crédito com garantia de imóvel",
  "Auto Equity (garantia em veículo)",
  "Desconto de recebíveis",
  "Linhas BNDES, FGI e FINAME",
  "Renegociação com bancos",
  "Consórcios e seguros empresariais",
  "Consultoria financeira para MEI",
];

const etapas = [
  { titulo: "Análise gratuita", texto: "Você conta seu plano ou desafio. Eu avalio as possibilidades reais." },
  { titulo: "Plano sob medida", texto: "Uma estratégia clara, viável e que cabe no seu bolso." },
  { titulo: "Ação com orientação", texto: "Você executa com confiança, sabendo o que cada banco vai pedir." },
  { titulo: "Acompanhamento", texto: "Eu sigo com você até a chave, o carro ou o crédito na mão." },
];

const depoimentos = [
  { texto: "Achei que nunca sairia do aluguel. A Helena montou um plano comigo, buscou taxas melhores e em 6 meses eu estava com a chave na mão!", autor: "Luciana F.", meta: "Casa própria" },
  { texto: "Depois de 5 anos tentando, finalmente consegui comprar meu carro com um financiamento justo e dentro das minhas possibilidades.", autor: "Carlos M.", meta: "Veículo" },
  { texto: "Eu estava afogada em dívidas e sem esperança. A orientação da Helena me ajudou a renegociar tudo e hoje estou respirando novamente.", autor: "Mariana S.", meta: "Renegociação" },
  { texto: "Como MEI, eu não conseguia crédito em lugar nenhum. A Helena encontrou soluções que nem sabia que existiam para o meu negócio.", autor: "Pedro A.", meta: "Crédito MEI" },
];

function Cabecalho() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#inicio" aria-label="Meraktos Consultoria, início">
          <img src="/img/logo-horizontal.png" alt="Meraktos Consultoria" width={450} height={125} className="h-9 w-auto md:h-11" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 text-[15px] font-medium text-white/80 lg:flex">
          <a href="#solucoes" className="hover:text-gold-300">Soluções</a>
          <a href="#como-funciona" className="hover:text-gold-300">Como funciona</a>
          <a href="#helena" className="hover:text-gold-300">Quem é a Helena</a>
          <a href="#depoimentos" className="hover:text-gold-300">Depoimentos</a>
        </nav>
        <a href="#analise" className="btn-gold min-h-11 px-5 text-[15px]">Análise gratuita</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-gold-500/15 blur-3xl" />
      <div className="container relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="eyebrow text-gold-400">Crédito com Helena</p>
          <h1 className="mt-5 text-[2.6rem] font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
            Crédito como estratégia, <em className="font-normal text-gold-300">não como dívida.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Foram mais de 15 anos dentro dos bancos. Hoje eu fico do seu lado, como gerente exclusiva: casa, carro,
            empresa ou dívida, eu mostro o caminho com clareza.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#analise" className="btn-gold">Quero minha análise gratuita</a>
            <a href={WHATSAPP_DIRETO} className="btn-ghost">
              <IconeWhatsApp className="h-5 w-5" /> Chamar no WhatsApp
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-white/15 pt-8">
            <div>
              <dt className="text-sm text-white/60">dentro dos bancos</dt>
              <dd className="order-first font-display text-4xl text-gold-300">+15 anos</dd>
            </div>
            <div>
              <dt className="text-sm text-white/60">pessoas atendidas</dt>
              <dd className="order-first font-display text-4xl text-gold-300">+300</dd>
            </div>
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="overflow-hidden rounded-t-full border border-gold-500/50 p-2">
            <img src="/img/helena.jpg" alt="Helena Santos, consultora de crédito da Meraktos" width={788} height={786}
              className="aspect-[4/5] w-full rounded-t-full object-cover object-top" fetchPriority="high" />
          </div>
          <p className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full bg-paper px-5 py-2 text-sm font-semibold text-navy-900 shadow-lg">
            Helena Santos · Personal Banker
          </p>
        </div>
      </div>
    </section>
  );
}

function Destravar() {
  return (
    <section id="solucoes" className="py-20 md:py-28">
      <div className="container">
        <p className="eyebrow text-gold-700">O que dá para destravar</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight md:text-5xl">Cada sonho tem um caminho de crédito certo.</h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {destravar.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="bg-paper p-6 lg:p-7">
              <Icone className="h-7 w-7 text-gold-700" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-5 text-2xl font-medium">{titulo}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Servicos() {
  const coluna = (titulo: string, sigla: string, itens: string[]) => (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
      <p className="eyebrow text-gold-700">{sigla}</p>
      <h3 className="mt-2 text-3xl font-medium">{titulo}</h3>
      <ul className="mt-6 divide-y divide-ink/10">
        {itens.map((item) => (
          <li key={item} className="flex items-baseline gap-3 py-3">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-gold-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="bg-paper-alt py-20 md:py-28">
      <div className="container">
        <h2 className="max-w-2xl text-4xl font-medium leading-tight md:text-5xl">Soluções sob medida, para você e para a sua empresa.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {coluna("Para você", "Pessoa física", servicosPF)}
          {coluna("Para a sua empresa", "Pessoa jurídica", servicosPJ)}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="container">
        <p className="eyebrow text-gold-700">Como funciona</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight md:text-5xl">Do primeiro “oi” até a conquista.</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {etapas.map((etapa, i) => (
            <li key={etapa.titulo} className="border-t-2 border-navy-900 pt-6">
              <span className="font-display text-5xl text-gold-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl font-medium">{etapa.titulo}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Helena() {
  return (
    <section id="helena" className="bg-navy-950 py-20 text-white md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <img src="/img/logo-vertical.png" alt="" width={747} height={447} className="mx-auto w-56 opacity-90 md:w-72" loading="lazy" />
        <div>
          <p className="eyebrow text-gold-400">Quem está por trás da Meraktos</p>
          <blockquote className="mt-5 font-display text-3xl leading-snug md:text-4xl">
            “Pode me chamar de <span className="text-gold-300">Severina das Finanças</span>: faço um pouco de tudo, mas faço tudo com alma.”
          </blockquote>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-white/80">
            <p>
              Sou a <strong className="text-white">Helena Santos</strong>, consultora com mais de 15 anos de mercado bancário. Como
              Personal Banker, ajudo pessoas e empresas a reorganizar a vida financeira e a conseguir o crédito certo.
            </p>
            <p>Vou desde limpar o nome até a assinatura do contrato do seu primeiro imóvel, sempre do seu lado da mesa.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  return (
    <section id="depoimentos" className="py-20 md:py-28">
      <div className="container">
        <p className="eyebrow text-gold-700">Depoimentos</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight md:text-5xl">Quem confiou, conquistou.</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {depoimentos.map((d) => (
            <li key={d.autor} className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5">
              <p className="font-display text-xl leading-relaxed">“{d.texto}”</p>
              <p className="mt-6 text-[15px] text-ink-soft">
                <strong className="font-semibold text-ink">{d.autor}</strong> · {d.meta} · São Paulo/SP
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Analise() {
  return (
    <section id="analise" className="relative overflow-hidden bg-navy-900 py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-40 h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow text-gold-400">Análise gratuita</p>
          <h2 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">Vamos dar o primeiro passo?</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
            Responda quatro perguntas e o seu pedido abre direto no meu WhatsApp. Sem custo, sem enrolação: só verdade e
            experiência.
          </p>
          <ul className="mt-8 space-y-3 text-white/85">
            <li className="flex gap-3"><span className="text-gold-400">—</span> Resposta em até 24 horas</li>
            <li className="flex gap-3"><span className="text-gold-400">—</span> Conversa direta com a Helena, sem robô no meio</li>
            <li className="flex gap-3"><span className="text-gold-400">—</span> Você só segue se fizer sentido para você</li>
          </ul>
        </div>
        <Formulario />
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="bg-navy-950 pb-28 pt-14 text-white/70 md:pb-14">
      <div className="container flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <img src="/img/logo-horizontal.png" alt="Meraktos Consultoria" width={450} height={125} className="h-10 w-auto" loading="lazy" />
          <p className="mt-4 max-w-xs">Transformando sonhos em realidade financeira.</p>
        </div>
        <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <li>
            <a href={WHATSAPP_DIRETO} className="inline-flex min-h-11 items-center gap-2 hover:text-gold-300">
              <IconeWhatsApp className="h-5 w-5 text-gold-400" /> (11) 93299-0106
            </a>
          </li>
          <li>
            <a href={`https://www.instagram.com/${HELENA_INSTAGRAM}/`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-gold-300">
              <Instagram className="h-5 w-5 text-gold-400" aria-hidden /> @{HELENA_INSTAGRAM}
            </a>
          </li>
        </ul>
      </div>
      <p className="container mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
        © {new Date().getFullYear()} Meraktos Consultoria. Análise de crédito sujeita às condições de cada instituição.
      </p>
    </footer>
  );
}

function BotaoFlutuante() {
  return (
    <a href={WHATSAPP_DIRETO} aria-label="Falar com a Helena no WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-navy-950 shadow-xl shadow-black/30 transition-transform hover:scale-105 md:bottom-6 md:right-6">
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  );
}

export default function App() {
  return (
    <>
      <a href="#analise" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-navy-950">
        Ir para a análise gratuita
      </a>
      <Cabecalho />
      <main>
        <Hero />
        <Destravar />
        <Servicos />
        <ComoFunciona />
        <Helena />
        <Depoimentos />
        <Analise />
      </main>
      <Rodape />
      <BotaoFlutuante />
    </>
  );
}
