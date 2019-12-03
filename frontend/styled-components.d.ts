import { THEME } from './src/theme';

type ThemeInterface = typeof THEME;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}