import { useEffect, useRef, useState, useCallback } from "react";

export default function useTvVideoController(
  videoUrl,
  { autoplay = true } = {},
) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const play = useCallback(async () => {
    const player = videoRef.current;
    if (!player) return;

    try {
      await player.play();
    } catch (err) {
      console.warn("[TV] play failed", err);
    }
  }, []);

  const pause = useCallback(() => {
    const player = videoRef.current;
    if (!player) return;
    player.pause();
  }, []);

  const toggle = useCallback(() => {
    const player = videoRef.current;
    if (!player) return;

    if (player.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  // sync native events
  useEffect(() => {
    const player = videoRef.current;
    if (!player) return;

    const eventMaps = [
      { name: "play", handler: () => setIsPlaying(true) },
      { name: "pause", handler: () => setIsPlaying(false) },
      { name: "ended", handler: () => setIsPlaying(false) },
      { name: "waiting", handler: () => setIsLoading(true) },
      { name: "playing", handler: () => setIsLoading(false) },
      { name: "canplay", handler: () => setIsLoading(false) },
    ];

    eventMaps.forEach((item) => player.addEventListener(item.name, item.handler));

    return () => {
      eventMaps.forEach((item) =>
        player.removeEventListener(item.name, item.handler),
      );
    };
  }, []);

  // load video
  useEffect(() => {
    const player = videoRef.current;
    if (!player || !videoUrl) return;

    setIsLoading(true);
    player.src = videoUrl;
    player.load();

    if (autoplay) {
      play();
    }

    return () => {
      player.pause();
      player.src = "";
    };
  }, [videoUrl, autoplay, play]);

  return {
    videoRef,
    isPlaying,
    isLoading,
    play,
    pause,
    toggle,
  };
}
