import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2, MessagesSquare, RotateCcw } from "lucide-react";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Workplace" },
      { name: "description", content: "Chat with an AI assistant about your work, ideas, and questions." },
      { property: "og:title", content: "AI Chatbot — AI Workplace" },
      { property: "og:description", content: "A clean, modern AI chat for workplace questions." },
    ],
  }),
  component: Chat,
});

type Msg = { role: "user" | "assistant"; content: string };

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        throw new Error(res.status === 429 ? "Too many requests — please wait a moment." : res.status === 402 ? "AI credits have run out." : msg || "Something went wrong.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch (e) {
      setMessages(next);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const edit = (i: number, content: string) => setMessages((m) => m.map((x, j) => (j === i ? { ...x, content } : x)));

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 py-8 md:px-8">
      <BackLink />
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="icon-chip h-12 w-12"><MessagesSquare className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">AI Chatbot</h1>
            <p className="mt-1 text-muted-foreground">Ask anything. Click any reply to edit it.</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button onClick={() => { setMessages([]); setError(""); }} className="btn-ghost"><RotateCcw className="h-4 w-4" /> New chat</button>
        )}
      </header>

      <section className="glass flex h-[60vh] min-h-96 flex-col">
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
              <MessagesSquare className="h-8 w-8 text-primary" />
              <p className="font-medium text-foreground">How can I help you today?</p>
              <p className="text-sm">Try “Draft an agenda for a 30-minute project kickoff.”</p>
            </div>
          )}
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-gradient-brand px-4 py-2.5 text-sm text-primary-foreground shadow-soft">{m.content}</p>
              </div>
            ) : (
              <div key={i} className="flex gap-3">
                <span className="icon-chip mt-0.5 h-8 w-8 shrink-0"><MessagesSquare className="h-4 w-4" /></span>
                {m.content ? (
                  <textarea
                    aria-label="Assistant reply"
                    value={m.content}
                    onChange={(e) => edit(i, e.target.value)}
                    rows={Math.min(20, m.content.split("\n").length + 1)}
                    className="w-full resize-none rounded-xl border border-transparent bg-transparent p-1 text-sm leading-relaxed outline-none transition hover:border-border focus:border-ring"
                  />
                ) : (
                  <Loader2 className="mt-2 h-4 w-4 animate-spin text-primary" />
                )}
              </div>
            ),
          )}
          <div ref={endRef} />
        </div>
        {error && <p className="mx-6 mb-3 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="border-t border-border p-4">
          <div className="flex items-end gap-2 rounded-2xl border border-input bg-card p-2 focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/15">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Message the assistant…"
              rows={1}
              className="max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" aria-label="Send" disabled={loading || !input.trim()} className="btn-primary h-10 w-10 shrink-0 p-0">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
