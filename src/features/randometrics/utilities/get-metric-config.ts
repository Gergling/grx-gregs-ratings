import { MetricPopProps, Randometric, RandometricSelection } from "../config";

/**
 * Finds a suitable `Randometric` configuration from a list based on provided properties.
 *
 * This function supports three modes of searching:
 * 1.  **By size only**: If only `width` and `height` are provided, it finds the first metric
 *     that matches those dimensions.
 * 2.  **By name only**: If only `name` is provided, it finds the metric with that specific name.
 * 3.  **By both name and size**: If all three properties are provided, it performs a strict
 *     search for a metric that matches both the name and the dimensions.
 *
 * The function calculates the "effective" size of a metric, accounting for its orientation
 * (`horizontal` property), before comparing it with the requested dimensions.
 *
 * @param {MetricPopProps} props - The properties to search for. Can contain `width` and `height`, a `name`, or all three.
 * @param {Randometric[]} randometrics - An array of available `Randometric` configurations to search within.
 * @param {RandometricSelection[]} selected - An object of flags marking whether something has already been selected and should therefore be skipped to avoid selecting it again.
 * @returns {Randometric | undefined} The first matching `Randometric` configuration, or `undefined` if no match is found.
 */
export const getMetricConfig = (
  {
    width,
    height,
    name,
  }: MetricPopProps,
  randometrics: Randometric[],
  selected: RandometricSelection,
) => randometrics.find((config) => {
  if (selected[config.name]) return false;

  const effectiveWidth = config.props.size.width + (config.props.horizontal ? 1 : 0);
  const effectiveHeight = config.props.size.height + (config.props.horizontal ? 0 : 1);
  const sizeMatch = effectiveWidth === width && effectiveHeight === height;
  const nameMatch = config.name === name;

  if (name === undefined) return sizeMatch;
  if (width === undefined && height === undefined) return nameMatch;
  
  return sizeMatch && config.name === name;
});
