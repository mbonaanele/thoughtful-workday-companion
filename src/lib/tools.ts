import { Mail, NotebookPen, Search, CalendarCheck, MessagesSquare } from "lucide-react";

export const TOOLS = [
  { to: "/email", title: "Smart Email Generator", description: "Describe your message, choose a tone, and get a polished, ready-to-send email in seconds.", icon: Mail },
  { to: "/meeting-notes", title: "Meeting Notes Summarizer", description: "Turn messy notes into a clear summary, action items, and deadlines.", icon: NotebookPen },
  { to: "/task-planner", title: "AI Task Planner", description: "Convert your to-do list into a prioritized daily or weekly schedule.", icon: CalendarCheck },
  { to: "/research", title: "AI Research Assistant", description: "Get key insights and recommendations on any topic or article.", icon: Search },
  { to: "/chat", title: "AI Chatbot", description: "Ask anything about your work and brainstorm with a helpful assistant.", icon: MessagesSquare },
] as const;
