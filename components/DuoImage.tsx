import Image from "next/image";
import clsx from "clsx";
import { img, type ImgKey } from "@/lib/images";
import { PlaceholderArt } from "./PlaceholderArt";

const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

type Tone = "navy" | "teal" | "ocean" | "gold" | "none";

export function DuoImage({
  name,
  alt = "",
  tone = "navy",
  className,
  priority,
  sizes = "100vw",
  imgClassName,
}: {
  name: ImgKey;
  alt?: string;
  tone?: Tone;
  className?: string;
  priority?: boolean;
  sizes?: string;
  imgClassName?: string;
}) {
  return (
    <div className={clsx("relative overflow-hidden", tone !== "none" ? `duo duo-${tone}` : "bg-gradient-to-br from-ocean to-navy", className)}>
      {PREVIEW && img[name].startsWith("http") ? <PlaceholderArt name={name} /> : <Image
        src={img[name]}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={clsx("object-cover", imgClassName)}
      />}
    </div>
  );
}
