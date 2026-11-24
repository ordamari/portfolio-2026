"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { navLinks, talkLink } from "@/content/nav";

export function Nav() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = sheet
      ? Array.from(sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
      : [];
    focusable[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const flow = ["experience", "projects", "contact"];
    const sync = () => {
      const line = window.innerHeight * 0.4;
      let bestId: string | null = null;
      let bestTop = -Infinity;
      for (const id of flow) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      let active: string | null = null;
      if (bestId === "experience" || bestId === "projects") active = bestId;
      else if (!bestId) {
        const intro = document.getElementById("intro");
        if (intro) {
          const distance = Math.max(1, intro.offsetHeight - window.innerHeight);
          const progress = (window.scrollY - intro.offsetTop) / distance;
          const inPin = intro.getBoundingClientRect().bottom > window.innerHeight - 1;
          if (inPin && progress >= 0.33) active = "about";
        }
      }
      document.querySelectorAll("a[data-nav]").forEach((el) => {
        el.toggleAttribute("data-active", el.getAttribute("data-nav") === active);
      });
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className="nav" aria-label="Primary" data-nav>
      <a className="logo" href="#top">
        or<span className="logo-dot">.</span>
      </a>
      <div className="nav-links">
        {navLinks.map((item) => (
          <a key={item.id} className="nav-link" href={item.href} data-nav={item.id}>
            {item.label}
          </a>
        ))}
        <ExternalLink className="nav-talk" href={talkLink.href}>
          {talkLink.label} <span className="ext-arrow" aria-hidden="true">↗</span>
        </ExternalLink>
      </div>
      <button
        ref={burgerRef}
        type="button"
        className="burger"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="burger-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <div
        id={menuId}
        ref={sheetRef}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open ? "true" : "false"}
        inert={!open}
        aria-hidden={!open}
      >
        {navLinks.map((item) => (
          <a
            key={item.id}
            className="sheet-link"
            href={item.href}
            data-nav={item.id}
            onClick={close}
          >
            {item.label}
          </a>
        ))}
        <ExternalLink className="sheet-link" href={talkLink.href} onClick={close}>
          {talkLink.label} <span className="ext-arrow" aria-hidden="true">↗</span>
        </ExternalLink>
      </div>
    </nav>
  );
}
