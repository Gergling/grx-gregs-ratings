import { describe, it, expect } from 'vitest';
import { getPhase, getNavigation } from './update';
import { mockAnswers, mockQuestion } from './mocks';
import { TOTAL_INITIAL_QUESTIONS } from '../constants';

describe('update utilities', () => {
  describe('getPhase', () => {
    it("should return 'initial' if the number of answers is less than the total initial questions", () => {
      const answers = mockAnswers(TOTAL_INITIAL_QUESTIONS - 1);
      const scores = { mage: 0, rogue: 0, warrior: 0 };
      const choices = mockQuestion(0).choices;
      const phase = getPhase(answers, choices, scores);
      expect(phase).toBe('initial');
    });

    it("should return 'done' if scoring category is 'done'", () => {
      const answers = mockAnswers(TOTAL_INITIAL_QUESTIONS);
      // Scores are unique, so category is 'done'
      const scores = { mage: 5, rogue: 3, warrior: 1 };
      const choices = mockQuestion(0).choices;
      const phase = getPhase(answers, choices, scores);
      expect(phase).toBe('done');
    });

    it("should return 'final' if any next answer would result in a 'done' category", () => {
      const answers = mockAnswers(TOTAL_INITIAL_QUESTIONS);
      // Scores are close to being 'done'. warrior=2, rogue=2, mage=5
      const scores = { mage: 5, rogue: 2, warrior: 2 };
      // Choices are warrior and rogue. Answering either will make scores unique.
      const choices = [
        { value: 'warrior' as const, text: 'w' },
        { value: 'rogue' as const, text: 'r' },
      ];
      const phase = getPhase(answers, choices, scores);
      expect(phase).toBe('final');
    });

    it("should return 'adaptive' if at least one next answer would not result in a 'done' category", () => {
      const answers = mockAnswers(TOTAL_INITIAL_QUESTIONS);
      // All scores are equal
      const scores = { mage: 3, rogue: 3, warrior: 3 };
      // Choices are warrior and rogue. Answering either will result in a 'lead' category, not 'done'.
      const choices = [
        { value: 'warrior' as const, text: 'w' },
        { value: 'rogue' as const, text: 'r' },
      ];
      const phase = getPhase(answers, choices, scores);
      expect(phase).toBe('adaptive');
    });
  });

  describe('getNavigation', () => {
    it('should return correct state for the first page', () => {
      const nav = getNavigation(mockAnswers(5), mockQuestion(5), 0);
      expect(nav.isFirst).toBe(true);
      expect(nav.isLast).toBe(false);
      expect(nav.question.name).toBe('q0');
    });

    it('should return correct state for a middle page', () => {
      const answers = mockAnswers(5);
      const nav = getNavigation(answers, mockQuestion(5), 2);
      expect(nav.isFirst).toBe(false);
      expect(nav.isLast).toBe(false);
      expect(nav.question).toEqual(answers[2].question);
    });

    it('should return correct state for the last (new) page', () => {
      const answers = mockAnswers(5);
      const lastQuestion = mockQuestion(5);
      const nav = getNavigation(answers, lastQuestion, 5);
      expect(nav.isFirst).toBe(false);
      expect(nav.isLast).toBe(true);
      expect(nav.question).toEqual(lastQuestion);
    });
  });
});
