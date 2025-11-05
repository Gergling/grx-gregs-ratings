import { Seeder } from "../types";

export const getRandomArrayElement = <T>(arr: T[], seeder: Seeder) => {
  const index = Math.floor((seeder() * arr.length) % arr.length);
  return arr[index];
};

export const getShuffledArray = <T>(arr: T[], seeder: Seeder): T[] => arr.sort(() => seeder() - 0.5);
