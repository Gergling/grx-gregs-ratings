import { describe, it, expect } from 'vitest';
import { getRandomArrayElement, getShuffledArray } from './array';
import { Seeder } from '../types';

describe('array utilities', () => {
  describe('getRandomArrayElement', () => {
    const testArray = ['a', 'b', 'c', 'd', 'e'];

    it('should return the first element when seeder returns 0', () => {
      const seeder: Seeder = () => 0;
      const result = getRandomArrayElement(testArray, seeder);
      expect(result).toBe('a');
    });

    it('should return an element from the middle of the array', () => {
      const seeder: Seeder = () => 0.5; // floor(0.5 * 5) = 2
      const result = getRandomArrayElement(testArray, seeder);
      expect(result).toBe('c');
    });

    it('should return the last element when seeder returns a value close to 1', () => {
      const seeder: Seeder = () => 0.999; // floor(0.999 * 5) = 4
      const result = getRandomArrayElement(testArray, seeder);
      expect(result).toBe('e');
    });

    it('should return undefined for an empty array', () => {
      const seeder: Seeder = () => 0.5;
      const result = getRandomArrayElement([], seeder);
      expect(result).toBeUndefined();
    });

    it('should always return the only element in a single-item array', () => {
      const seeder: Seeder = () => Math.random(); // Any value
      const result = getRandomArrayElement(['lonely'], seeder);
      expect(result).toBe('lonely');
    });
  });

  describe('getShuffledArray', () => {
    const testArray = [1, 2, 3, 4, 5];

    it('should not change the order if the seeder always returns a value > 0.5', () => {
      const seeder: Seeder = () => 0.6; // sort compare will always be positive
      const result = getShuffledArray([...testArray], seeder);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should reverse the array if the seeder always returns a value < 0.5', () => {
      const seeder: Seeder = () => 0.4; // sort compare will always be negative
      const result = getShuffledArray([...testArray], seeder);
      expect(result).toEqual([5, 4, 3, 2, 1]);
    });

    it('should shuffle the array based on a sequence of seeder values', () => {
      const seedValues = [0.8, 0.2, 0.7, 0.1, 0.9, 0.3, 0.6, 0.4, 0.5, 0.0];
      let i = 0;
      const seeder: Seeder = () => {
        const value = seedValues[i % seedValues.length];
        i++;
        return value;
      };

      const result = getShuffledArray([...testArray], seeder);
      expect(result).not.toEqual(testArray);
      expect(result).toEqual([1, 4, 5, 2, 3]);
    });

    it('should return an empty array when given an empty array', () => {
      const seeder: Seeder = () => 0.5;
      const result = getShuffledArray([], seeder);
      expect(result).toEqual([]);
    });
  });
});