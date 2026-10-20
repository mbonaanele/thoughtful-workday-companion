import { useState, type ReactNode } from "react";
import { Copy, Loader2, Wand2, Check, ShieldCheck } from "lucide-react";
import { BackLink } from "./BackLink";

type Props = {
  tool: string;
  title: string;
  description: string;
  icon: ReactNode;
  inputLabel: string;
  placeholder: string;
  buttonLabel: string;
  options?: { label: string; values: string[]; prefix: string };
};

export function ToolPage({ tool, title, description, icon, inputLabel, placeholder, buttonLabel, options }: Props) {
  const [input, setInput] = useState("");
  const [option, setOption] = useState(options?.values[0] ?? "");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, input, option: options ? `${options.prefix}: ${option}` : undefined }),
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        throw new Error(
          res.status === 429
            ? "Too many requests — please wait a moment and try again."
            : res.status === 402
              ? "AI credits have run out. Please add credits to continue."
              : msg || "Something went wrong. Please try again.",
        );
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setOutput(text);
      }
      if (!text.trim()) throw new Error("The AI returned no content. Please try different input.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 md:px-8">
      <BackLink />
      <header className="flex items-center gap-4">
        <div className="icon-chip h-12 w-12">{icon}</div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Input</p>
          <label className="text-sm font-medium" htmlFor="input">{inputLabel}</label>
          <textarea id="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} className="field min-h-72 flex-1" />
          {options && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="opt">{options.label}</label>
              <select id="opt" value={option} onChange={(e) => setOption(e.target.value)} className="field">
                {options.values.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          )}
          <button onClick={generate} disabled={loading || !input.trim()} className="btn-primary">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {loading ? "Generating…" : buttonLabel}
          </button>
          {error && <p className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        </section>

        <section className="panel">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Output <span className="font-normal normal-case tracking-normal text-muted-foreground">— editable</span></p>
            <button
              onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
              disabled={!output}
              className="btn-ghost"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            id="output"
            aria-label="Output"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Your AI-generated result will appear here. You can edit it freely."
            className="field min-h-96 flex-1 text-sm leading-relaxed"
          />
        </section>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" /> AI-generated content may be inaccurate. Please review carefully before use.
      </p>
    </div>
  );
}
