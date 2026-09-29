"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data/resume";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <section id="experience" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've worked." />

        <div ref={ref} className="relative pl-10 md:pl-16">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-white/10 md:left-6" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-violet-500 via-cyan-400 to-pink-500 md:left-6"
          />

          {experience.map((job) => (
            <div key={job.company} className="relative">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="absolute -left-10 top-1 ml-3 grid size-7 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-black ring-8 ring-background md:-left-16 md:ml-6 md:size-8"
              >
                <Icon name="briefcase" className="size-3.5" />
              </motion.span>

              <Reveal x={-30} y={0}>
                <div className="card p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{job.role}</h3>
                      <p className="mt-1 text-cyan-300">
                        {job.company} <span className="text-muted">· {job.location}</span>
                      </p>
                    </div>
                    <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1.5 font-mono text-sm text-violet-200">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {job.points.map((p, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        className="flex gap-3 leading-relaxed text-muted"
                      >
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                        {p}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
