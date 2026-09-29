"use client";

import { motion, useMotionValue, useScroll, useSpring, useMotionTemplate } from "motion/react";
import { useEffect } from "react";

/** Thin gradient bar at the top of the page tracking scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500"
    />
  );
}

/** Soft spotlight that follows the cursor across the whole page. */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 150, damping: 30 });
  const sy = useSpring(y, { stiffness: 150, damping: 30 });
  const background = useMotionTemplate`radial-gradient(500px circle at ${sx}px ${sy}px, rgb(139 92 246 / 0.10), transparent 70%)`;

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div aria-hidden style={{ background }} className="pointer-events-none fixed inset-0 z-0 hidden md:block" />;
}

/** Fixed ambient background: grid + drifting color blobs. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid mask-fade absolute inset-0" />
      <div className="animate-blob absolute -left-32 top-[-10%] size-[34rem] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="animate-blob absolute right-[-10%] top-[30%] size-[30rem] rounded-full bg-cyan-500/15 blur-[120px] [animation-delay:-6s]" />
      <div className="animate-blob absolute bottom-[-15%] left-[30%] size-[28rem] rounded-full bg-pink-500/10 blur-[120px] [animation-delay:-12s]" />
    </div>
  );
}
