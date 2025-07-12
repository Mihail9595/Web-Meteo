export function calcDayLength(sunrise, sunset) {
  const diffInSecond = sunset - sunrise;
  const hours = Math.floor(diffInSecond / 3600);
  const minutes = Math.floor((diffInSecond % 3600) / 60);

  return `${hours} час ${minutes} мин`;
}
