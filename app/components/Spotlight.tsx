"use client";
// components/Spotlight.tsx
import { useState, useEffect } from "react";

const Spotlight: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({
      x: event.clientX + window.scrollX,
      y: event.clientY + window.scrollY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition duration-300 lg:absolute"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    ></div>
  );
};

export default Spotlight;
