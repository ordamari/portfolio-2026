"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { navItems } from "@/content/nav";

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

  return (
    <nav aria-label="Primary" data-nav>
      <a className="logo" href="#top">
        or<span className="logo-dot">.</span>
      </a>
      <div className="nav-links">
        {navItems.map((item) =>
          item.external ? (
            <ExternalLink key={item.label} className="nav-link" href={item.href}>
              {item.label} <span className="ext-arrow" aria-hidden="true">↗</span>
            </ExternalLink>
          ) : (
            <a key={item.label} className="nav-link" href={item.href} data-nav-about>
              {item.label}
            </a>
          ),
        )}
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
        {navItems.map((item) =>
          item.external ? (
            <ExternalLink
              key={item.label}
              className="sheet-link"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label} <span className="ext-arrow" aria-hidden="true">↗</span>
            </ExternalLink>
          ) : (
            <a
              key={item.label}
              className="sheet-link"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
