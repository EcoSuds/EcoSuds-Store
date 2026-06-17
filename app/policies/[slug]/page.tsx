import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getPolicies, getPolicy } from "@/lib/content";
import { makeMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getPolicies().map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return makeMetadata({ title: "Policy", description: "Website policy", path: "/" });
  return makeMetadata({ title: policy.seoTitle, description: policy.seoDescription, path: `/policies/${policy.slug}/` });
}

function markdownToHtml(markdown: string) {
  return markdown
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .split(/\n{2,}/)
    .map((block) => block.startsWith("<h") ? block : `<p>${block.replace(/\n/g, "<br />")}</p>`)
    .join("\n");
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return null;
  return (
    <section className="min-h-screen pt-[calc(var(--nav-h)+3.3rem)] md:pt-[calc(var(--nav-h)+4.5rem)]">
      <div className="narrow-page">
        <Link href="/" className="focus-ring pill mb-6"><ArrowLeft className="h-4 w-4" /> Back home</Link>
        <Reveal>
          <article className="surface rounded-[2.4rem] p-5 md:p-8">
            <div className="prose-lite" dangerouslySetInnerHTML={{ __html: markdownToHtml(policy.body) }} />
          </article>
        </Reveal>
      </div>
    </section>
  );
}
