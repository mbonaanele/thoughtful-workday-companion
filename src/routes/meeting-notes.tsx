import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/meeting-notes")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace" },
      { name: "description", content: "Turn long meeting notes into a summary, action items, and deadlines." },
      { property: "og:title", content: "Meeting Notes Summarizer — AI Workplace" },
      { property: "og:description", content: "Summary, action items, and deadlines from your meeting notes." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="meeting"
      title="Meeting Notes Summarizer"
      description="Paste your notes to get a clear summary, action items, and deadlines."
      icon={<NotebookPen className="h-6 w-6" />}
      inputLabel="Meeting notes"
      placeholder="Paste your raw meeting notes or transcript here…"
      buttonLabel="Generate Summary"
    />
  ),
});
