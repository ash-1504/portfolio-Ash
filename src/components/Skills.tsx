"use client";

import { motion } from "motion/react";
import type { MouseEvent } from "react";
import { skillGroups } from "@/data/resume";
import { Icon } from "./Icon";
import { fadeUp, Reveal, stagger } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const accents = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-pink-500 to-rose-500",
  "from-amber-400 to-orange-500",
  "from-indigo-400 to-violet-500",
];

/** Tracks the pointer inside a card so a CSS radial spotlight can follow it. */
function trackPointer(e: MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="02" eyebrow="Skills" title="My toolkit." />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 3) * 0.1}>
              <div
                onMouseMove={trackPointer}
                className="card group h-full overflow-hidden p-6 transition duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background:radial-gradient(300px_circle_at_var(--x)_var(--y),rgb(139_92_246/0.15),transparent_70%)] group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${accents[i]} text-black shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <Icon name={group.icon} />
                    </span>
                    <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                  </div>
                  <motion.ul
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                  >
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        variants={fadeUp}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="cursor-default rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/80 transition-colors hover:border-cyan-300/40 hover:text-white"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
