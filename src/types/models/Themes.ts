export type Mode = 'light' | 'dark';

export type ThemesId = 'midnight' | 'lavender' | 'arctic' | 'desert' | 'crystal' | 'mocha' | 'coral' | 'moss';

export interface Theme {
  id: ThemesId;
  title: string;
  mode: Mode;
  colors: {
    top: string;
    bottom: string;
    border: string;
    circle: string;
    textColor?: string;
  };
}
