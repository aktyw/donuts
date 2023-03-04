import type { StartTime } from '@/types/models/StartTime';

export const today = new Date();

export const isOverdue = (deadline: Date): boolean => deadline.getTime() <= Date.now();

export const timeFromDeadline = (deadline: string): number => Date.parse(deadline) - Date.now();

export const addHours = (hours = 0): number => today.setHours(today.getHours() + hours);

export const isToday = (deadline: Date): boolean => {
  return (
    deadline.getDate() === today.getDate() &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (deadline: Date): boolean => {
  return (
    deadline.getDate() - 1 === today.getDate() &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getFullYear() === today.getFullYear()
  );
};

export const calcStartTime = (hours = 1): StartTime => {
  const nextHour = new Date(addHours(hours));

  return {
    hours: nextHour.getHours(),
    minutes: nextHour.getMinutes(),
  };
};
