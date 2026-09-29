import { Reveal } from "./Reveal";

export function SectionHeading({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-3 flex items-center gap-3 font-mono text-sm text-cyan-300">
        <span className="text-violet-400">{index}.</span>
        {eyebrow}
        <span className="h-px w-16 bg-gradient-to-r from-cyan-300/60 to-transparent" />
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
    </Reveal>
  );
}
