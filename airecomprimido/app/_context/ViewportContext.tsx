"use client";

import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export interface ViewportContextValue {
  isMobile: boolean;
}

export const ViewportContext = createContext<ViewportContextValue | null>(null);

export function useViewport() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used inside ViewportProvider");
  }
  return context;
}

export function ViewportProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 830px)");

    const handler = () => setIsMobile(mq.matches);
    handler();

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <ViewportContext.Provider value={{ isMobile }}>
      {children}
    </ViewportContext.Provider>
  );
}