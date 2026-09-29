"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, type MouseEvent } from "react";
import { projects } from "@/data/resume";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Project = (typeof projects)[number];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="04" eyebrow="Projects" title="Things I've built." />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="card group flex h-full flex-col overflow-hidden transition-colors duration-500 hover:border-white/20"
      >
        <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.accent} p-[1px]`}>
          <div className="relative h-full overflow-hidden rounded-t-[1.2rem] bg-[#0b0b12]">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 transition-opacity duration-500 group-hover:opacity-35`} />
            <div className="absolute inset-0 grid place-items-center transition-transform duration-700 [transform:translateZ(40px)] group-hover:scale-105">
              <Visual kind={project.visual} accent={project.accent} />
            </div>
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium backdrop-blur">
            {project.platform}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 [transform:translateZ(20px)]">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">{project.kind}</p>
          <h3 className="mt-2 font-display text-xl font-semibold">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                {project.points.map((pt) => (
                  <li key={pt} className="mt-3 flex gap-2 text-sm leading-relaxed text-white/75">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                    {pt}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-5">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-white/70">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-cyan-300"
            >
              {expanded ? "Show less" : "View highlights"}
              <Icon name="down" className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Small illustrative mockups — pure CSS, no screenshots needed. */
function Visual({ kind, accent }: { kind: Project["visual"]; accent: string }) {
  if (kind === "dashboard") {
    return (
      <div className="w-[78%] rounded-lg border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur">
        <div className="mb-3 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-white/30" />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="w-1/4 space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-2 rounded ${i === 0 ? `bg-gradient-to-r ${accent}` : "bg-white/10"}`} />
            ))}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex h-12 items-end gap-1">
              {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                  className={`flex-1 rounded-sm bg-gradient-to-t ${accent}`}
                />
              ))}
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-1">
                <div className="h-1.5 flex-1 rounded bg-white/10" />
                <div className="h-1.5 w-1/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "mobile") {
    return (
      <div className="flex items-end gap-3">
        {[0, 1].map((phone) => (
          <div
            key={phone}
            className={`w-24 rounded-2xl border-2 border-white/15 bg-black/70 p-2 shadow-2xl ${phone ? "translate-y-3 -rotate-6 opacity-80" : "rotate-3"}`}
          >
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
            <div className={`mb-2 h-6 rounded-md bg-gradient-to-r ${accent}`} />
            {[0, 1, 2].map((i) => (
              <div key={i} className="mb-1.5 flex items-center gap-1.5 rounded-md bg-white/5 p-1.5">
                <span className={`size-2 rounded-full ${i === 1 ? "bg-amber-400" : "bg-emerald-400"}`} />
                <span className="h-1.5 flex-1 rounded bg-white/15" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-[82%] gap-2">
      {["To do", "In progress", "Done"].map((col, c) => (
        <div key={col} className="flex-1 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur">
          <p className="mb-2 text-[9px] font-medium text-white/50">{col}</p>
          {Array.from({ length: 3 - c + (c === 2 ? 1 : 0) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (c * 3 + i) * 0.06 }}
              className="mb-1.5 rounded bg-white/5 p-1.5"
            >
              <div className={`mb-1 h-1 w-6 rounded bg-gradient-to-r ${accent}`} />
              <div className="h-1.5 rounded bg-white/15" />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
