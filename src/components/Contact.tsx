"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { navLinks, profile } from "@/data/resume";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";

const channels: { icon: IconName; label: string; value: string; href: string }[] = [
  { icon: "mail", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: "call", label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: "linkedin", label: "LinkedIn", value: "aastha-shrivastava", href: profile.linkedin },
  { icon: "github", label: "GitHub", value: "ash-1504", href: profile.github },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="card relative overflow-hidden px-6 py-16 text-center md:px-16 md:py-24">
            <div className="animate-blob absolute -left-20 -top-20 size-72 rounded-full bg-violet-600/30 blur-[100px]" />
            <div className="animate-blob absolute -bottom-20 -right-20 size-72 rounded-full bg-cyan-500/25 blur-[100px] [animation-delay:-8s]" />

            <div className="relative">
              <p className="font-mono text-sm text-cyan-300">
                <span className="text-violet-400">06.</span> What&apos;s next?
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl">
                Let&apos;s build something <span className="text-gradient animate-shine">great together.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
                I&apos;m actively looking for frontend roles and available to join immediately. Whether you have an
                opportunity or just want to say hi, my inbox is always open.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-8 py-4 font-semibold text-black shadow-lg shadow-violet-500/30"
                >
                  <Icon name="mail" /> Say hello
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={copy}
                  className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold transition-colors hover:bg-white/5"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "done" : "copy"}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Icon name={copied ? "check" : "copy"} className={`size-5 ${copied ? "text-emerald-400" : ""}`} />
                      {copied ? "Copied!" : "Copy email"}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>

              <div className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {channels.map((c, i) => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-left transition hover:-translate-y-1 hover:border-cyan-300/40"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-cyan-300 transition group-hover:bg-cyan-300 group-hover:text-black">
                      <Icon name={c.icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted">{c.label}</span>
                      <span className="block truncate text-sm">{c.value}</span>
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 text-sm text-muted md:flex-row">
        <p>
          Designed & built by <span className="text-white">{profile.name}</span> · © {new Date().getFullYear()}
        </p>
        <ul className="flex flex-wrap justify-center gap-5">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#top" className="group inline-flex items-center gap-2 transition hover:text-white">
          Back to top
          <Icon name="down" className="size-4 rotate-180 transition-transform group-hover:-translate-y-1" />
        </a>
      </div>
    </footer>
  );
}
