import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { ChatPanel } from "@/components/ChatPanel";

export const Route = createFileRoute("/chat")({
  staticData: { sitemap: true },
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

function Chat() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 py-8 md:px-8">
      <BackLink />
      <header className="flex items-center gap-4">
        <div className="icon-chip h-12 w-12"><MessagesSquare className="h-6 w-6" /></div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">AI Chatbot</h1>
          <p className="mt-1 text-muted-foreground">Ask anything. Click any reply to edit it.</p>
        </div>
      </header>

      <section className="glass flex h-[60vh] min-h-96 flex-col overflow-hidden">
        <ChatPanel />
      </section>
    </div>
  );
}
