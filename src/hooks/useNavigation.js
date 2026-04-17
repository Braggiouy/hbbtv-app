import { useEffect, useRef } from "react";
import { THROTTLE_MS } from "../constants";

const KEY_MAP = {
  // KeyCodes (Legacy)
  37: "onLeft",
  39: "onRight",
  13: "onEnter",
  8: "onBack",
  27: "onBack",
  21: "onBack",
  461: "onBack",
  10009: "onBack",

  // Key Names (Modern)
  ArrowLeft: "onLeft",
  ArrowRight: "onRight",
  Enter: "onEnter",
  OK: "onEnter",
  Select: "onEnter",
  Backspace: "onBack",
  Escape: "onBack",
};

/**
 * useNavigation
 *
 * Maps remote control / keyboard events to handler callbacks.
 * Designed for TV environments (HbbTV, Tizen, webOS).
 */
export default function useNavigation(handlers = {}) {
  const handlersRef = useRef(handlers);
  const lastKeyTimeRef = useRef(0);

  handlersRef.current = handlers;

  useEffect(() => {
    const onKeyDown = (event) => {
      const handlerName = KEY_MAP[event.keyCode] || KEY_MAP[event.key];

      if (!handlerName) return;

      const now = Date.now();

      // Throttle repeated key presses
      if (now - lastKeyTimeRef.current < THROTTLE_MS) {
        event.preventDefault();
        return;
      }

      lastKeyTimeRef.current = now;

      event.preventDefault();

      const handler = handlersRef.current[handlerName];

      if (handler) handler(event);
    };

    window.addEventListener("keydown", onKeyDown, true);

    //handlers cleanup
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, []);
}
