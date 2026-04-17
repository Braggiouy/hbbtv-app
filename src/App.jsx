import { useState } from "react";
import MainScreen from "./components/MainScreen";
import VideoPlayer from "./components/VideoPlayer";
import videos from "./data/videos.json";
import useViewportScale from "./hooks/useViewportScale";
import { BASE_WIDTH, BASE_HEIGHT } from "./constants";

const SCREENS = {
  MAIN: "main",
  PLAYER: "player",
};

function App() {
  const [screen, setScreen] = useState(SCREENS.MAIN);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scale = useViewportScale();

  const handleFocusChange = (nextIndex) => setFocusedIndex(nextIndex);

  const handleSelectVideo = (index) => {
    setFocusedIndex(index);
    setSelectedIndex(index);
    setScreen(SCREENS.PLAYER);
  };

  const handleBackToMain = () => setScreen(SCREENS.MAIN);

  const selectedVideo = videos[selectedIndex];

  let screenContent = (
    <MainScreen
      focusedIndex={focusedIndex}
      onFocusChange={handleFocusChange}
      onSelectVideo={handleSelectVideo}
      videos={videos}
    />
  );

  if (!videos.length) {
    screenContent = (
      <main className="app-empty-state">
        <p>No videos found in the static data source.</p>
      </main>
    );
  }

  if (screen === SCREENS.PLAYER && selectedVideo) {
    screenContent = (
      <VideoPlayer video={selectedVideo} onBack={handleBackToMain} />
    );
  }

  const transformStyle = "scale(" + scale + ")";

  return (
    <div className="main-page-wrapper">
      <div
        className="main-page"
        style={{
          height: BASE_HEIGHT + "px",
          width: BASE_WIDTH + "px",
          msTransform: transformStyle,
          transform: transformStyle,
        }}
      >
        {screenContent}
      </div>
    </div>
  );
}

export default App;
