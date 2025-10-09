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

const getReadableFormat = (
  value: number,
  unit: string,
) => `${value} ${unit} ago`

const getRelativePropTimeString = (
  duration: Temporal.Duration,
  prop: Prop
): string => getReadableFormat(duration[prop], getReadableUnit(duration, prop));

export const getRelativeTimeString = (
  duration: Temporal.Duration
) => {
  const prop = props.find((prop) => duration[prop] > 0);

  if (!prop) return `just now`;

  if (prop === 'days' && duration[prop] >= 7) {
    const weeks = Math.floor(duration[prop] / 7);
    // TODO: Consistency.
    return getReadableFormat(weeks, weeks === 1 ? 'week' : 'weeks');
  }

  return getRelativePropTimeString(duration, prop);
};
