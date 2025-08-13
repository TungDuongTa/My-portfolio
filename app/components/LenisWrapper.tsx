"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        wrapper: document.getElementById("page-wrapper") ?? undefined,
        content: document.getElementById("main-content") ?? undefined,
      });
      // Make Lenis globally accessible
      window.__lenis = lenisRef.current!;

      const update = (time: number) => {
        lenisRef.current?.raf(time * 1000);
        // requestAnimationFrame(animate);
      };
      gsap.ticker.add(update);
      // Add immediate ScrollTrigger update on Lenis scroll event
      lenisRef.current.on("scroll", () => {
        ScrollTrigger.update();
      });
      // After setup, refresh ScrollTrigger to recalc positions
      ScrollTrigger.refresh();
      return () => {
        lenisRef.current?.destroy();
        lenisRef.current = null;
        gsap.ticker.remove(update);
        ScrollTrigger.killAll();
      };

      // requestAnimationFrame(animate);
    }

    // return () => {
    //   lenisRef.current?.destroy();
    //   lenisRef.current = null;
    // };
  }, []);

  return <>{children}</>;
}
