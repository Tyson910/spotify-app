export function calcCategoryAverage(category, items) {
  const sum = items.reduce(
    (total, currentValue) => total + currentValue[category],
    0
  );
  //calc average (set to 1, 2, or 3 decimal points? TBD)
  const average = (sum / items.length).toFixed(3);
  return parseFloat(average);
}