"use client";

import { createContext, useContext, useRef, useEffect } from "react";
import { ReactLenis, LenisRef } from "lenis/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

interface LenisContextType {
  lenis: React.RefObject<LenisRef | null>;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef | null>(null);
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <LenisContext.Provider value={{ lenis: lenisRef }}>
        {children}
      </LenisContext.Provider>
    </ReactLenis>
  );
};

export const useLenisContext = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisContext must be used within a LenisProvider");
  }
  return context;
};
