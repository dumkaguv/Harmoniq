export const calculatePlaybarProgressPercentage = (
  currentTime: number,
  trackDuration: number,
) => {
  return (currentTime / trackDuration) * 100;
};
