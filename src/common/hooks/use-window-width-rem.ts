import { useState, useEffect, useCallback } from 'react';

// Debounce utility to limit how often the resize handler fires
const debounce = <T = unknown>(
  callback: (...args: T[]) => unknown,
  delay: number,
) => {
  // let timeout;
  return (...args: T[]) => {
    // clearTimeout(timeout);
    setTimeout(() => callback(...args), delay);
  };
};
// const debounce = <T>(func, delay) => {
//     let timeout;
//     return (...args: T[]) => {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func.apply(this, args), delay);
//     };
// };

/**
 * Utility function to accurately convert a pixel value to a rem value,
 * based on the root HTML element's computed font-size.
 * @param {number} pxValue The pixel value (e.g., window.innerWidth)
 * @returns {number} The converted value in rems, rounded down to an integer.
 */
const pxToRem = (pxValue: number) => {
  // Check for server-side rendering (SSR) where document is unavailable
  if (typeof document === 'undefined') {
    return 0;
  }
  
  // Get the computed font size of the root HTML element
  const rootFontSizePx = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  );

  // If for some reason the size is invalid, fall back to browser default 16px
  const baseRemSize = rootFontSizePx > 0 ? rootFontSizePx : 16;
  
  // Convert to rems and round down to an integer
  return Math.floor(pxValue / baseRemSize);
};

/**
 * A custom React hook to track and debounce the viewport width in accurate rem units.
 * @param {number} delay The debounce delay in milliseconds (default is 100ms)
 * @returns {number} The current viewport width in integer rems.
 */
const useWindowWidthRem = (delay = 100) => {
  // Initialize state with the current window width, or 0 for SSR
  const [widthRem, setWidthRem] = useState(() => {
    if (typeof window === 'undefined') {
        return 0; // Return 0 for Server-Side Rendering (SSR)
    }
    return pxToRem(window.innerWidth);
  });

  // Memoize the handler function to prevent unnecessary re-creations
  const handleResize = useCallback(() => {
    setWidthRem(pxToRem(window.innerWidth));
  }, []);

  // Apply debounce to the memoized handler
  const debouncedHandleResize = debounce<unknown>(handleResize, delay);

  useEffect(() => {
    // Run once on mount to ensure initial state is correct
    handleResize();

    // Set up the resize event listener
    window.addEventListener('resize', debouncedHandleResize);

    // Cleanup function to remove the event listener on unmount
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize, handleResize]); // Depend on debounced handler

  return widthRem;
};

export default useWindowWidthRem;
