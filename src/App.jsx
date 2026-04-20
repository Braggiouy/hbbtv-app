import { useState, useCallback } from "react";
import MainScreen from "./components/MainScreen";
import VideoPlayer from "./components/VideoPlayer";
import videos from "./data/videos.json";

/**
 * App Component
 * Manages the routing between MainScreen (Grid) and VideoPlayer.
 * Strictly 1280x720 compliant for HbbTV 1.5.
 */
function App() {
  const [route, setRoute] = useState({ name: "main" });
  const [lastFocusedIndex, setLastFocusedIndex] = useState(0);

  const handleSelectVideo = useCallback((index) => {
    const video = videos[index];
    if (video) {
      setLastFocusedIndex(index);
      setRoute({ name: "player", video });
    }
  }, []);

  const handleBackToMain = useCallback(() => {
    setRoute({ name: "main" });
  }, []);

  const handleFocusChange = useCallback((index) => {
    setLastFocusedIndex(index);
  }, []);

  // Determine which screen to render
  let content = null;
  if (route.name === "player") {
    content = <VideoPlayer video={route.video} onBack={handleBackToMain} />;
  } else {
    content = (
      <MainScreen
        focusedIndex={lastFocusedIndex}
        onFocusChange={handleFocusChange}
        onSelectVideo={handleSelectVideo}
        videos={videos}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="app-viewport">{content}</div>
    </div>
  );
}

export default App;
