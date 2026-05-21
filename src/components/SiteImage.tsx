"use client";

import NextImage, { ImageProps } from "next/image";
import { useImageConfig } from "@/components/ImageConfigProvider";

/**
 * Drop-in replacement for next/image that auto-resolves
 * Vercel Blob overrides. Use exactly like <Image>.
 */
export function SiteImage(props: ImageProps) {
  const { resolve } = useImageConfig();

  const resolvedSrc =
    typeof props.src === "string" ? resolve(props.src) : props.src;

  return <NextImage {...props} src={resolvedSrc} />;
}
