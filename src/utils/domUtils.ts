export const createCloneElement = (text: string): HTMLSpanElement => {
  const clone = document.createElement("span");
  clone.textContent = text;
  clone.style.position = "absolute";
  clone.style.opacity = "0";
  return clone;
};
