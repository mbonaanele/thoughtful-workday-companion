import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Bell, Flower2, ShieldCheck } from "lucide-react";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-card/75 backdrop-blur-xl">
            <div className="flex h-16 w-full items-center justify-between px-5 md:px-8">
              <div className="flex items-center gap-2">
                <SidebarTrigger aria-label="Toggle sidebar" className="btn-ghost h-9 w-9 justify-center p-0" />
                <Link to="/" className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-soft">
                    <Flower2 className="h-5 w-5" />
                  </span>
                  <span className="text-[15px] font-semibold tracking-tight">
                    AI Workplace <span className="hidden font-normal text-muted-foreground sm:inline">Assistant</span>
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <button aria-label="Notifications" className="btn-ghost h-9 w-9 justify-center p-0">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pl-1 pr-3 shadow-soft">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-xs font-semibold text-primary-foreground">A</span>
                  <span className="hidden text-sm font-medium sm:inline">Anele</span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/70 bg-card/60">
            <div className="mx-auto flex max-w-7xl items-start gap-3 px-5 py-5 text-xs text-muted-foreground md:px-8">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p>
                <span className="font-semibold text-foreground">Responsible AI Disclaimer:</span> AI-generated content may be
                inaccurate, incomplete, or biased. Please review carefully and verify important facts before use. Avoid
                entering confidential or personal information.
              </p>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
