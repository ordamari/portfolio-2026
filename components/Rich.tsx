import type { RichPart } from "@/content/profile";

export function Rich({ parts }: { parts: readonly RichPart[] }) {
  return parts.map((part, index) =>
    typeof part === "string" ? (
      <span key={index}>{part}</span>
    ) : (
      <strong key={index}>{part.strong}</strong>
    ),
  );
}
