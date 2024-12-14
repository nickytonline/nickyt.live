export const calculateSpringOscillations = (distance: number) => {
  const baseAmplitude = distance * 0.15; // Reduced from 0.25 to 0.15
  const oscillations = [];
  let amplitude = baseAmplitude;

  // Generate 8 oscillations (reduced from 12)
  for (let i = 0; i < 8; i++) {
    amplitude *= 0.65; // Increased decay from 0.7 to 0.65
    oscillations.push({
      amount: i % 2 === 0 ? amplitude : -amplitude,
      duration: 0.035 - (i * 0.002), // Slightly faster
    });
  }

  return oscillations;
};
