"use client";

import { useEffect } from "react";

export function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} | Japan System Thailand`;
  }, [title]);
  return null;
}

