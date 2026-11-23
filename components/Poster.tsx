import { heroAssets, type HeroBucket } from "@/lib/hero-source";

type Props = {
  kind: "poster" | "end";
  className?: string;
  marked?: boolean;
};

const keys: HeroBucket[] = ["mobile", "desktop1440", "desktop1080"];

export function HeroStill({ kind, className, marked = false }: Props) {
  const sample = heroAssets.desktop1080;
  const priority = kind === "poster";
  const data = Object.fromEntries(keys.map((key) => [`data-${key}`, heroAssets[key][kind]]));

  return (
    // eslint-disable-next-line @next/next/no-img-element -- src is chosen before the request, so next/image cannot own it
    <img
      className={className}
      alt=""
      width={sample.width}
      height={sample.height}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      data-hero-still={kind}
      {...(marked ? { "data-poster": "" } : {})}
      {...data}
    />
  );
}
