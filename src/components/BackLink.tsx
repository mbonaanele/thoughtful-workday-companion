import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <Link to="/" className="btn-ghost -ml-3 w-fit">
      <ArrowLeft className="h-4 w-4" /> Back to Dashboard
    </Link>
  );
}
