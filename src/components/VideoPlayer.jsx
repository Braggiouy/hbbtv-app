import useNavigation from "../hooks/useNavigation";
import useTvVideoController from "../hooks/useTvVideoController";
import "./VideoPlayer.css";

export default function VideoPlayer({ video, onBack }) {
  const { videoRef, isPlaying, toggle } = useTvVideoController(
    video?.videoUrl,
    { autoplay: true },
  );

  useNavigation({
    onEnter: toggle,
    onBack,
  });

  if (!video) return null;

  return (
    <main className="player-screen">
      <header className="player-screen__header">
        <h1>{video.title}</h1>
        <p className="player-screen__subtitle">
          Press Enter or OK to play/pause
        </p>
      </header>

      <div className="player-screen__wrapper">
        <video ref={videoRef} playsInline preload="auto" controls={false} />

        <div className="player-screen__cta-overlay" onClick={toggle}>
          <div
            className={`player-screen__cta-button ${
              isPlaying ? "is-playing" : "is-paused"
            }`}
          >
            <div className="player-screen__cta-icon" />
          </div>
        </div>
      </div>
    </main>
  );
}
