import { useEffect, useRef, useState, useCallback } from "react";

export default function useTvVideoController(
  videoUrl,
  { autoplay = true } = {},
) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    player.addEventListener("play", onPlay);
    player.addEventListener("pause", onPause);
    player.addEventListener("ended", onEnded);

    return () => {
      player.removeEventListener("play", onPlay);
      player.removeEventListener("pause", onPause);
      player.removeEventListener("ended", onEnded);
    };
  }, []);

  // load video
  useEffect(() => {
    const player = videoRef.current;
    if (!player || !videoUrl) return;

    player.src = videoUrl;
    player.load();

    if (autoplay) {
      play();
    }

    return () => {
      player.pause();
    };
  }, [videoUrl, autoplay, play]);

  return {
    videoRef,
    isPlaying,
    play,
    pause,
    toggle,
  };
}
