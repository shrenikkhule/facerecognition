import React, { useEffect, useRef, useState } from "react";

export const FakeCCTVPlayer = ({ video, name }) => {
  const videoRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        console.warn("Autoplay blocked");
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {!error ? (
        <video
          ref={videoRef}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setError(true)}
          className="w-full h-full object-cover opacity-90"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-red-500 text-sm">
          Camera Feed Unavailable
        </div>
      )}

      <div className="absolute inset-0 noise pointer-events-none"></div>

      <div className="absolute inset-0 scan pointer-events-none"></div>

      <div className="absolute bottom-2 left-2 text-green-400 text-xs font-mono bg-black/60 px-2 py-1 rounded">
        {time.toLocaleString()}
      </div>

      <div className="absolute top-2 left-2 text-white text-xs bg-black/60 px-2 py-1 rounded">
        {name}
      </div>

      <div className="absolute top-2 right-2 flex items-center gap-1 text-red-500 text-xs">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        REC
      </div>

      <style>
        {`
        .noise {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          opacity: 0.2;
          mix-blend-mode: overlay;
        }

        .scan {
          background: linear-gradient(
            transparent 50%,
            rgba(0,255,255,0.05) 50%
          );
          background-size: 100% 4px;
          animation: scanMove 8s linear infinite;
        }

        @keyframes scanMove {
          from { background-position: 0 0; }
          to { background-position: 0 100%; }
        }
        `}
      </style>
    </div>
  );
};
