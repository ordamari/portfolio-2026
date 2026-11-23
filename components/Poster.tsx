import { getImageProps } from "next/image";

type Source = { src: string; width: number; height: number };

type Props = {
  desktop: Source;
  mobile: Source;
  priority?: boolean;
  className?: string;
  marked?: boolean;
};

export function ArtPicture({ desktop, mobile, priority = false, className, marked = false }: Props) {
  const shared = { alt: "", sizes: "100vw" } as const;
  const { props: desktopProps } = getImageProps({ ...shared, ...desktop, priority });
  const { props: mobileProps } = getImageProps({ ...shared, ...mobile, priority });

  return (
    <picture className={className} {...(marked ? { "data-poster": "" } : {})}>
      <source media="(max-aspect-ratio: 1/1)" srcSet={mobileProps.srcSet} />
      <img
        {...desktopProps}
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}
