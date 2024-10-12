export const Season0endDate = (() => {
  const date = new Date(2024, 10, 5, 23, 59, 59); // month start from 0.
  return Math.floor(date.getTime() / 1000);
})();
