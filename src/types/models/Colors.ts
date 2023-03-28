export const COLORS = { WHITE: '#ffffff', BLACK: '#000000', RED: '#333333' } as const;

type COLORS = (typeof COLORS)[keyof typeof COLORS];
