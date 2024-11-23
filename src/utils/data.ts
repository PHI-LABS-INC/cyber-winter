export const SeasonEndDate = (() => {
  // 12月6日 20:00 GMT+8
  // Note: month is 0-based (11 = December)
  const date = new Date(2024, 11, 6, 20, 0, 0);

  // Convert to GMT/UTC
  // GMT+8 -> subtract 8 hours worth of milliseconds
  const utcDate = new Date(date.getTime() - 8 * 60 * 60 * 1000);

  // Convert to Unix timestamp (seconds)
  return Math.floor(utcDate.getTime() / 1000);
})();
