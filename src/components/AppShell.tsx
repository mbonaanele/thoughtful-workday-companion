import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Mail, NotebookPen, Search, CalendarCheck, Menu, X, Zap } from "lucide-react";

const nav = [
  { to: "/", label: "Smart Email Generator", icon: Mail },
  { to: "/meeting-notes", label: "Meeting Notes Summarizer", icon: NotebookPen },
  { to: "/research", label: "AI Research Assistant", icon: Search },
  { to: "/task-planner", label: "AI Task Planner", icon: CalendarCheck },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside className={`sidebar ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="rounded-lg bg-gradient-brand p-2 text-primary-foreground"><Zap className="h-5 w-5" /></div>
          <div className="leading-tight">
            <p className="font-display font-semibold">AI Workplace</p>
            <p className="text-xs text-muted-foreground">Productivity Assistant</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className={`nav-link ${active ? "nav-link-active" : ""}`}>
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <p className="mt-auto px-5 py-6 text-xs text-muted-foreground">Always review AI output before use.</p>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-background/70 md:hidden" onClick={() => setOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col md:pl-72">
        <header className="sticky top-0 z-20 flex items-center gap-3 bg-gradient-brand px-4 py-3 text-primary-foreground shadow-sm">
          <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="banner-btn md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="font-display font-semibold">AI Workplace</span>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
