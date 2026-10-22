import { createFileRoute } from "@tanstack/react-router";
import { handleGenerate } from "@/lib/ai.server";

export const Route = createFileRoute("/api/generate")({
  staticData: { sitemap: false },
  server: { handlers: { POST: ({ request }) => handleGenerate(request) } },
});
