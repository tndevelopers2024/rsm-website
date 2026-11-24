import clsx from "clsx";
import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  lead,
  light,
  center,
  className,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  light?: boolean;
  center?: boolean;
  className?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className={clsx("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", center && "md:flex-col md:items-center text-center", className)}>
      <div className={clsx("max-w-3xl", center && "mx-auto")}>
        <Reveal>
          <span className={clsx("eyebrow", light && "!text-sky")}>{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={clsx("h-section mt-5", light && "!text-white [&_em]:!text-sky")}>{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.16}>
            <p className={clsx("lead mt-6 max-w-2xl", light && "!text-white/75", center && "mx-auto")}>{lead}</p>
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={0.2}>{aside}</Reveal>}
    </div>
  );
}
