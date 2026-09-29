"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/resume";
import { Icon } from "./Icon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${
          scrolled ? "border border-white/10 bg-black/50 shadow-2xl shadow-violet-950/30 backdrop-blur-xl" : "border border-transparent"
        }`}
      >
        <a href="#top" className="group flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm text-black transition-transform duration-500 group-hover:rotate-[360deg]">
            AS
          </span>
          <span className="hidden sm:inline">
            {profile.firstName}
            <span className="text-cyan-300">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === link.href ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:scale-105 hover:bg-cyan-200 md:inline-block"
        >
          Hire me
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid size-10 place-items-center rounded-xl border border-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl space-y-1 rounded-2xl border border-white/10 bg-black/80 p-3 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-muted transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
