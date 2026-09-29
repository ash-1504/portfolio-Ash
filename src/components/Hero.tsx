"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/resume";
import { Icon } from "./Icon";

function useTypewriter(words: readonly string[], speed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (cleared) {
          setDeleting(false);
          setI((n) => n + 1);
        } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      done ? pause : deleting ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const role = useTypewriter(profile.roles);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const nameWords = profile.name.split(" ");

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
      <motion.div style={{ y, opacity }} className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm text-emerald-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.available}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-3 font-mono text-cyan-300"
          >
            Hi there 👋, I&apos;m
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl" aria-label={profile.name}>
            {nameWords.map((word, w) => (
              <span key={w} className="inline-block whitespace-nowrap">
                {word.split("").map((ch, i) => {
                  const index = nameWords.slice(0, w).join(" ").length + w + i;
                  return (
                    <motion.span
                      key={i}
                      aria-hidden
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.035, ease }}
                      className={`inline-block ${w > 0 ? "text-gradient animate-shine" : ""}`}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
                {w < nameWords.length - 1 && " "}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="mt-6 h-9 font-display text-2xl text-white/90 md:text-3xl"
          >
            {role}
            <span className="animate-blink ml-0.5 text-cyan-300">|</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            I craft responsive, component-driven interfaces for the web and mobile with{" "}
            <span className="text-white">React.js</span>, <span className="text-white">Next.js</span> and{" "}
            <span className="text-white">React Native</span> — turning secured APIs into smooth, intuitive experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-7 py-3.5 font-semibold text-black shadow-lg shadow-violet-500/25 transition hover:shadow-cyan-400/40"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              View my work
              <Icon name="arrow" className="size-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-semibold transition hover:border-white/40 hover:bg-white/5"
            >
              Get in touch
            </a>
            <div className="flex items-center gap-2">
              {[
                { href: profile.github, icon: "github" as const, label: "GitHub" },
                { href: profile.linkedin, icon: "linkedin" as const, label: "LinkedIn" },
                { href: `mailto:${profile.email}`, icon: "mail" as const, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-white/10 text-muted transition hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-300"
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <CodeCard />
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted"
      >
        Scroll
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="size-1.5 rounded-full bg-cyan-300"
          />
        </span>
      </motion.a>
    </section>
  );
}

const codeLines: { t: string; c: string }[][] = [
  [{ t: "const ", c: "text-violet-400" }, { t: "developer", c: "text-cyan-300" }, { t: " = {", c: "text-white/70" }],
  [{ t: "  name: ", c: "text-white/70" }, { t: '"Aastha Shrivastava"', c: "text-emerald-300" }, { t: ",", c: "text-white/70" }],
  [{ t: "  role: ", c: "text-white/70" }, { t: '"Frontend Developer"', c: "text-emerald-300" }, { t: ",", c: "text-white/70" }],
  [{ t: "  location: ", c: "text-white/70" }, { t: '"Pune, India"', c: "text-emerald-300" }, { t: ",", c: "text-white/70" }],
  [{ t: "  stack: ", c: "text-white/70" }, { t: "[", c: "text-yellow-300" }],
  [{ t: '    "React"', c: "text-emerald-300" }, { t: ", ", c: "text-white/70" }, { t: '"Next.js"', c: "text-emerald-300" }, { t: ",", c: "text-white/70" }],
  [{ t: '    "React Native"', c: "text-emerald-300" }, { t: ", ", c: "text-white/70" }, { t: '"TypeScript"', c: "text-emerald-300" }],
  [{ t: "  ],", c: "text-yellow-300" }],
  [{ t: "  experience: ", c: "text-white/70" }, { t: "1", c: "text-pink-400" }, { t: ", ", c: "text-white/70" }, { t: "// years", c: "text-white/35" }],
  [{ t: "  openToWork: ", c: "text-white/70" }, { t: "true", c: "text-pink-400" }, { t: ",", c: "text-white/70" }],
  [{ t: "};", c: "text-white/70" }],
];

function CodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.8, ease }}
      className="relative hidden [perspective:1000px] lg:block"
    >
      <div className="animate-float">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-600/30 via-cyan-500/20 to-pink-500/20 blur-2xl" />
        <div className="card relative overflow-hidden !bg-[#0c0c14]/90 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
            <span className="ml-3 font-mono text-xs text-muted">aastha.ts</span>
          </div>
          <pre className="px-5 pb-10 pt-5 font-mono text-[13px] leading-7">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.08 }}
                className="flex"
              >
                <span className="mr-5 w-4 select-none text-right text-white/20">{i + 1}</span>
                <span>
                  {line.map((tok, j) => (
                    <span key={j} className={tok.c}>
                      {tok.t}
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
          </pre>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="card absolute -bottom-8 -left-10 flex items-center gap-3 !bg-[#0c0c14]/95 px-4 py-3 shadow-xl"
        >
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-black">
            <Icon name="phone" className="size-4" />
          </span>
          <div className="text-sm">
            <p className="font-semibold">Web + Mobile</p>
            <p className="text-xs text-muted">Cross-platform builds</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="card absolute -right-6 -top-6 flex items-center gap-2 !bg-[#0c0c14]/95 px-4 py-2.5 text-sm shadow-xl"
        >
          <Icon name="sparkle" className="size-4 text-pink-400" />
          Pixel-perfect UI
        </motion.div>
      </div>
    </motion.div>
  );
}
