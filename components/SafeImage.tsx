"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

// Reliable fallback food images
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85",
];

// Embedded luxury SVG data URI fallback in case offline or completely blocked
const SVG_FALLBACK = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%2313151c"/><circle cx="300" cy="180" r="70" fill="%23d4af37" opacity="0.2"/><text x="50%25" y="48%25" font-family="serif" font-size="42" fill="%23d4af37" text-anchor="middle" dominant-baseline="middle">SAVORÉ</text><text x="50%25" y="60%25" font-family="monospace" font-size="14" fill="%23a0a4b4" letter-spacing="3" text-anchor="middle" dominant-baseline="middle">ARTISAN GASTRONOMY</text></svg>`;

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc,
  alt = "SAVORÉ Gourmet Cuisine",
  className = "",
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src || FALLBACK_IMAGES[0]);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_IMAGES[0]);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc || FALLBACK_IMAGES[0]);
    } else {
      // If even fallback fails, switch to embedded SVG
      setCurrentSrc(SVG_FALLBACK);
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#151821] animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-[#d4af37]/40 uppercase tracking-widest">SAVORÉ</span>
        </div>
      )}
      <Image
        {...props}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${props.fill ? "" : ""}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        unoptimized={currentSrc.startsWith("data:")}
      />
    </div>
  );
}
