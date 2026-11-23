export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function saveDataEnabled() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
}

/** Poster is the LCP. Mount the hero video only after that, then idle. Hard cap 3s. */
export function waitForLcp() {
  return new Promise<void>((resolve) => {
    let settled = false;
    let sawLcp = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      const idle = window.requestIdleCallback;
      if (idle) idle(() => resolve(), { timeout: 500 });
      else resolve();
    };
    const cap = window.setTimeout(finish, 3000);
    const afterLcp = () => {
      window.clearTimeout(cap);
      finish();
    };
    try {
      const observer = new PerformanceObserver((list) => {
        if (list.getEntries().length > 0) {
          sawLcp = true;
          observer.disconnect();
          afterLcp();
        }
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // The load fallback and the hard cap still resolve.
    }
    const onLoad = () => {
      window.setTimeout(() => {
        if (!sawLcp) afterLcp();
      }, 1500);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
  });
}

export function scrollToSceneProgress(progress: number) {
  const section = document.getElementById("intro");
  if (!section) return;
  const distance = section.offsetHeight - window.innerHeight;
  const top = section.offsetTop + progress * Math.max(distance, 0);
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "instant" : "smooth",
  });
}
