import type { AnchorHTMLAttributes, ReactNode } from "react";

type InternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  to: string;
  navigate: (to: string) => void;
  children: ReactNode;
};

export function InternalLink({ to, navigate, children, ...props }: InternalLinkProps) {
  return (
    <a
      href={to}
      {...props}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
