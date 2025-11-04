import { Seeder } from "../types";

export const getRandomArrayElement = <T>(arr: T[], seed: number) => {
  const index = Math.floor((seed * arr.length) % arr.length);
  return arr[index];
};

export const getShuffledArray = <T>(arr: T[], seeder: Seeder): T[] => arr.sort(() => seeder() - 0.5);
