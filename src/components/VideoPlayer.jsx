import { useEffect, useRef, useState } from "react";
import useNavigation from "../hooks/useNavigation";
import "./VideoPlayer.css";

export default function VideoPlayer({ video, onBack }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showIcon, setShowIcon] = useState(true);

  const togglePlayback = () => {
    const player = videoRef.current;
    if (!player) return;

    if (player.paused) {
      const playPromise = player.play();
      if (
        playPromise !== undefined &&
        typeof playPromise.catch === "function"
      ) {
        playPromise.catch(() => {});
      }
      setShowIcon(true); // Show icon briefly when playing
    } else {
      player.pause();
      setShowIcon(true); // Keep icon visible when paused
    }
  };

  useNavigation({
    onEnter: togglePlayback,
    onBack,
  });

  // Auto-hide icon after 3 seconds if playing
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        setShowIcon(false);
      }, 3000);
    } else {
      setShowIcon(true);
    }
    return () => clearTimeout(timer);
  }, [isPlaying]);

  // Sync React state with video element state
  useEffect(() => {
    const player = videoRef.current;
    if (!player) return;

    // Autoplay muted
    player.muted = true;
    const playPromise = player.play();
    if (playPromise !== undefined && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }

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
      player.pause();
    };
  }, []);

  if (!video) return null;

  return (
    <main className="player-screen">
      <header className="player-screen__header">
        <div>
          <h1>{video.title}</h1>
          <p className="player-screen__subtitle">
            Press Enter or OK for play/pause
          </p>
        </div>
      </header>
      <div className="player-screen__wrapper">
        <video
          ref={videoRef}
          playsInline
          preload="auto"
          controls={false}
          src={video.videoUrl}
        />

        <div className="player-screen__cta-overlay" onClick={togglePlayback}>
          <div
            className={`player-screen__cta-button ${isPlaying ? "is-playing" : "is-paused"} ${showIcon ? "is-visible" : "is-hidden"}`}
          >
            <div className="player-screen__cta-icon" />
          </div>
        </div>
      </div>
    </main>
  );
}
