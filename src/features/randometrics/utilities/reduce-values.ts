import { ReactNode } from "react";
import { RANDOMETRIC_CONFIG_KEYS, RandometricConfigKey } from "../config";

type Values = {
  [K in RandometricConfigKey]: ReactNode;
};

export const reduceRandometricValues = (
  values: Values,
  getValue: (
    previous: ReactNode,
    key: RandometricConfigKey
  ) => ReactNode,
) => {
  // Use a new variable for the accumulator to avoid confusion and mutation.
  let newValues = values;

  for (const key of RANDOMETRIC_CONFIG_KEYS) {
    const previousValue = newValues[key];
    const nextValue = getValue(previousValue, key);

    // If the value has changed (and is not an empty string), create a new object.
    if (nextValue !== previousValue && nextValue !== '') {
      if (newValues === values) newValues = { ...values }; // Create a copy on the first change
      newValues[key] = nextValue;
    }
  }
  return newValues;
};
