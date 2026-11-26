import Image from "next/image";
import clsx from "clsx";

/** Official RSM logo (client-supplied). Shown on a white tile to preserve its original colours. */
export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center rounded-xl bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,.4)]", compact ? "px-2.5 py-1.5" : "px-3.5 py-2", className)}>
      <Image src="/brand/rsm-logo-full.png" alt="Rheumatology Society Mauritius" width={1855} height={460} priority className={compact ? "h-9 w-auto" : "h-11 w-auto md:h-12"} />
    </span>
  );
}
