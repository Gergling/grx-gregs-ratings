import { getRootFontSize } from "./get-root-font-size";

/**
 * Converts a REM value to a pixel value based on the current root font size.
 * @param {number} remValue The REM value (e.g., 2.5)
 * @returns {number} The calculated pixel value.
 */
export const remToPx = (remValue: number) => {
  const rootFontSize = getRootFontSize();
  return remValue * rootFontSize;
};
