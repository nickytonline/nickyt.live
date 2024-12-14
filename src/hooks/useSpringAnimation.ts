import { useCallback } from "react";
import { createSpringTimeline } from "../utils/animationUtils.ts";

export const useSpringAnimation = () => {
  const initializeAnimation = useCallback((container: HTMLElement) => {
    const timeline = createSpringTimeline(container);
    // Start animation immediately
    timeline.play();
  }, []);

  return { initializeAnimation };
};
