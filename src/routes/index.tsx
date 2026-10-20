import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flower2 } from "lucide-react";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      { name: "description", content: "Your AI workspace: emails, meeting notes, task planning, research, and chat in one dashboard." },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Five AI tools to automate your everyday workplace tasks." },
    ],
  }),
  component: Dashboard,
});

const heights = ["lg:min-h-64", "lg:min-h-56", "lg:min-h-60", "lg:min-h-52", "lg:min-h-64"];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-card bg-gradient-banner p-8 shadow-soft md:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="absolute -bottom-20 right-40 h-52 w-52 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-xs font-medium text-accent-foreground">
            <Flower2 className="h-3.5 w-3.5" /> Your AI workspace
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Welcome back, Anele</h1>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Write emails, summarize meetings, plan your week, and research faster — all in one place.
          </p>
        </div>
      </section>

      <h2 className="mb-4 mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Your tools</h2>
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {TOOLS.map((t, i) => (
          <article key={t.to} className={`glass group mb-5 flex break-inside-avoid flex-col gap-4 p-6 transition hover:-translate-y-1 ${heights[i]}`}>
            <div className="icon-chip h-12 w-12 transition group-hover:bg-gradient-brand group-hover:text-primary-foreground">
              <t.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
            </div>
            <Link to={t.to} className="btn-primary w-fit">
              Launch Tool <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
