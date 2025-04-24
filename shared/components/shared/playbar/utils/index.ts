export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export const calculateProgressPercentage = (
  currentTime: number,
  trackDuration: number,
) => {
  return (currentTime / trackDuration) * 100;
};
