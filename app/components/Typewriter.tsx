"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface TypewriterProps {
  text: string;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, onComplete }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // useGsap for typewriter effect
  useGSAP(() => {
    if (textRef.current && cursorRef.current) {
      // Initialize GSAP animations
      gsap.to(textRef.current, {
        text: text,
        duration: text.length * 0.05,
        ease: "none",
        onComplete: () => {
          // Call the onComplete callback if provided
          if (onComplete) onComplete();

          // Stop the cursor blinking
          gsap.killTweensOf(cursorRef.current);
          gsap.set(cursorRef.current, { opacity: 0 }); // Make sure cursor is visible and steady
        },
      });

      // Start the cursor blinking
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        duration: 0.5,
      });
    }
  }, [text]);

  return (
    <div className="flex items-center">
      <span
        ref={textRef}
        className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl"
      ></span>
      <span
        ref={cursorRef}
        className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl"
      >
        |
      </span>
    </div>
  );
};

export default Typewriter;
