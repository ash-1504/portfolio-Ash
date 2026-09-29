"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { marquee, profile, stats } from "@/data/resume";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading index="01" eyebrow="About me" title="Building interfaces people enjoy using." />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            <p>{profile.summary}</p>
            <p>
              I care about <span className="text-white">component-based architecture</span>,{" "}
              <span className="text-white">responsive design</span> and clean{" "}
              <span className="text-white">API integration</span> — building UIs that stay consistent across modules and
              platforms. I&apos;ve worked in Agile teams alongside backend developers and leads, shipping features through
              Git branching and code reviews.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                <Icon name="pin" className="size-4 text-cyan-300" /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
                <Icon name="briefcase" className="size-4 text-violet-400" /> {profile.available}
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="card group h-full p-6 transition duration-500 hover:-translate-y-1 hover:border-violet-400/40">
                  <p className="text-gradient animate-shine font-display text-4xl font-bold md:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="mask-x mt-24 overflow-hidden border-y border-white/5 py-6">
        <div className="animate-marquee flex w-max gap-12 hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-2xl font-semibold text-white/30 transition hover:text-white md:text-3xl">
              {t}
              <Icon name="sparkle" className="size-5 text-violet-400/60" />
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
