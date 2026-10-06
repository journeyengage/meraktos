import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  OBJETIVOS,
  PARCELAS,
  formatarCelular,
  linkWhatsApp,
  mensagemDoVisitante,
  validarPedido,
} from "../lib/lead.js";
import { IconeWhatsApp } from "./IconeWhatsApp";

type Campos = { nome: string; whatsapp: string; objetivo: string; parcela: string; mensagem: string; site: string };
type Erros = Partial<Record<"nome" | "whatsapp" | "objetivo" | "parcela", string>>;

const VAZIO: Campos = { nome: "", whatsapp: "", objetivo: "", parcela: "", mensagem: "", site: "" };
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

export function Formulario() {
  const [campos, setCampos] = useState<Campos>(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<"editando" | "enviando" | "pronto">("editando");
  const [destino, setDestino] = useState("");
  const inicio = useRef(Date.now());
  const form = useRef<HTMLFormElement>(null);

  function alterar(nome: keyof Campos, valor: string) {
    setCampos((atual) => ({ ...atual, [nome]: nome === "whatsapp" ? formatarCelular(valor) : valor }));
    if (erros[nome as keyof Erros]) setErros((atual) => ({ ...atual, [nome]: undefined }));
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
      <div className="rounded-3xl bg-paper p-6 text-ink sm:p-8" role="status" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-gold-700" aria-hidden />
        <h3 className="mt-4 text-2xl font-medium">Pedido pronto no WhatsApp</h3>
        <p className="mt-3 text-ink-soft">
          Abrimos a conversa com a Helena e o seu pedido já está escrito. É só tocar em enviar. Ela responde em até 24 horas.
        </p>
        <a href={destino} className="btn mt-6 w-full bg-navy-900 text-white hover:bg-navy-800 sm:w-auto">
          <IconeWhatsApp className="h-5 w-5" /> O WhatsApp não abriu? Toque aqui
        </a>
      </div>
    );
  }

  const enviando = estado === "enviando";
  const descricao = (campo: keyof Erros) => (erros[campo] ? `erro-${campo}` : undefined);

  return (
    <form ref={form} onSubmit={enviar} noValidate className="rounded-3xl bg-paper p-5 text-ink shadow-2xl shadow-black/30 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="nome" className="mb-1.5 block font-semibold">Seu nome</label>
          <input id="nome" name="nome" className="campo" autoComplete="name" value={campos.nome}
            onChange={(e) => alterar("nome", e.target.value)} aria-invalid={!!erros.nome} aria-describedby={descricao("nome")} />
          {erros.nome && <p id="erro-nome" className="mt-1.5 text-sm font-medium text-red-700">{erros.nome}</p>}
        </div>

        <div>
          <label htmlFor="whatsapp" className="mb-1.5 block font-semibold">Seu WhatsApp</label>
          <input id="whatsapp" name="whatsapp" className="campo" type="tel" inputMode="numeric" autoComplete="tel-national"
            placeholder="(11) 90000-0000" value={campos.whatsapp} onChange={(e) => alterar("whatsapp", e.target.value)}
            aria-invalid={!!erros.whatsapp} aria-describedby={descricao("whatsapp")} />
          {erros.whatsapp && <p id="erro-whatsapp" className="mt-1.5 text-sm font-medium text-red-700">{erros.whatsapp}</p>}
        </div>

        <fieldset aria-describedby={descricao("objetivo")}>
          <legend className="mb-2 font-semibold">O que você quer destravar?</legend>
          <div className="flex flex-wrap gap-2">
            {OBJETIVOS.map((objetivo) => (
              <label key={objetivo} className="cursor-pointer">
                <input type="radio" name="objetivo" value={objetivo} checked={campos.objetivo === objetivo}
                  onChange={(e) => alterar("objetivo", e.target.value)} className="peer sr-only" />
                <span className="inline-flex min-h-11 items-center rounded-full border border-ink/15 bg-white px-4 text-[15px] font-medium transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400 peer-focus-visible:ring-offset-2">
                  {objetivo}
                </span>
              </label>
            ))}
          </div>
          {erros.objetivo && <p id="erro-objetivo" className="mt-1.5 text-sm font-medium text-red-700">{erros.objetivo}</p>}
        </fieldset>

        <div>
          <label htmlFor="parcela" className="mb-1.5 block font-semibold">Quanto cabe por mês no seu bolso?</label>
          <select id="parcela" name="parcela" className="campo appearance-none bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-10"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2314202E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
            value={campos.parcela} onChange={(e) => alterar("parcela", e.target.value)}
            aria-invalid={!!erros.parcela} aria-describedby={descricao("parcela")}>
            <option value="" disabled>Escolha uma faixa</option>
            {PARCELAS.map((parcela) => <option key={parcela} value={parcela}>{parcela}</option>)}
          </select>
          {erros.parcela && <p id="erro-parcela" className="mt-1.5 text-sm font-medium text-red-700">{erros.parcela}</p>}
        </div>

        <div>
          <label htmlFor="mensagem" className="mb-1.5 block font-semibold">
            Conte um pouco do seu caso <span className="font-normal text-ink-soft">(opcional)</span>
          </label>
          <textarea id="mensagem" name="mensagem" rows={3} maxLength={600} className="campo resize-y"
            placeholder="Ex.: quero sair do aluguel e não sei se meu nome está limpo"
            value={campos.mensagem} onChange={(e) => alterar("mensagem", e.target.value)} />
        </div>

        {/* Campo-isca: pessoas não veem; robôs costumam preencher. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="site">Site</label>
          <input id="site" name="site" tabIndex={-1} autoComplete="off" value={campos.site} onChange={(e) => alterar("site", e.target.value)} />
        </div>

        <button type="submit" disabled={enviando} className="btn w-full bg-navy-900 text-white hover:bg-navy-800 disabled:opacity-80">
          {enviando ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <IconeWhatsApp className="h-5 w-5 text-gold-400" />}
          {enviando ? "Abrindo o WhatsApp…" : "Enviar pelo WhatsApp"}
          {!enviando && <ArrowRight className="h-5 w-5" aria-hidden />}
        </button>
        <p className="text-center text-sm text-ink-soft">
          Seu pedido abre no WhatsApp da Helena já escrito. Sem custo e sem compromisso.
        </p>
      </div>
    </form>
  );
}
