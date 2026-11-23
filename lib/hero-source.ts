/** Landscape screens above this CSS-pixel × devicePixelRatio count use the 1440 master. */
export const HERO_BUCKET_PIXELS = 2200;

export const heroAssets = {
  mobile: {
    video: "/hero/hero-mobile.mp4",
    poster: "/hero/hero-mobile-poster.webp",
    end: "/hero/hero-mobile-end.webp",
    width: 1080,
    height: 1920,
  },
  desktop1440: {
    video: "/hero/hero-desktop-1440.mp4",
    poster: "/hero/hero-desktop-1440-poster.webp",
    end: "/hero/hero-desktop-1440-end.webp",
    width: 2560,
    height: 1440,
  },
  desktop1080: {
    video: "/hero/hero-desktop-1080.mp4",
    poster: "/hero/hero-desktop-1080-poster.webp",
    end: "/hero/hero-desktop-1080-end.webp",
    width: 1920,
    height: 1080,
  },
} as const;

export type HeroBucket = keyof typeof heroAssets;

/** Portrait uses mobile. Landscape uses 1440 only above HERO_BUCKET_PIXELS, otherwise 1080. */
export function selectHeroBucket(): HeroBucket {
  if (window.matchMedia("(max-aspect-ratio: 1/1)").matches) return "mobile";
  if (window.innerWidth * (window.devicePixelRatio || 1) > HERO_BUCKET_PIXELS) return "desktop1440";
  return "desktop1080";
}

export function selectHeroVideo() {
  return heroAssets[selectHeroBucket()].video;
}

/**
 * Runs while the document parses, after the still <img> tags, so only the matching
 * poster is requested. The end still stays unset until reduced motion.
 */
export const heroStillScript = `(function(){
  var PIXELS = ${HERO_BUCKET_PIXELS};
  function bucket(){
    if (matchMedia("(max-aspect-ratio: 1/1)").matches) return "mobile";
    if (innerWidth * (devicePixelRatio || 1) > PIXELS) return "desktop1440";
    return "desktop1080";
  }
  function apply(img){
    if (img.getAttribute("data-hero-still") === "end" && !matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var src = img.getAttribute("data-" + bucket());
    if (src && img.getAttribute("src") !== src) img.src = src;
  }
  function run(){
    var nodes = document.querySelectorAll("[data-hero-still]");
    for (var i = 0; i < nodes.length; i++) apply(nodes[i]);
  }
  run();
  addEventListener("resize", run);
  addEventListener("orientationchange", run);
  matchMedia("(max-aspect-ratio: 1/1)").addEventListener("change", run);
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", run);
})();`;
