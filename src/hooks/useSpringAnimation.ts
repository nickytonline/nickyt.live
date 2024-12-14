import { useCallback } from "react";
import { createSpringTimeline } from "../utils/animationUtils.ts";

export const useSpringAnimation = () => {
  const initializeAnimation = useCallback((container: HTMLElement) => {
    const timeline = createSpringTimeline(container);

    timeline.delay(0.3).play();
  }, []);

  return { initializeAnimation };
};
