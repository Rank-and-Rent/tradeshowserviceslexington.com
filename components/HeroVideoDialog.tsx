"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    videoRef.current?.play().catch(() => {});

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.toggle("hero-video-open", isOpen);

    return () => {
      document.body.classList.remove("hero-video-open");
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="sparks-hero__play"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span className="sparks-hero__play-ring" aria-hidden="true" />
        <span>play video</span>
      </button>

      {isOpen ? (
        <div
          aria-labelledby="hero-video-dialog-title"
          aria-modal="true"
          className="hero-video-dialog"
          role="dialog"
        >
          <div className="hero-video-dialog__scrim" onClick={() => setIsOpen(false)} />
          <div className="hero-video-dialog__frame">
            <div className="hero-video-dialog__toolbar">
              <p id="hero-video-dialog-title">Lexington show-floor reel</p>
              <button
                aria-label="Close video"
                className="hero-video-dialog__close"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <span />
                <span />
              </button>
            </div>

            <video
              ref={videoRef}
              className="hero-video-dialog__video"
              controls
              loop
              muted
              playsInline
              poster="/media/hero-poster.png"
            >
              <source src="/media/hero-loop.webm" type="video/webm" />
              <source src="/media/hero-loop.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      ) : null}
    </>
  );
}
