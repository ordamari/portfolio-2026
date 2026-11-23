"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutBlock } from "@/components/AboutBlock";
import { HeroCopy } from "@/components/HeroCopy";
import { HeroVideo } from "@/components/HeroVideo";
import { WhatIDo } from "@/components/WhatIDo";
import { profile } from "@/content/profile";
import { prefersReducedMotion, scrollToSceneProgress } from "@/lib/browser";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Posters = {
  hero: ReactNode;
  end: ReactNode;
};

export function Intro({ posters }: { posters: Posters }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const onVideoReady = () => {
    const root = sectionRef.current;
    const video = root?.querySelector<HTMLElement>(".hero-video");
    const poster = root?.querySelector<HTMLElement>("[data-poster]");
    if (!video || !poster) return;
    const hide = () => {
      poster.style.visibility = "hidden";
    };
    video.addEventListener("transitionend", hide, { once: true });
    window.setTimeout(hide, 450);
  };

  useEffect(() => {
    const stage = stageRef.current;
    const nav = document.querySelector("[data-nav]");
    if (!stage || !nav) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const past = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        nav.toggleAttribute("data-solid", past);
      },
      { threshold: 0 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (prefersReducedMotion()) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href='#about']");
      if (!anchor) return;
      event.preventDefault();
      scrollToSceneProgress(0.5);
    }
    function onFocusIn(event: FocusEvent) {
      if (prefersReducedMotion()) return;
      const target = event.target;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.closest("[data-step='about']")) scrollToSceneProgress(0.5);
      else if (target.closest("[data-step='what']")) scrollToSceneProgress(1);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    let alive = true;
    let hintIntro: gsap.core.Tween | null = null;
    let introDone = false;
    let heldProgress = progressRef.current;
    let settling = false;

    const progressTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (!settling) heldProgress = self.progress;
        progressRef.current = heldProgress;
        document.querySelector("[data-nav-about]")?.toggleAttribute("data-active", heldProgress >= 0.33);
      },
    });

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
    });

    const heroItems = section.querySelectorAll<HTMLElement>("[data-intro]");
    const hint = section.querySelector<HTMLElement>("[data-hint]");
    const aboutKicker = section.querySelector("[data-about-kicker]");
    const aboutCard = section.querySelector("[data-about-card]");
    const whatItems = section.querySelectorAll("[data-what-kicker], [data-what-title], [data-what-card]");

    timeline.fromTo(
      heroItems,
      { y: 0, opacity: 1 },
      { y: -32, opacity: 0, duration: 0.14, immediateRender: false },
      0.06,
    );
    if (aboutKicker && aboutCard) {
      timeline.fromTo(aboutKicker, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, immediateRender: false }, 0.3);
      timeline.fromTo(aboutCard, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, immediateRender: false }, 0.32);
      timeline.to(aboutKicker, { y: -24, opacity: 0, duration: 0.08 }, 0.6);
      timeline.to(aboutCard, { y: -24, opacity: 0, duration: 0.08 }, 0.6);
    }
    if (whatItems.length) {
      timeline.fromTo(
        whatItems,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.07, stagger: 0.03, immediateRender: false },
        0.74,
      );
    }
    timeline.set({}, {}, 1);

    const sync = () => {
      const duration = timeline.duration() || 1;
      const progress = timeline.time() / duration;
      const hero = section.querySelector<HTMLElement>("[data-step='hero']");
      const about = section.querySelector<HTMLElement>("[data-step='about']");
      const what = section.querySelector<HTMLElement>("[data-step='what']");
      if (hero) hero.style.pointerEvents = progress < 0.18 ? "auto" : "none";
      if (about) about.style.pointerEvents = progress >= 0.38 && progress < 0.64 ? "auto" : "none";
      if (what) what.style.pointerEvents = progress >= 0.82 ? "auto" : "none";
      if (!hint) return;
      if (progress <= 0) {
        if (introDone) hint.style.opacity = "1";
      } else {
        hintIntro?.kill();
        hint.style.opacity = progress >= 0.04 ? "0" : String(1 - progress / 0.04);
      }
    };

    const bindScrub = () => {
      timeline.scrollTrigger?.getTween()?.eventCallback("onUpdate", sync);
      sync();
    };
    bindScrub();

    const scrollToCaptured = (progress: number) => {
      const distance = Math.max(0, section.offsetHeight - window.innerHeight);
      const top = section.offsetTop + progress * distance;
      progressRef.current = progress;
      if (Math.abs(window.scrollY - top) > 0.5) {
        window.scrollTo({ top, behavior: "instant" });
      }
    };
    const onRefreshInit = () => {
      if (!settling) heldProgress = progressRef.current;
    };
    const onRefresh = () => {
      bindScrub();
      scrollToCaptured(heldProgress);
    };
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const aspectQueries = [
      window.matchMedia("(max-aspect-ratio: 1/1)"),
      window.matchMedia("(min-aspect-ratio: 1/1)"),
    ];

    let resizeTimer = 0;
    const onResize = () => {
      settling = true;
      scrollToCaptured(heldProgress);
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        settling = false;
        scrollToCaptured(heldProgress);
      }, 250);
    };
    aspectQueries.forEach((query) => query.addEventListener("change", onResize));
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    document.fonts.ready.then(() => {
      if (!alive) return;
      if ((timeline.scrollTrigger?.progress ?? 0) > 0.01) {
        introDone = true;
        return;
      }
      gsap.fromTo(
        heroItems,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "expo.out", overwrite: "auto" },
      );
      if (hint) {
        hintIntro = gsap.fromTo(hint, { opacity: 0 }, {
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "expo.out",
          onComplete: () => {
            introDone = true;
          },
        });
      } else {
        introDone = true;
      }
    });

    return () => {
      alive = false;
      hintIntro?.kill();
      progressTrigger.kill();
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      aspectQueries.forEach((query) => query.removeEventListener("change", onResize));
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.clearTimeout(resizeTimer);
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section id="intro" ref={sectionRef} className="intro">
      <div className="stage" data-stage ref={stageRef}>
        <div className="panel panel-hero">
          {posters.hero}
          <HeroVideo progressRef={progressRef} stageRef={stageRef} onReady={onVideoReady} />
          <div className="vignette" />
          <div className="scrim" />
          <HeroCopy />
          <p className="scroll-hint" data-hint>
            {profile.scrollHint}
          </p>
        </div>
        <div className="panel panel-end">
          {posters.end}
          <div className="vignette" />
          <div className="scrim" />
          <AboutBlock />
          <WhatIDo />
        </div>
        <div className="grain" aria-hidden="true" />
      </div>
    </section>
  );
}
