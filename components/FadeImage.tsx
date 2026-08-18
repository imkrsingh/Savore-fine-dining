"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

type FadeImageProps = Omit<ImageProps, "src"> & {
  src: string;
  shimmerColor?: string;
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85";
const SVG_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2313151c"/><text x="50%25" y="50%25" font-family="serif" font-size="36" fill="%23d4af37" text-anchor="middle" dominant-baseline="middle">SAVORÉ</text></svg>`;

export default function FadeImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  shimmerColor = "#151822",
  className = "",
  alt = "SAVORÉ Culinary",
  ...props
}: FadeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [failedOnce, setFailedOnce] = useState(false);

  const handleError = () => {
    if (!failedOnce) {
      setFailedOnce(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setCurrentSrc(SVG_FALLBACK);
    }
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse"
          style={{ background: shimmerColor }}
        />
      )}
      <Image
        {...props}
        src={currentSrc}
        alt={alt}
        className={`${className} transition-opacity duration-500 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        unoptimized={currentSrc.startsWith("data:")}
      />
    </>
  );
}
