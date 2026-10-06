import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  OBJETIVOS,
  PERFIS,
  VALORES,
  formatarCelular,
  linkWhatsApp,
  mensagemDoVisitante,
  validarPedido,
} from "../lib/lead.js";
import { IconeWhatsApp } from "./IconeWhatsApp";

type Perfil = keyof typeof OBJETIVOS;
type Campos = { nome: string; whatsapp: string; perfil: string; empresa: string; objetivo: string; valor: string; mensagem: string; site: string };
type CampoComErro = "nome" | "whatsapp" | "perfil" | "objetivo" | "valor";
type Erros = Partial<Record<CampoComErro, string>>;
export type Preselecao = { perfil: Perfil; objetivo: string; vez: number };

const VAZIO: Campos = { nome: "", whatsapp: "", perfil: "", empresa: "", objetivo: "", valor: "", mensagem: "", site: "" };
const ESPERA_AVISO_MS = 2500;

// Avisa a Helena pela Iris sem segurar o visitante: se a função demorar ou falhar,
// o WhatsApp abre do mesmo jeito, porque o pedido também vai escrito na conversa.
async function avisarHelena(corpo: object) {
  try {
    await Promise.race([
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
        keepalive: true,
      }),
      new Promise((resolve) => setTimeout(resolve, ESPERA_AVISO_MS)),
    ]);
  } catch {
    // O pedido segue pelo WhatsApp do visitante.
  }
}

function Erro({ campo, erros }: { campo: CampoComErro; erros: Erros }) {
  if (!erros[campo]) return null;
  return <p id={`erro-${campo}`} className="mt-2 text-sm font-medium text-red-700">{erros[campo]}</p>;
}

function Opcao({ nome, valor, marcado, aoMarcar, children }: { nome: string; valor: string; marcado: boolean; aoMarcar: (v: string) => void; children: string }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={nome} value={valor} checked={marcado} onChange={(e) => aoMarcar(e.target.value)} className="peer sr-only" />
      <span className="flex min-h-12 items-center justify-between gap-3 border border-tinta/15 px-4 py-3 text-[15px] transition-colors hover:border-noite-700 peer-checked:border-noite-900 peer-checked:bg-noite-900 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-noite-900">
        {children}
        <Check className={`h-4 w-4 shrink-0 text-ouro-claro ${marcado ? "opacity-100" : "opacity-0"}`} aria-hidden />
      </span>
    </label>
  );
}

export function Formulario({ preselecao }: { preselecao: Preselecao | null }) {
  const [campos, setCampos] = useState<Campos>(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<"editando" | "enviando" | "pronto">("editando");
  const [destino, setDestino] = useState("");
  const [realce, setRealce] = useState(0);
  const inicio = useRef(Date.now());
  const form = useRef<HTMLFormElement>(null);

  // Clique numa operação da página: o formulário já chega com perfil e operação escolhidos.
  useEffect(() => {
    if (!preselecao) return;
    setCampos((atual) => ({ ...atual, perfil: preselecao.perfil, objetivo: preselecao.objetivo }));
    setErros((atual) => ({ ...atual, perfil: undefined, objetivo: undefined }));
    setRealce(preselecao.vez);
  }, [preselecao]);

  function alterar(nome: keyof Campos, valor: string) {
    setCampos((atual) => {
      const novo = { ...atual, [nome]: nome === "whatsapp" ? formatarCelular(valor) : valor };
      if (nome === "perfil" && valor !== atual.perfil) novo.objetivo = "";
      return novo;
    });
    if (nome in erros) setErros((atual) => ({ ...atual, [nome]: undefined }));
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    const resultado = validarPedido(campos);
    if (!resultado.ok) {
      setErros(resultado.erros);
      const primeiro = Object.keys(resultado.erros)[0];
      form.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    const url = linkWhatsApp(mensagemDoVisitante(resultado.pedido));
    setDestino(url);
    setEstado("enviando");
    await avisarHelena({ ...campos, tempoMs: Date.now() - inicio.current });
    setEstado("pronto");
    window.location.assign(url);
  }

  if (estado === "pronto") {
    return (
      <div className="bg-white p-6 text-tinta sm:p-10" role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center bg-noite-900 text-ouro-claro">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-6 text-3xl font-semibold tracking-tight">Solicitação pronta no WhatsApp</h3>
        <p className="mt-3 max-w-md text-tinta-suave">
          Abrimos a conversa com a Helena e o seu pedido já está escrito. Toque em enviar para começar a análise.
        </p>
        <a href={destino} className="btn-noite mt-8 w-full sm:w-auto">
          <IconeWhatsApp className="h-5 w-5 text-ouro-claro" /> Abrir o WhatsApp de novo
        </a>
      </div>
    );
  }

  const enviando = estado === "enviando";
  const descricao = (campo: CampoComErro) => (erros[campo] ? `erro-${campo}` : undefined);
  const perfil = campos.perfil as Perfil | "";
  const operacoes = perfil ? OBJETIVOS[perfil] : [];

  return (
    <form id="formulario-analise" ref={form} onSubmit={enviar} noValidate className="relative bg-white p-5 text-tinta sm:p-10">
      <div className="grid gap-9">
        <fieldset aria-describedby={descricao("perfil")}>
          <legend className="rotulo mb-3">O crédito é para</legend>
          <div className="grid grid-cols-2 gap-2">
            {PERFIS.map((p) => (
              <Opcao key={p} nome="perfil" valor={p} marcado={campos.perfil === p} aoMarcar={(v) => alterar("perfil", v)}>{p}</Opcao>
            ))}
          </div>
          <Erro campo="perfil" erros={erros} />
        </fieldset>

        <div key={realce} className={realce ? "-m-2 animate-realce p-2" : undefined}>
          <label htmlFor="objetivo" className="rotulo">Operação</label>
          <select id="objetivo" name="objetivo" disabled={!perfil}
            className="campo cursor-pointer appearance-none bg-[length:18px] bg-[right_0.25rem_center] bg-no-repeat pr-8 disabled:cursor-not-allowed disabled:text-tinta-suave/60"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230A1628' stroke-width='1.6'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
            value={campos.objetivo} onChange={(e) => alterar("objetivo", e.target.value)}
            aria-invalid={!!erros.objetivo} aria-describedby={descricao("objetivo")}>
            <option value="" disabled>{perfil ? "Escolha a operação" : "Primeiro, escolha o perfil"}</option>
            {operacoes.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <Erro campo="objetivo" erros={erros} />
        </div>

        <fieldset aria-describedby={descricao("valor")}>
          <legend className="rotulo mb-3">Valor aproximado</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {VALORES.map((v) => (
              <Opcao key={v} nome="valor" valor={v} marcado={campos.valor === v} aoMarcar={(x) => alterar("valor", x)}>{v}</Opcao>
            ))}
          </div>
          <Erro campo="valor" erros={erros} />
        </fieldset>

        <div className="grid gap-9 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="nome" className="rotulo">Seu nome</label>
            <input id="nome" name="nome" className="campo" autoComplete="name" value={campos.nome}
              onChange={(e) => alterar("nome", e.target.value)} aria-invalid={!!erros.nome} aria-describedby={descricao("nome")} />
            <Erro campo="nome" erros={erros} />
          </div>
          <div>
            <label htmlFor="whatsapp" className="rotulo">WhatsApp</label>
            <input id="whatsapp" name="whatsapp" className="campo tabular" type="tel" inputMode="numeric" autoComplete="tel-national"
              placeholder="(11) 90000-0000" value={campos.whatsapp} onChange={(e) => alterar("whatsapp", e.target.value)}
              aria-invalid={!!erros.whatsapp} aria-describedby={descricao("whatsapp")} />
            <Erro campo="whatsapp" erros={erros} />
          </div>
        </div>

        {perfil === "Empresa" && (
          <div>
            <label htmlFor="empresa" className="rotulo">Empresa <span className="font-normal normal-case tracking-normal">(opcional)</span></label>
            <input id="empresa" name="empresa" className="campo" autoComplete="organization" maxLength={80}
              value={campos.empresa} onChange={(e) => alterar("empresa", e.target.value)} />
          </div>
        )}

        <div>
          <label htmlFor="mensagem" className="rotulo">Contexto da operação <span className="font-normal normal-case tracking-normal">(opcional)</span></label>
          <textarea id="mensagem" name="mensagem" rows={2} maxLength={600} className="campo resize-y"
            placeholder="Ex.: expansão da fábrica, prazo de 60 meses, imóvel livre como garantia"
            value={campos.mensagem} onChange={(e) => alterar("mensagem", e.target.value)} />
        </div>

        {/* Campo-isca: pessoas não veem; robôs costumam preencher. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="site">Site</label>
          <input id="site" name="site" tabIndex={-1} autoComplete="off" value={campos.site} onChange={(e) => alterar("site", e.target.value)} />
        </div>

        <div>
          <button type="submit" disabled={enviando} className="btn-noite w-full disabled:cursor-wait disabled:opacity-80">
            {enviando ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <IconeWhatsApp className="h-5 w-5 text-ouro-claro" />}
            <span>{enviando ? "Abrindo o WhatsApp…" : <>Enviar<span className="hidden sm:inline"> solicitação</span> pelo WhatsApp</>}</span>
            {!enviando && <ArrowRight className="h-5 w-5" aria-hidden />}
          </button>
          <p className="mt-4 text-sm text-tinta-suave">
            A solicitação abre no WhatsApp da Helena já escrita. A análise inicial não tem custo.
          </p>
        </div>
      </div>
    </form>
  );
}
