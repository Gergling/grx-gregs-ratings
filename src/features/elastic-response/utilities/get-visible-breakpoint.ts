/**
 * Finds the active breakpoint for a given viewport size based on a "floor" approach.
 * This is useful for determining which mobile-first layout configuration should be active.
 * Breakpoints are provided by setting up an ElasticResponseItem with a specific breakpoint.
 * It will only be visible for that breakpoint.
 * 
 * The logic is as follows:
 * - If the viewport is wider than the largest breakpoint, the largest breakpoint is returned.
 * - If the viewport size falls between two breakpoints, the smaller of the two is returned (the "floor").
 * - If the viewport is smaller than any breakpoint, `0` is returned.
 * - If there are no breakpoints, 0 is returned.
 *
 * @param viewportSize The current width of the viewport (integer).
 * @param breakpoints An array of breakpoint values (e.g., `[600, 900, 1200]`).
 * For optimization, this array should be pre-sorted in descending order.
 * @returns The active breakpoint value, or `0` if no breakpoints are provided.
 */
export const getVisibleBreakpoint = (
  viewportSize: number,
  breakpoints: number[],
): number => {
  if (!breakpoints || breakpoints.length === 0) {
    return 0;
  }
  
  // NOTE: Assumes `breakpoints` is sorted descendingly for performance.
  // e.g., [1200, 900, 600]
  
  // Find the first (and therefore largest) breakpoint that is less than or equal to the viewport size.
  // e.g., if viewport is 1000 and breakpoints are [1200, 900, 600], it will find 900.
  const activeBreakpoint = breakpoints.find(bp => viewportSize >= bp);

  // If no breakpoint is smaller than the viewport (e.g., viewport is 500),
  // it means we are below the smallest breakpoint. Return 0 as a base case.
  return activeBreakpoint ?? breakpoints[breakpoints.length - 1];
};
