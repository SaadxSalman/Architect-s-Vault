import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: '/live/stream.m3u8',
          type: 'application/x-mpegURL'
        }]
      });
    }
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} className="rounded-xl overflow-hidden shadow-2xl border border-slate-800" />
    </div>
  );
};