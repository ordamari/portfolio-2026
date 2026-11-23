"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, saveDataEnabled, waitForLcp } from "@/lib/browser";
import { selectHeroVideo } from "@/lib/hero-source";

const FPS = 24;
const LERP = 0.08;

type Props = {
  progressRef: { current: number };
  stageRef: { current: HTMLElement | null };
  onReady: () => void;
};

function maxTime(video: HTMLVideoElement | null) {
  if (video && Number.isFinite(video.duration) && video.duration > 0) {
    return Math.max(0, video.duration - 1 / FPS);
  }
  return 10;
}

export function HeroVideo({ progressRef, stageRef, onReady }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const unlockedRef = useRef(false);
  const revealedRef = useRef(false);
  const onReadyRef = useRef(onReady);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.controls = false;
    video.disablePictureInPicture = true;
    video.loop = false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || saveDataEnabled()) return;
    let cancelled = false;
    const portrait = window.matchMedia("(max-aspect-ratio: 1/1)");
    const apply = () => {
      if (cancelled || prefersReducedMotion()) return;
      const next = selectHeroVideo();
      setSrc((current) => (current === next ? current : next));
    };
    waitForLcp().then(() => {
      if (cancelled || prefersReducedMotion() || saveDataEnabled()) return;
      apply();
      portrait.addEventListener("change", apply);
      window.addEventListener("resize", apply);
      window.addEventListener("orientationchange", apply);
    });
    return () => {
      cancelled = true;
      portrait.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    let cancelled = false;

    const reveal = () => {
      if (cancelled || revealedRef.current || !unlockedRef.current) return;
      revealedRef.current = true;
      video.classList.add("is-ready");
      onReadyRef.current();
    };

    let unlocking = false;
    const unlock = async () => {
      if (cancelled || unlockedRef.current || unlocking || !videoRef.current) return;
      unlocking = true;
      const node = videoRef.current;
      node.muted = true;
      node.defaultMuted = true;
      node.playsInline = true;
      node.controls = false;
      try {
        await node.play();
        if (cancelled) {
          node.pause();
          return;
        }
        node.pause();
        const time = Math.min(Math.max(0, currentRef.current), maxTime(node));
        if (node.readyState >= 1 && !node.seeking) node.currentTime = time;
        unlockedRef.current = true;
        reveal();
      } catch {
        unlockedRef.current = false;
        unlocking = false;
      }
    };

    const onLoaded = () => {
      const time = progressRef.current * maxTime(video);
      currentRef.current = time;
      targetRef.current = time;
      if (video.readyState >= 1 && !video.seeking) video.currentTime = time;
      if (unlockedRef.current) return;
      void unlock();
    };

    const onError = () => {
      video.classList.remove("is-ready");
      revealedRef.current = false;
    };

    const retry = () => {
      if (!unlockedRef.current) void unlock();
    };

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("error", onError);
    window.addEventListener("pointerdown", retry);
    window.addEventListener("touchstart", retry, { passive: true });
    window.addEventListener("click", retry);

    const nextUrl = new URL(src, window.location.href).href;
    if (video.src !== nextUrl) {
      video.preload = "auto";
      video.src = src;
      video.load();
    } else if (video.readyState >= 2) {
      onLoaded();
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("click", retry);
    };
  }, [progressRef, src]);

  useEffect(() => {
    if (!src || prefersReducedMotion()) return;
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    let running = false;
    let onScreen = true;
    let pageVisible = document.visibilityState !== "hidden";

    const tick = () => {
      const video = videoRef.current;
      const limit = maxTime(video);
      targetRef.current = progressRef.current * limit;
      currentRef.current += (targetRef.current - currentRef.current) * LERP;
      if (video && video.readyState >= 1 && !video.seeking && video.paused) {
        if (Math.abs(video.currentTime - currentRef.current) > 0.001) {
          video.currentTime = Math.min(Math.max(0, currentRef.current), limit);
        }
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (onScreen && pageVisible) start();
      else stop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(stage);
    const onVisibility = () => {
      pageVisible = document.visibilityState !== "hidden";
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    sync();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [progressRef, src, stageRef]);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      muted
      playsInline
      preload="none"
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
