import useNavigation from "../hooks/useNavigation";
import "./MainScreen.css";

export default function MainScreen({
  videos,
  focusedIndex,
  onFocusChange,
  onSelectVideo,
}) {
  useNavigation({
    onLeft: () => {
      if (focusedIndex > 0) onFocusChange(focusedIndex - 1);
    },
    onRight: () => {
      if (focusedIndex < videos.length - 1) onFocusChange(focusedIndex + 1);
    },
    onEnter: () => onSelectVideo(focusedIndex),
  });

  return (
    <main className="main-screen">
      <h1 className="main-screen__title">Single line title</h1>
      <section className="main-screen__shelf" aria-label="Video grid">
        <div className="main-screen__grid">
          {videos.map((video, index) => {
            const isFocused = index === focusedIndex;
            const badges = video.badges || ["UT", "AD", "DGS"];

            return (
              <button
                key={`${video.title}-${index}`}
                aria-label={video.title}
                aria-pressed={isFocused}
                className={`video-card ${isFocused ? "is-focused" : ""}`}
                onClick={() => onSelectVideo(index)}
                tabIndex={-1}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="video-card__graphic"
                  style={{ backgroundImage: `url(${video.thumbnail})` }}
                />
                <span
                  aria-hidden="true"
                  className="video-card__shade video-card__shade--bottom-right"
                />

                <span className="video-card__badges">
                  {badges.map((badge) => (
                    <span key={badge} className="video-card__badge">
                      {badge}
                    </span>
                  ))}
                </span>
                <div className="video-card__content">
                  <span className="video-card__episode">
                    {video.episodeLabel}
                  </span>
                  <span className="video-card__title">{video.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
