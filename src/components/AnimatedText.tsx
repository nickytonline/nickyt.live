import React, { useEffect, useRef } from "react";
import { useSpringAnimation } from "../hooks/useSpringAnimation.ts";

interface AnimatedTextProps {
  animate: boolean;
}

export const AnimatedText = ({ animate }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { initializeAnimation } = useSpringAnimation();

  useEffect(() => {
    if (typeof globalThis === "undefined") return;

    const mediaQuery = globalThis.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    );

    const shouldAnimate = animate && mediaQuery.matches;
    if (shouldAnimate && containerRef.current) {
      if (shouldAnimate) {
        initializeAnimation(containerRef.current);
      }
    }
  }, [animate]);

  return (
    <h1
      ref={containerRef}
      className="font-outfit md:text-6xl lg:text-8xl font-medium"
    >
      nickyt<span className="text-pink-600">.</span>l
      <span className="relative inline-block">
        {/* Black i that stays */}
        <span className="static">i</span>
        {/* Pink i that animates */}
        <span
          className={`original-i absolute top-0 left-0 ${
            animate ? "text-pink-600" : ""
          }`}
        >
          i
        </span>
      </span>
      ve
      <span
        className={`text-pink-600 ${
          animate ? "opacity-0" : ""
        } inline-block font-nunito font-bold transform-gpu`}
        id="final-i"
        style={{ transformOrigin: "center" }}
      >
        !
      </span>
    </h1>
  );
};
