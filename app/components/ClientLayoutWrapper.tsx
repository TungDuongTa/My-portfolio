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
    <main>
      <div ref={localRef}>{children}</div>
    </main>
  );
}
