import { useTheme } from "@gergling/ui-components";
import baseTheme from '../config/base-theme.json';
import type { ITheme } from 'survey-core';

export const useSJSTheme = (): ITheme => {
  const { theme: {
    colors,
    palette: { mode, ...palette },
    typography: { body1: { fontFamily } }
  } } = useTheme();

  return {
    ...baseTheme as ITheme,
    colorPalette: mode,
    cssVariables: {
      ...baseTheme.cssVariables,
      '--sjs-font-family': fontFamily || baseTheme.cssVariables['--sjs-font-family'],

      // '--sjs-border-default': 'rgba(0, 0, 0, 0.16)',
      // '--sjs-border-light': 'rgba(0, 0, 0, 0.09)',

      // '--sjs-general-backcolor': 'rgba(255, 255, 255, 1)',
      // '--sjs-general-backcolor-dark': 'rgba(248, 248, 248, 1)',
      // '--sjs-general-backcolor-dim-light': 'rgba(249, 249, 249, 1)',
      // '--sjs-general-backcolor-dim-dark': 'rgba(243, 243, 243, 1)',
      // '--sjs-general-forecolor': 'rgba(0, 0, 0, 0.91)',
      // '--sjs-general-forecolor-light': 'rgba(0, 0, 0, 0.45)',
      // '--sjs-general-dim-forecolor': 'rgba(0, 0, 0, 0.91)',
      // '--sjs-general-dim-forecolor-light': 'rgba(0, 0, 0, 0.45)',
      // "--sjs-general-backcolor-dim": "rgba(243, 243, 243, 1)",

      "--sjs-primary-backcolor": colors.primary.main,
      "--sjs-primary-backcolor-dark": palette.primary.dark, //"rgba(92, 83, 40, 1)",
      "--sjs-primary-backcolor-light": palette.primary.light, //"rgba(107, 97, 46, 0.1)",
      "--sjs-primary-forecolor": colors.primary.on,
      "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",

      '--sjs-secondary-backcolor': colors.secondary.main,
      '--sjs-secondary-backcolor-light': palette.primary.light, //'rgba(255, 152, 20, 0.1)',
      '--sjs-secondary-backcolor-semi-light': palette.primary.dark, //'rgba(255, 152, 20, 0.25)',
      '--sjs-secondary-forecolor': colors.secondary.on,
      '--sjs-secondary-forecolor-light': 'rgba(255, 255, 255, 0.25)',

      // '--sjs-shadow-small-reset': '0px 0px 0px 0px rgba(0, 0, 0, 0.15)',
      // '--sjs-shadow-medium': '0px 2px 6px 0px rgba(0, 0, 0, 0.1)',
      // '--sjs-shadow-large': '0px 8px 16px 0px rgba(0, 0, 0, 0.1)',
      // '--sjs-shadow-inner-reset': 'inset 0px 0px 0px 0px rgba(0, 0, 0, 0.15)',

      // '--sjs-border-inside': 'rgba(0, 0, 0, 0.16)',

      // "--sjs-special-red": "rgba(229, 10, 62, 1)",
      // "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)",
      // '--sjs-special-red-forecolor': 'rgba(255, 255, 255, 1)',
      // '--sjs-special-green': 'rgba(25, 179, 148, 1)',
      // '--sjs-special-green-light': 'rgba(25, 179, 148, 0.1)',
      // '--sjs-special-green-forecolor': 'rgba(255, 255, 255, 1)',
      // '--sjs-special-blue': 'rgba(67, 127, 217, 1)',
      // '--sjs-special-blue-light': 'rgba(67, 127, 217, 0.1)',
      // '--sjs-special-blue-forecolor': 'rgba(255, 255, 255, 1)',
      // '--sjs-special-yellow': 'rgba(255, 152, 20, 1)',
      // '--sjs-special-yellow-light': 'rgba(255, 152, 20, 0.1)',
      // '--sjs-special-yellow-forecolor': 'rgba(255, 255, 255, 1)',
    }
  };
};
