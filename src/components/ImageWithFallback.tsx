import React, { useState, useEffect } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  maxRetries?: number;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/singapore-night-exp.avif",
  className = "",
  maxRetries = 2,
  ...props
}: ImageWithFallbackProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [retryCount, setRetryCount] = useState(0);

  // Sync state if src changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setError(false);
      setLoading(true);
      setRetryCount(0);
    }
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false);
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const isUnsplash = src?.includes("unsplash.com");
    if (
      retryCount < maxRetries &&
      !error &&
      src &&
      !src.startsWith("/") &&
      !isUnsplash
    ) {
      // Retry loading the same image
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setImgSrc(`${src}${src?.includes("?") ? "&" : "?"}retry=${retryCount}`);
      }, 1000);
      return;
    }

    if (!error) {
      setError(true);
      setImgSrc(fallbackSrc);
    } else {
      // If even the fallback fails, use a tiny, transparent spacer so it doesn't show a broken image icon
      setImgSrc(
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1' h='1'></svg>",
      );
      setLoading(false);
    }

    if (error && props.onError) {
      props.onError(e);
    }
  };

  return (
    <div
      className={`relative overflow-hidden w-full h-full bg-slate-100 ${className}`}
    >
      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse flex items-center justify-center">
          <svg
            className="w-6 h-6 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt || "Singapore Experience"}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        {...props}
      />
    </div>
  );
}
