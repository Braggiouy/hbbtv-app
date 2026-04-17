import { useEffect, useState } from "react";
import { BASE_WIDTH, BASE_HEIGHT } from "../constants";

function getScale() {
  const width =
    typeof window !== "undefined"
      ? window.innerWidth || document.documentElement.clientWidth
      : BASE_WIDTH;
  const height =
    typeof window !== "undefined"
      ? window.innerHeight || document.documentElement.clientHeight
      : BASE_HEIGHT;

  return Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
}

export default function useViewportScale() {
  const [scale, setScale] = useState(() => getScale());

  useEffect(() => {
    const handleResize = () => {
      setScale(getScale());
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return scale;
}
