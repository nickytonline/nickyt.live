import gsap from "gsap";
import { createCloneElement } from "./domUtils.ts";
import { getAnimationCoordinates } from "./coordinateUtils.ts";
import { calculateSpringOscillations } from "./springCalculator.ts";

export const createSpringTimeline = (container: HTMLElement) => {
  const iContainer = container.querySelector(".relative");
  const finalI = container.querySelector("#final-i");
  const originalI = container.querySelector(".original-i");

  if (!iContainer || !finalI || !originalI) return gsap.timeline();

  const clone = createCloneElement("i");
  clone.style.color = "#db2777"; // Pink color
  clone.style.position = "absolute";
  clone.style.top = "0";
  clone.style.left = "0";
  iContainer.appendChild(clone);

  const { finalX } = getAnimationCoordinates(finalI, iContainer);
  const oscillations = calculateSpringOscillations(finalX);

  const timeline = gsap.timeline({ delay: 0.25 }); // Add initial delay

  // Initial setup
  timeline.set(clone, {
    opacity: 0,
    color: "#db2777",
    top: 0,
    left: 0,
    rotation: 0,
    scale: 1,
  })
    .set(finalI, {
      opacity: 0,
      rotation: 0,
      scale: 0.85, // Pre-set the final scale
    })
    .set(originalI, {
      opacity: 1,
    });

  // Start animation
  timeline.to(clone, {
    opacity: 1,
    duration: 0.01,
  })
    .to(originalI, {
      opacity: 0,
      duration: 0.01,
    }, "<")
    .to(clone, {
      x: finalX,
      rotation: 180,
      duration: 0.3,
      ease: "power2.inOut",
    });

  // Spring oscillations
  oscillations.forEach(({ amount, duration }) => {
    timeline.to(clone, {
      x: finalX + amount,
      rotation: 180,
      duration,
      ease: "none",
    });
  });

  // Final state with shrinking transition
  timeline.to(clone, {
    x: finalX,
    rotation: 180,
    scale: 0.85, // Match the final exclamation scale
    duration: 0.15,
    ease: "power2.inOut",
  })
    .set(clone, {
      opacity: 0,
    })
    .to(finalI, {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "back.out(1.5)",
    }, "<");

  return timeline;
};
