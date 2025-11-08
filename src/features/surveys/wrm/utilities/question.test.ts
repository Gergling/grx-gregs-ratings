import { describe, it, expect, vi } from 'vitest';
import { Seeder } from '../../../../common/types';
import { WRMQuestion } from '../config';
import { mockQuestion } from './mocks';
import { generateQuestion, getOmittedArchetype } from './question';
import * as scoring from './scoring';

describe('question utilities', () => {
  describe('generateQuestion', () => {
    const questions: WRMQuestion[] = [
      mockQuestion(1), // Choices: mage, rogue
      mockQuestion(2),
    ];

    it('should omit the specified archetype from the choices', () => {
      const seeder: Seeder = () => 0.1; // Doesn't matter for this test
      const result = generateQuestion(questions, 'mage', seeder);

      const choiceValues = result.question.choices.map(c => c.value);
      expect(choiceValues).not.toContain('mage');
      expect(result.question.choices.length).toBe(2);
    });

    it('should return the remaining questions', () => {
      const seeder: Seeder = () => 0.1;
      const result = generateQuestion(questions, 'rogue', seeder);

      expect(result.remainingQuestions).toEqual([questions[1]]);
    });

    it('should shuffle the choices based on the seeder', () => {
      const multiChoiceQuestion: WRMQuestion[] = [{
        ...mockQuestion(1),
        choices: [
          { value: 'mage', text: 'Mage' },
          { value: 'rogue', text: 'Rogue' },
          { value: 'warrior', text: 'Warrior' },
        ],
      }];

      const seeder: Seeder = () => 0.6;
      const result = generateQuestion(multiChoiceQuestion, 'mage', seeder);

      expect(result.question.choices.map(c => c.value))
        .toEqual(['rogue', 'warrior']);
    });

    it('should throw an error if the questions array is empty', () => {
      const seeder: Seeder = () => 0.5;
      expect(() => generateQuestion([], 'mage', seeder)).toThrow();
    });
  });

  describe('getOmittedArchetype', () => {
    const seeder: Seeder = () => 0.5;

    it("should call getHighestScoringArchetype when phase is 'initial'", () => {
      const scores = { mage: 1, rogue: 5, warrior: 2 };
      const highestScoringSpy = vi.spyOn(scoring, 'getHighestScoringArchetype');
      getOmittedArchetype('initial', scores, seeder);
      expect(highestScoringSpy).toHaveBeenCalledWith(scores);
      expect(getOmittedArchetype('initial', scores, seeder)).toBe('rogue');
      highestScoringSpy.mockRestore();
    });

    it("should call getAdaptiveOmittedArchetype when phase is not 'initial'", () => {
      const adaptiveSpy = vi.spyOn(scoring, 'getAdaptiveOmittedArchetype');
      const scores = { mage: 3, rogue: 3, warrior: 1 }; // 'lead' category

      getOmittedArchetype('adaptive', scores, seeder);
      expect(adaptiveSpy).toHaveBeenCalledWith(scores, seeder);

      // Based on the 'lead' category, it should omit the trailer ('warrior')
      expect(getOmittedArchetype('adaptive', scores, seeder)).toBe('warrior');
      adaptiveSpy.mockRestore();
    });
  });
});