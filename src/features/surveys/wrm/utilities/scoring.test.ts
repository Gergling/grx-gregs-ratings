import { describe, it, expect } from 'vitest';
import { Seeder } from '../../../../common/types';
import { ArchetypeKey } from '../config';
import { mockStore } from './mocks';
import {
  getInitialScores,
  getHighestScoringArchetype,
  getScoringCategory,
  getAdaptiveOmittedArchetype,
  getScores,
} from './scoring';

describe('scoring utilities', () => {
  describe('getInitialScores', () => {
    it('should return an object with all archetypes set to a score of 0', () => {
      const scores = getInitialScores();
      expect(scores).toEqual({
        mage: 0,
        rogue: 0,
        warrior: 0,
      });
    });
  });

  describe('getHighestScoringArchetype', () => {
    it('should return the archetype with the highest score', () => {
      const scores = { mage: 1, rogue: 5, warrior: 2 };
      expect(getHighestScoringArchetype(scores)).toBe('rogue');
    });

    it('should return the first archetype alphabetically in case of a tie', () => {
      const scores = { warrior: 5, rogue: 5, mage: 2 };
      // 'rogue' comes before 'warrior' alphabetically
      expect(getHighestScoringArchetype(scores)).toBe('rogue');
    });

    it('should work with all archetypes tied', () => {
      const scores = { warrior: 3, rogue: 3, mage: 3 };
      // 'mage' is first alphabetically
      expect(getHighestScoringArchetype(scores)).toBe('mage');
    });
  });

  describe('getScoringCategory', () => {
    it("should return 'equal' when all scores are the same", () => {
      const scores = { mage: 2, rogue: 2, warrior: 2 };
      expect(getScoringCategory(scores)).toEqual({
        type: 'equal',
        score: 2,
      });
    });

    it("should return 'lead' when two archetypes are tied for the lead", () => {
      const scores = { mage: 3, rogue: 3, warrior: 1 };
      expect(getScoringCategory(scores)).toEqual({
        type: 'lead',
        trailer: { key: 'warrior', score: 1 },
        score: 3,
      });
    });

    it("should return 'trailer' when two archetypes are tied for last", () => {
      const scores = { mage: 4, rogue: 2, warrior: 2 };
      expect(getScoringCategory(scores)).toEqual({
        type: 'trailer',
        lead: { key: 'mage', score: 4 },
        score: 2,
      });
    });

    it("should return 'done' when all scores are unique", () => {
      const scores = { mage: 5, rogue: 3, warrior: 1 };
      const category = getScoringCategory(scores);
      expect(category.type).toBe('done');
      if (category.type === 'done') {
        expect(category.lead).toEqual({ key: 'mage', score: 5 });
        expect(category.trailer).toEqual({ key: 'warrior', score: 1 });
        expect(category.other).toEqual({ key: 'rogue', score: 3 });
      }
    });

    it('should throw an error if an archetype key cannot be found (should not happen)', () => {
      // This state is theoretically impossible if ARCHETYPE_KEYS is correct
      const scores = { mage: 5, rogue: 3, warrior: 1 };
      const invalidScores = { ...scores, fake: 1 } as any;
      // Mock find to return undefined
      const originalFind = Array.prototype.find;
      Array.prototype.find = () => undefined;
      expect(() => getScoringCategory(invalidScores)).toThrow('Something has gone very wrong.');
      Array.prototype.find = originalFind; // Restore
    });
  });

  describe('getAdaptiveOmittedArchetype', () => {
    it("should return a random archetype for 'equal' scores", () => {
      const scores = { mage: 2, rogue: 2, warrior: 2 };
      const seeder: Seeder = () => 0.6; // floor(0.6 * 3) = 1 -> 'rogue'
      expect(getAdaptiveOmittedArchetype(scores, seeder)).toBe('rogue');
    });

    it("should return the trailing archetype for 'lead' scores", () => {
      const scores = { mage: 4, rogue: 4, warrior: 1 };
      const seeder: Seeder = () => Math.random(); // seeder value doesn't matter here
      expect(getAdaptiveOmittedArchetype(scores, seeder)).toBe('warrior');
    });

    describe("for 'trailer' scores", () => {
      it('should omit the lead archetype if the score difference is > 1', () => {
        const scores = { mage: 4, rogue: 2, warrior: 2 }; // diff = 2
        const seeder: Seeder = () => Math.random();
        expect(getAdaptiveOmittedArchetype(scores, seeder)).toBe('mage');
      });

      it('should omit a random non-lead archetype if the score difference is 1', () => {
        const scores = { mage: 3, rogue: 2, warrior: 2 }; // diff = 1
        const seeder: Seeder = () => 0.4; // floor(0.4 * 2) = 0 -> first non-lead ('rogue')
        expect(getAdaptiveOmittedArchetype(scores, seeder)).toBe('rogue');

        const seeder2: Seeder = () => 0.9; // floor(0.9 * 2) = 1 -> second non-lead ('warrior')
        expect(getAdaptiveOmittedArchetype(scores, seeder2)).toBe('warrior');
      });
    });

    it("should throw an error for 'done' scores", () => {
      const scores = { mage: 5, rogue: 3, warrior: 1 };
      const seeder: Seeder = () => 0.5;
      expect(() => getAdaptiveOmittedArchetype(scores, seeder)).toThrow(
        'getAdaptiveOmittedArchetype is not for running against a completed test.'
      );
    });
  });

  describe('getScores', () => {
    const getAnswersForScores = (answers: ArchetypeKey[]) => mockStore({
      answers: answers.map((answer) => ({
        answer,
        question: { name: 'q', title: 'q', type: 'radiogroup', choices: [] },
      })),
    }).answers;

    it('should correctly calculate scores from an array of answers', () => {
      const answers = getAnswersForScores(['mage', 'rogue', 'mage', 'warrior', 'mage']);
      const scores = getScores(answers);
      expect(scores).toEqual({
        mage: 3,
        rogue: 1,
        warrior: 1,
      });
    });

    it('should return initial scores if there are no answers', () => {
      const answers = getAnswersForScores([]);
      const scores = getScores(answers);
      expect(scores).toEqual({
        mage: 0,
        rogue: 0,
        warrior: 0,
      });
    });

    it('should handle answers for a single archetype', () => {
      const answers = getAnswersForScores(['rogue', 'rogue', 'rogue']);
      const scores = getScores(answers);
      expect(scores).toEqual({
        mage: 0,
        rogue: 3,
        warrior: 0,
      });
    });
  });
});
