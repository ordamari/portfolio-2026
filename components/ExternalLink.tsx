import type { ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function ExternalLink({ href, className, children, onClick }: Props) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
