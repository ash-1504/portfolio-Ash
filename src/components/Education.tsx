"use client";

import { motion } from "motion/react";
import { currently, education } from "@/data/resume";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="05" eyebrow="Education" title="Where I learned." />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1} className={i === 0 ? "md:col-span-2" : ""}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`card group flex h-full gap-5 p-6 transition-colors hover:border-violet-400/30 ${i === 0 ? "flex-col md:flex-row md:items-center md:p-8" : "flex-col"}`}
              >
                <span
                  className={`grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-cyan-300 ring-1 ring-white/10 transition group-hover:from-violet-500 group-hover:to-cyan-400 group-hover:text-black ${i === 0 ? "size-16" : "size-12"}`}
                >
                  <Icon name="grad" className={i === 0 ? "size-7" : "size-5"} />
                </span>
                <div className="flex-1">
                  <h3 className={`font-display font-semibold ${i === 0 ? "text-2xl" : "text-lg"}`}>{e.degree}</h3>
                  <p className="mt-1 text-muted">{e.school}</p>
                </div>
                <div className={`flex gap-3 ${i === 0 ? "flex-col items-end max-md:items-start" : "mt-auto"}`}>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-sm">{e.year}</span>
                  <span className="text-gradient animate-shine font-display text-lg font-bold">{e.score}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-dashed border-cyan-300/30 bg-cyan-300/5 p-5">
            <Icon name="book" className="size-6 shrink-0 text-cyan-300" />
            <p className="text-white/85">
              <span className="font-semibold text-cyan-300">Currently: </span>
              {currently}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
