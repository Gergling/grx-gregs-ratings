/**
 * Gets the root font size in pixels (e.g., 16 or 10, depending on CSS).
 * @returns {number} The root font size in pixels.
 */
export const getRootFontSize = () => {
  // Get the computed style object for the <html> element
  const rootElement = document.documentElement;
  const style = window.getComputedStyle(rootElement);
  
  // Extract the font-size property and parse it as an integer
  const fontSizePx = style.getPropertyValue('font-size');
  
  // This will return the number (e.g., 16)
  return parseFloat(fontSizePx);
};
