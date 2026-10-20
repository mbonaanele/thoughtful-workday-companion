import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const PROMPTS: Record<string, string> = {
  email:
    "You are an expert business writer. Write a complete, ready-to-send email (Subject line first, then body with greeting and sign-off) based on the user's description. Match the requested tone exactly. Output plain text only, no markdown symbols.",
  meeting:
    "You summarize meeting notes. Output plain text with exactly three clearly labelled sections, each heading in UPPERCASE on its own line:\nSUMMARY\n(a concise paragraph)\n\nACTION ITEMS\n- item (owner if known)\n\nDEADLINES\n- deadline: task\nIf no deadlines are mentioned, write '- None specified'. No markdown bold or # headers.",
  research:
    "You are a research analyst. Given an article or topic, output plain text with three UPPERCASE section headings on their own lines:\nSUMMARY\n(a clear paragraph)\n\nKEY INSIGHTS\n- insight\n\nRECOMMENDATIONS\n- recommendation\nNo markdown bold or # headers.",
  planner:
    "You are a productivity coach. Given a task list, produce a prioritized schedule for the requested period (daily or weekly). Start with a PRIORITIES section ranking tasks (High/Medium/Low with a short reason), then a SCHEDULE section with time blocks (daily) or day-by-day plan (weekly), then a short TIPS section. UPPERCASE headings on their own lines, plain text, no markdown bold or # headers.",
};

export async function handleChat(request: Request) {
  const { messages } = (await request.json()) as { messages: { role: "user" | "assistant"; content: string }[] };
  if (!Array.isArray(messages) || !messages.length) return new Response("Invalid request", { status: 400 });
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return new Response("AI is not configured.", { status: 500 });
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions:
      "You are a friendly, concise workplace productivity assistant. Answer clearly in plain text; use short paragraphs and simple '-' bullet lists, no markdown bold or # headers.",
    messages: messages.slice(-30).map((m) => ({ role: m.role, content: String(m.content) })),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return result.toTextStreamResponse();
}

export async function handleGenerate(request: Request) {
  const { tool, input, option } = (await request.json()) as { tool: string; input: string; option?: string };
  const system = PROMPTS[tool];
  if (!system || !input?.trim()) return new Response("Invalid request", { status: 400 });
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return new Response("AI is not configured.", { status: 500 });

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const userText = option ? `${option}\n\n${input}` : input;
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    instructions: system,
    messages: [{ role: "user", content: userText }],
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return result.toTextStreamResponse();
}
