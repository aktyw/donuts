export const COLORS = [
  { name: 'Red', hex: '#f44336' },
  { name: 'Pink', hex: '#e81e63' },
  { name: 'Purple', hex: '#9c27b0' },
  { name: 'Deep Purple', hex: '#673ab7' },
  { name: 'Indigo', hex: '#3f51b5' },
  { name: 'Blue', hex: '#2196f3' },
  { name: 'Light Blue', hex: '#03a9f4' },
  { name: 'Cyan', hex: '#00bcd4' },
  { name: 'Teal', hex: '#009688' },
  { name: 'Green', hex: '#4caf50' },
  { name: 'Light Green', hex: '#8bc34a' },
  { name: 'Lime', hex: '#cddc39' },
  { name: 'Yellow', hex: '#ffeb3b' },
  { name: 'Amber', hex: '#ffc107' },
  { name: 'Orange', hex: '#ff9800' },
  { name: 'Brown', hex: '#795548' },
  { name: 'Gray', hex: '#9e9e9e' },
  { name: 'Blue Gray', hex: '#607d8b' },
  { name: 'Black', hex: '#151515' },
] as const;

type COLORS = (typeof COLORS)[keyof typeof COLORS];

export const NOTES_COLORS = [
  { name: 'Red', hex: '#f44336' },
  { name: 'Pink', hex: '#e81e63' },
  { name: 'Purple', hex: '#9c27b0' },
  { name: 'Deep Purple', hex: '#673ab7' },
  { name: 'Indigo', hex: '#3f51b5' },
  { name: 'Blue', hex: '#2196f3' },
  { name: 'Light Blue', hex: '#03a9f4' },
  { name: 'Cyan', hex: '#00bcd4' },
  { name: 'Teal', hex: '#009688' },
  { name: 'Green', hex: '#4caf50' },
  { name: 'Light Green', hex: '#8bc34a' },
  { name: 'Lime', hex: '#cddc39' },
  { name: 'Yellow', hex: '#ffeb3b' },
  { name: 'Amber', hex: '#ffc107' },
  { name: 'Orange', hex: '#ff9800' },
  { name: 'Brown', hex: '#795548' },
  { name: 'Gray', hex: '#9e9e9e' },
  { name: 'Blue Gray', hex: '#607d8b' },
  { name: 'Black', hex: '#151515' },
] as const;

type NOTES_COLORS = (typeof COLORS)[keyof typeof COLORS];
