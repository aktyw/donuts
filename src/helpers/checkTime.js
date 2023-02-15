export const isOverdue = (deadline) => Date.parse(deadline) <= Date.now();
export const isToday = (deadline) => {
  const today = new Date();

  return (
    deadline.getDate() === today.getDate() &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getFullYear() === today.getFullYear()
  );
};
export const isTomorrow = (deadline) => {
  const today = new Date();

  return (
    deadline.getDate() - 1 === today.getDate() &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getFullYear() === today.getFullYear()
  );
};
export const timeFromDeadline = (deadline) => Date.parse(deadline) - Date.now();
export const addHours = (hours = 0) => {
  const date = new Date();

  return date.setHours(date.getHours() + hours);
};
export const calcStartTime = (hours = 1) => {
  const nextHour = new Date(addHours(hours));

  return {
    hours: nextHour.getHours(),
    minutes: nextHour.getMinutes(),
  };
};
