export const today = new Date();

export const isOverdue = (deadline) => Date.parse(deadline) <= Date.now();

export const timeFromDeadline = (deadline) => Date.parse(deadline) - Date.now();

export const addHours = (hours = 0) => today.setHours(today.getHours() + hours);

export const isToday = (deadline) => {
  return (
    deadline.getDate() === today.getDate() &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (deadline) => {
  return (
    deadline.getDate() - 1 === today.getDate() &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getFullYear() === today.getFullYear()
  );
};

export const calcStartTime = (hours = 1) => {
  const nextHour = new Date(addHours(hours));

  return {
    hours: nextHour.getHours(),
    minutes: nextHour.getMinutes(),
  };
};
