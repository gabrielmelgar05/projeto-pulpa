import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLElement> & { as?: "span" | "li"; variant?: "outline" | "solid" };

export function Badge({ as: Tag = "span", variant = "outline", className = "", ...props }: BadgeProps) {
  return <Tag {...props} className={`fragrance-badge fragrance-badge--${variant} ${className}`} />;
}
