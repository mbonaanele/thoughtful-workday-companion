import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/task-planner")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace" },
      { name: "description", content: "Turn your task list into a prioritized daily or weekly schedule." },
      { property: "og:title", content: "AI Task Planner — AI Workplace" },
      { property: "og:description", content: "Prioritized daily or weekly schedules from your task list." },
    ],
  }),
  component: () => (
    <ToolPage
      tool="planner"
      title="AI Task Planner"
      description="List your tasks and get a prioritized schedule for the day or week."
      icon={<CalendarCheck className="h-6 w-6" />}
      inputLabel="Your tasks"
      placeholder={"- Finish Q3 budget report (due Wed)\n- Prepare client presentation\n- Reply to vendor emails\n- 1:1 with team members"}
      buttonLabel="Generate Schedule"
      options={{ label: "Schedule type", values: ["Daily", "Weekly"], prefix: "Create a schedule for this period" }}
    />
  ),
});
