import { Temporal } from "@js-temporal/polyfill";

const props = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds'
] as const;

type Prop = typeof props[number];
type SingularisedProps = Record<Prop, string>;

const singularise = (
  acc: SingularisedProps,
  prop: Prop
) => ({
  ...acc,
  [prop]: prop.substring(0, prop.length - 1),
});

const singularisedProps = props.reduce(singularise, {} as SingularisedProps);

const getReadableUnit = (
  duration: Temporal.Duration,
  prop: Prop
) => duration[prop] === 1 ? singularisedProps[prop] : prop;

const getRelativePropTimeString = (
  duration: Temporal.Duration,
  prop: Prop
): string => `${duration[prop]} ${getReadableUnit(duration, prop)} ago`;

export const getRelativeTimeString = (
  duration: Temporal.Duration
) => {
  const prop = props.find((prop) => duration[prop] > 0);
  if (prop) return getRelativePropTimeString(duration, prop);

  return `just now`;
};
