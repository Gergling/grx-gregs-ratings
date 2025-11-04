import { LARGEST_PRIME, SECOND_LARGEST_PRIME, SQUARE_ROOT_OF_LARGEST_PRIME } from "../constants";

export const getIteratedSeed = (seed: number) => {
  const multiplied = seed * LARGEST_PRIME;
  const limited = multiplied % SECOND_LARGEST_PRIME;
  const added = limited + SQUARE_ROOT_OF_LARGEST_PRIME;
  const limited2 = added % LARGEST_PRIME;
  return limited2;
};

export const getScaledSeed = (seed: number, multiplier: number = LARGEST_PRIME) => {
  return (seed * multiplier) % multiplier;
}
