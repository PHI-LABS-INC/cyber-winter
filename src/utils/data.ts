export const SeasonEndDate = (() => {
  const date = new Date(2024, 10, 17, 23, 59, 59); // month start from 0.
  return Math.floor(date.getTime() / 1000);
})();
