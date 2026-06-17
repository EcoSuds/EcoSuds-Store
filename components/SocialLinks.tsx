import { FaEnvelope, FaFacebookF, FaGithub, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { SiteData } from "@/lib/types";

const iconMap: Record<string, IconType> = {
  Email: FaEnvelope,
  WhatsApp: FaWhatsapp,
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  YouTube: FaYoutube,
  GitHub: FaGithub
};

type SocialItem = { label: string; href: string };

function isSocialItem(item: { label: string; href?: string }): item is SocialItem {
  return Boolean(item.href && item.href !== "https://github.com/");
}

export function getSocials(site: SiteData): SocialItem[] {
  return [
    { label: "Email", href: `mailto:${site.brand.email}` },
    { label: "WhatsApp", href: site.brand.whatsapp },
    { label: "Instagram", href: site.brand.instagram },
    { label: "Facebook", href: site.brand.facebook },
    { label: "YouTube", href: site.brand.youtube },
    ...(site.brand.github ? [{ label: "GitHub", href: site.brand.github }] : [])
  ].filter(isSocialItem);
}

export function SocialLinks({ site, compact = false }: { site: SiteData; compact?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Social links">
      {getSocials(site).map((social) => {
        const Icon = iconMap[social.label] || FaEnvelope;
        const isExternal = social.href.startsWith("http");
        return (
          <a
            key={social.label}
            href={social.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className={compact ? "focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--text)] transition hover:-translate-y-1 hover:border-[color:var(--sage)]" : "focus-ring pill hover:border-[color:var(--sage)] hover:text-[color:var(--text)]"}
            aria-label={social.label}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {compact ? null : <span>{social.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
