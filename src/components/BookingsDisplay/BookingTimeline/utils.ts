/**
 * Assuming each display fragment spans 10 minutes
 */
export const getStartTimeOffset = (startTime: number): number => {
  const date = new Date(startTime);
  return date.getHours() * 6 + date.getMinutes() / 10;
};

export const getDurationSpan = (durationInMs: number): number => durationInMs / 1000 / 60 / 6;
