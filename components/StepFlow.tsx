import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/classes";

export type StepFlowItem = {
  title: string;
  description: string;
};

type StepFlowProps = {
  steps: StepFlowItem[];
};

export function StepFlow({ steps }: StepFlowProps) {
  const columnClass = steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-[color:var(--border)] md:block" />
      <div className={cn("grid items-stretch gap-4", columnClass)}>
        {steps.map((step, index) => (
          <article key={step.title} className="surface card-hover relative h-full rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--mint)] text-sm font-black text-[color:var(--sage-strong)] ring-1 ring-[color:var(--border)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <CheckCircle2 className="h-5 w-5 text-[color:var(--sage-strong)]" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[color:var(--text)]">
              {step.title}
            </h3>
            <p className="body-text mt-3">{step.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
