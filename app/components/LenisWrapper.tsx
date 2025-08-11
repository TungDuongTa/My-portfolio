"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
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

      const update = (time: number) => {
        lenisRef.current?.raf(time * 1000);
        // requestAnimationFrame(animate);
      };
      gsap.ticker.add(update);
      // Add immediate ScrollTrigger update on Lenis scroll event
      lenisRef.current.on("scroll", () => {
        ScrollTrigger.update();
      });
      return () => {
        gsap.ticker.remove(update);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      };

      // requestAnimationFrame(animate);
    }

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
