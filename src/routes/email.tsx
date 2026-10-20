import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace" },
      { name: "description", content: "Generate professional emails in formal, friendly, or persuasive tones with AI." },
      { property: "og:title", content: "Smart Email Generator — AI Workplace" },
      { property: "og:description", content: "Generate professional emails in any tone with AI." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="email"
      title="Smart Email Generator"
      description="Describe what your email is about, pick a tone, and get a polished draft."
      icon={<Mail className="h-6 w-6" />}
      inputLabel="What is the email about?"
      placeholder="e.g. Ask my manager for Friday off next week to attend a family event; I'll hand over the client report on Thursday."
      buttonLabel="Generate Email"
      options={{ label: "Tone", values: ["Formal", "Friendly", "Persuasive"], prefix: "Tone" }}
    />
  ),
});
