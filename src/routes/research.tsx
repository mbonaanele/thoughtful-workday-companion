import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/research")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace" },
      { name: "description", content: "Summarize articles or topics with key insights and recommendations." },
      { property: "og:title", content: "AI Research Assistant — AI Workplace" },
      { property: "og:description", content: "Key insights and recommendations from any article or topic." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="research"
      title="AI Research Assistant"
      description="Paste an article or enter a topic to get a summary, key insights, and recommendations."
      icon={<Search className="h-6 w-6" />}
      inputLabel="Article or topic"
      placeholder="Paste an article, or type a topic like 'Benefits of a 4-day work week'…"
      buttonLabel="Generate Insights"
    />
  ),
});
