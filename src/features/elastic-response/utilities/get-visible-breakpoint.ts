/**
 * Finds the most appropriate breakpoint for a given viewport size based on a "ceiling" approach.
 * This is useful for determining which layout configuration should be active.
 *
 * The logic is as follows:
 * - If the viewport is wider than the largest breakpoint, use the largest breakpoint.
 * - If the viewport is smaller than the smallest breakpoint, use the smallest breakpoint.
 * - If the viewport size falls between two breakpoints, use the larger of the two (the "ceiling").
 * - If there are no breakpoints, 0 is returned.
 *
 * @param viewportSize The current width of the viewport (integer).
 * @param breakpoints An array of breakpoint values (e.g., `[600, 900, 1200]`).
 * For optimization, this array should be pre-sorted in ascending order.
 * @returns The active breakpoint value, or `0` if no breakpoints are provided.
 */
export const getVisibleBreakpoint = (
  viewportSize: number,
  breakpoints: number[],
): number => {
  if (breakpoints.length === 0) {
    return 0;
  }
  
  // NOTE: Assumes `breakpoints` is sorted ascendingly for performance.
  // e.g., [600, 900, 1200]
  
  // Find the first breakpoint that is larger than or equal to the viewport size.
  // e.g., if viewport is 1000, it will find 1200.
  const nextHighest = breakpoints.find(bp => viewportSize <= bp);
  
  if (nextHighest !== undefined) {
    // This covers cases where viewport is smaller than the smallest breakpoint,
    // or between two breakpoints. It correctly returns the "ceiling".
    return nextHighest;
  }
  
  // If `nextHighest` is undefined, the viewport is larger than all breakpoints.
  // In this case, return the largest breakpoint.
  return breakpoints[breakpoints.length - 1];
};
