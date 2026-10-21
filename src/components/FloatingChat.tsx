import { useState } from "react";
import { MessagesSquare, Sparkles, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";

export function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="glass fixed bottom-24 right-5 z-50 flex h-[560px] max-h-[calc(100vh-7.5rem)] w-[380px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-border bg-card/70 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="icon-chip h-8 w-8"><Sparkles className="h-4 w-4" /></span>
              <div>
                <p className="text-sm font-semibold leading-tight">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Ask anything about your work</p>
              </div>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)} className="btn-ghost h-8 w-8 justify-center p-0">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <ChatPanel compact />
          </div>
        </div>
      )}
      <button
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        onClick={() => setOpen((v) => !v)}
        className="btn-primary fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full p-0"
      >
        {open ? <X className="h-5 w-5" /> : <MessagesSquare className="h-5 w-5" />}
      </button>
    </>
  );
}
