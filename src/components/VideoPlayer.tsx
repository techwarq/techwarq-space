"use client";

import React, { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  style?: React.CSSProperties;
  className?: string;
  type?: string;
}

export default function VideoPlayer({
  src,
  autoPlay = false,
  loop = true,
  muted = false,
  playsInline = true,
  controls = true,
  style,
  className,
  type = "video/mp4"
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntersecting) {
      if (autoPlay || wasPlayingRef.current) {
        video.play().catch(() => {
          // Silent catch for autoplay blocks
        });
      }
    } else {
      // Store whether it was playing before pausing
      wasPlayingRef.current = !video.paused;
      video.pause();
    }
  }, [isIntersecting, autoPlay]);

  return (
    <video
      ref={videoRef}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={controls}
      style={style}
      className={className}
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}
