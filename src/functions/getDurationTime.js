export const getDurationHours = (time) => {
  let hours = Math.trunc(time / 60);
  return hours;
};
export const getDurationMinutes = (time) => {
  let minutes = time - getDurationHours(time) * 60;
  return minutes;
};
