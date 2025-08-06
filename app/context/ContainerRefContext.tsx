"use client";

import { createContext, useContext, useRef, useCallback } from "react";

export type ContainerRefType = React.RefObject<HTMLDivElement | null>;

interface ContainerRefContextType {
  containerRef: ContainerRefType;
  setContainerRef: (ref: HTMLDivElement | null) => void;
}

const ContainerRefContext = createContext<ContainerRefContextType | undefined>(
  undefined
);

export const ContainerRefProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setContainerRef = useCallback((ref: HTMLDivElement | null) => {
    containerRef.current = ref;
  }, []);

  return (
    <ContainerRefContext.Provider value={{ containerRef, setContainerRef }}>
      {children}
    </ContainerRefContext.Provider>
  );
};

export const useContainerRef = () => {
  const context = useContext(ContainerRefContext);
  if (!context) {
    throw new Error("useContainerRef must be used within ContainerRefProvider");
  }
  return context;
};
