export const COLORS = [
  { name: 'RED', hex: '#f44336' },
  { name: 'PINK', hex: '#e81e63' },
  { name: 'PURPLE', hex: '#9c27b0' },
  { name: 'DEEP_PURPLE', hex: '#673ab7' },
  { name: 'INDIGO', hex: '#3f51b5' },
  { name: 'BLUE', hex: '#2196f3' },
  { name: 'LIGHT_BLUE', hex: '#03a9f4' },
  { name: 'CYAN', hex: '#00bcd4' },
  { name: 'TEAL', hex: '#009688' },
  { name: 'GREEN', hex: '#4caf50' },
  { name: 'LIGHT_GREEN', hex: '#8bc34a' },
  { name: 'LIME', hex: '#cddc39' },
  { name: 'YELLOW', hex: '#ffeb3b' },
  { name: 'AMBER', hex: '#ffc107' },
  { name: 'ORANGE', hex: '#ff9800' },
  { name: 'DEEP_ORANGE', hex: '#ff5722' },
] as const;

type COLORS = (typeof COLORS)[keyof typeof COLORS];
