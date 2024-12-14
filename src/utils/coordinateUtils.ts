export const getAnimationCoordinates = (
  exclamation: Element,
  iLetter: Element,
) => {
  const finalX = exclamation.getBoundingClientRect().left -
    iLetter.getBoundingClientRect().left;
  const midX = finalX * 0.6;

  return {
    finalX,
    midX,
  };
};
