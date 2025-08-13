"use client";

import { useEffect, useRef } from "react";
import { useContainerRef } from "../context/ContainerRefContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const { setContainerRef } = useContainerRef();

  useEffect(() => {
    setContainerRef(localRef.current);
  }, [setContainerRef]);

  return (
    <main
      id="page-wrapper"
      className="relative overflow-y-scroll h-screen scroll-container overflow-x-hidden"
      ref={localRef}
    >
      {children}
    </main>
  );
}
