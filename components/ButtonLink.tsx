import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/classes";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: boolean;
};

function isExternalLink(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

function ButtonContent({ children, icon }: Pick<ButtonLinkProps, "children" | "icon">) {
  return (
    <>
      <span>{children}</span>
      {icon ? <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon = true
}: ButtonLinkProps) {
  const classes = cn("btn focus-ring", `btn-${variant}`, className);
  const content = <ButtonContent icon={icon}>{children}</ButtonContent>;

  if (isExternalLink(href)) {
    const opensNewTab = href.startsWith("http");

    return (
      <a
        className={classes}
        href={href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
