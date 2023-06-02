export enum Time {
  Overdue = 'Overdue',
  Today = 'Today',
  Tomorrow = 'Tomorrow',
}

export interface StartTime {
  hours: number;
  minutes: number;
}
