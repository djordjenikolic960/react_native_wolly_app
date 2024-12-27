import { lightColors, darkColors } from './colors';
import { fonts } from './fonts';
import { spacing } from './spacing';

export const lightTheme = {
  colors: lightColors,
  fonts,
  spacing,
};

export const darkTheme = {
  colors: darkColors,
  fonts,
  spacing,
};

export type ThemeType = typeof lightTheme;