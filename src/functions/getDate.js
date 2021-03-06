export default function getDate(str) {
  let date = new Date(str);
  return date.toLocaleString("ru", options);
}
var options = {
  timeStyle: "short",
  // minutes: "numeric",
  // hours: "numeric",
  // day: "numeric",
  // month: "numeric",
  // year: "numeric",
};

export const getArriveDate = (dep, duration) => {
  let date = new Date(dep);
  date.setMinutes(date.getMinutes() + duration);
  return getDate(date);
};
