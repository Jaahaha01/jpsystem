"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ImageConfigValue = {
  /** Returns the resolved src — blob URL if overridden, or the original local path */
  resolve: (localSrc: string) => string;
  overrides: Record<string, string>;
};

const ImageConfigContext = createContext<ImageConfigValue>({
  resolve: (s) => s,
  overrides: {},
});

export function ImageConfigProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/image-config")
      .then((r) => r.json())
      .then((data) => {
        if (data.overrides) setOverrides(data.overrides);
      })
      .catch(() => {});
  }, []);

  const resolve = (localSrc: string): string => {
    // Extract filename from path like "/homebg.jpg" or "/images/test.jpg"
    const filename = localSrc.replace(/^\//, "").split("/").pop() || "";
    return overrides[filename] || localSrc;
  };

  return (
    <ImageConfigContext.Provider value={{ resolve, overrides }}>
      {children}
    </ImageConfigContext.Provider>
  );
}

export function useImageConfig() {
  return useContext(ImageConfigContext);
}
